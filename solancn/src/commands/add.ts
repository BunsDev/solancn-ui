import { existsSync, promises as fs } from "fs";
import path from "path";
import { getConfig } from "../utils/get-config";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { ASCII_TEXT, ColorFullText, logger } from "../utils/logger";
import {
  fetchTree,
  fetchTreeStyled,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndexSolancn,
  resolveTreeWithDependencies,
} from "../utils/registry";
import { transform } from "../utils/transformers";
import chalk from "chalk";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import prompts from "prompts";
import { z } from "zod";

const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  yes: z.boolean(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  useStyled: z.boolean(),
  path: z.string().optional(),
  templates: z.boolean(),
});

interface AddOptions {
  components: string[];
  yes: boolean;
  overwrite: boolean;
  cwd: string;
  all: boolean;
  useStyled: boolean;
  path: string | undefined;
  templates: boolean;
}

export const addComponent = new Command()
  .name("add")
  .description("Add Solancn components to your project")
  .argument("[components...]", "the components to add")
  .option("-y, --yes", "skip confirmation prompt.", true)
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd(),
  )
  .option("-a, --all", "add all available components", true)
  .addHelpText("after", ColorFullText(ASCII_TEXT))
  .option("-s, --useStyled", "use styled version of components", false)
  .option("-p, --path <path>", "the path to add the component to.")
  .option("-t, --templates", "include available templates", false)
  .action(async (components, opts) => {
    console.log(ASCII_TEXT, ColorFullText(ASCII_TEXT));
    try {
      const options = addOptionsSchema.parse({
        components,
        ...opts,
      });

      const cwd = path.resolve(options.cwd);

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`);
        process.exit(1);
      }

      const config = await getConfig(cwd);
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${chalk.green(
            `init`,
          )} to create a components.json file.`,
        );
        process.exit(1);
      }

      const registryIndex = await getRegistryIndexSolancn();

      let selectedComponents = options.all
        ? registryIndex.map((entry) => entry.name)
        : options.components;

      if (!options.components?.length && !options.all) {
        const filterIndex = (): typeof registryIndex =>
          registryIndex.filter((e) => {
            const type = e.type.split(":")[1] as string;
            if (options.components) return type === "components:component";
            if (options.templates) return type === "components:template";

            return type === "solancn";
          });

        const multiselectChoice = filterIndex();
        const { components } = await prompts({
          type: "multiselect",
          name: "components",
          message: "Which components would you like to add?",
          hint: "Space to select. A to toggle all. Enter to submit.",
          instructions: false,
          choices: multiselectChoice.map((entry) => ({
            title: entry.name,
            value: entry.name,
            selected: options.all
              ? true
              : options.components?.includes(entry.name),
          })),
        });
        selectedComponents = components;
      }

      if (!selectedComponents?.length) {
        logger.warn("No components selected. Exiting.");
        process.exit(0);
      }

      const tree = await resolveTreeWithDependencies(registryIndex, selectedComponents);

      const payload = options.useStyled
        ? await fetchTreeStyled(config.style, tree)
        : await fetchTree(tree);
      const baseColor = await getRegistryBaseColor(config.tailwind.baseColor);

      if (!payload.length) {
        logger.warn("Selected components not found. Exiting.");
        process.exit(0);
      } else {
        logger.info(`Found ${payload.length}x Solancn components.`);
      }

      const totalPayload = payload;

      if (!options.yes) {
        const { proceed } = await prompts({
          type: "confirm",
          name: "proceed",
          message: `Ready to install components and dependencies. Proceed?`,
          initial: true,
        });

        if (!proceed) {
          process.exit(0);
        }
      }

      const spinner = ora(`Installing components...`).start();
      for (const item of totalPayload) {
        spinner.text = `Installing ${item.name}...`;
        const targetDir = await getItemTargetPath(
          config,
          item,
          options.path ? path.resolve(cwd, options.path) : undefined,
        );

        if (!targetDir) {
          continue;
        }

        if (!existsSync(targetDir)) {
          await fs.mkdir(targetDir, { recursive: true });
        }

        const existingComponent = item.files.filter((file) =>
          existsSync(path.resolve(targetDir, file.name)),
        );

        if (existingComponent.length && !options.overwrite) {
          if (selectedComponents.includes(item.name)) {
            spinner.stop();
            const { overwrite } = await prompts({
              type: "confirm",
              name: "overwrite",
              message: `Component ${item.name} already exists. Would you like to overwrite?`,
              initial: false,
            });

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
                  "--overwrite",
                )} flag.`,
              );
              continue;
            }

            spinner.start(`Installing ${item.name}...`);
          } else {
            continue;
          }
        }

        for (const file of item.files) {
          let filePath = path.resolve(targetDir, file.name);

          // Run transformers.
          const content = await transform({
            filename: file.name,
            raw: file.content,
            config,
            baseColor,
          });

          if (!config.tsx) {
            filePath = filePath.replace(/\.tsx$/, ".jsx");
            filePath = filePath.replace(/\.ts$/, ".js");
          }

          await fs.writeFile(filePath, content);
        }

        const packageManager = await getPackageManager(cwd);

        // Install dependencies.
        if (item.dependencies?.length) {
          try {
            await execa(
              packageManager,
              [
                packageManager === "npm" ? "install" : "add",
                ...item.dependencies,
              ],
              {
                cwd,
              },
            );
          } catch (error) {
            logger.warn(
              `\nFailed to install dependencies for ${
                item.name
              }.\n\t-${item.dependencies.join("\n\t- ")}\n\nReason: ${error}`,
            );
          }
        }

        // Install devDependencies.
        if (item.devDependencies?.length) {
          try {
            await execa(
              packageManager,
              [
                packageManager === "npm" ? "install" : "add",
                "-D",
                ...item.devDependencies,
              ],
              {
                cwd,
              },
            );
          } catch (error) {
            logger.warn(
              `\nFailed to install devDependencies for ${
                item.name
              }.\n\t-${item.devDependencies.join(
                "\n\t- ",
              )}\n\nReason: ${error}`,
            );
          }
        }
      }

      spinner.succeed(`Done.`);
    } catch (error) {
      handleError(error);
    }
  });
