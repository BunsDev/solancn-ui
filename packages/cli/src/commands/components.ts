import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import boxen from "boxen";
import ora from "ora";
import { fetchRegistryItems } from "../lib/registry-client";
import { installComponent, uninstallComponent } from "../lib/installer";
import { logger } from "../lib/logger";
import type { RegistryItem } from "../lib/types";

// Create components command group
const components = new Command("components").description(
  "Manage UI components in your project",
);

// List all available components
components
  .command("list")
  .description("List all available UI components")
  .option("-t, --type <type>", "Filter by component type (ui, component)")
  .option("-j, --json", "Output as JSON")
  .action(async (options) => {
    const spinner = ora("Fetching components...").start();

    try {
      const registry = await fetchRegistryItems({ type: "registry:component" });
      const allComponents = registry?.items as unknown as any[];

      let components = allComponents || [];

      // Apply type filter if specified
      if (options.type) {
        const typeMap: Record<string, string> = {
          ui: "registry:ui",
          component: "registry:component",
        };
        const filterType = typeMap[options.type];
        if (filterType) {
          components = allComponents?.filter((item: any) => item.type === filterType);
        }
      }

      spinner.succeed(`Found ${components?.length || 0} components`);

      if (options.json) {
        console.log(JSON.stringify(components, null, 2));
        return;
      }

      // Display a nice boxed header
      console.log(
        boxen(
          `${chalk.bold("Available Components")}\n\nThese components can be installed in your project using the install command.`,
          {
            padding: 1,
            margin: 1,
            borderStyle: "round",
            borderColor: "blue",
            title: "📦 Available Components",
            titleAlignment: "center",
          },
        ),
      );

      // Display components in a formatted table
      console.log("\n");

      for (const component of components) {
        const type =
          component.type === "registry:ui"
            ? chalk.blue("UI")
            : chalk.green("Component");
        console.log(
          `${chalk.bold(component.title)} ${chalk.dim(`(${component.name})`)} - ${type}`,
        );
        console.log(chalk.dim(component.description || "No description"));
        console.log(chalk.dim("─".repeat(80)));
      }

      console.log(
        boxen(
          `To install a component: ${chalk.cyan("solancn components install <name>")}`,
          {
            padding: 0.5,
            margin: { top: 1, bottom: 0, left: 0, right: 0 },
            borderStyle: "round",
            borderColor: "gray",
            dimBorder: true,
          },
        ),
      );
    } catch (error) {
      spinner.fail("Failed to fetch components");
      logger.boxedError(
        `Failed to fetch components: ${error instanceof Error ? error.message : String(error)}`,
        { title: "Error" },
      );
    }
  });

// Add component to project
components
  .command("add")
  .description("Add a component to your project")
  .argument("[name]", "Name of the component to add")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .action(async (name, options) => {
    let title = name;

    // If no component name is provided, show a selection prompt
    if (!name) {
      const spinner = ora("Fetching available components...").start();

      try {
        const registry = await fetchRegistryItems({ type: "registry:component" }) as unknown as Record<string, RegistryItem>;
        const components = Object.values(registry)?.filter(
          (item: any) =>
            item?.type === "registry:ui" || item?.type === "registry:component",
        );

        spinner.stop();

        const answer = await inquirer.prompt([
          {
            type: "list",
            name: "title",
            message: "Select a component to add:",
            choices: components?.map((c: any) => ({
              name: `${c.name} - ${c.description || "No description"}`,
              value: c.name,
            })),
          },
        ]);

        title = answer.title;
      } catch (error) {
        spinner.fail("Failed to fetch components");
        logger.boxedError(
          `Failed to fetch components: ${error instanceof Error ? error.message : String(error)}`,
          { title: "Error" },
        );
        return;
      }
    }

    // Install the component
    const spinner = ora(`Adding ${title} to your project...`).start();

    try {
      const component = await installComponent(
        title,
        options.dir,
        options,
      );
      spinner.succeed(
        `Added ${chalk.green(component.name || title)} to your project`,
      );

      // Display success message with boxen
      logger.boxedSuccess(
        `Component ${chalk.bold(title)} has been installed! \n\nFiles written to: ${chalk.dim(options.dir)}`,
        {
          title: "Installation Complete",
          padding: 1,
        },
      );

      // Show next steps
      console.log("\n");
      console.log(chalk.bold("Next steps:"));
      console.log(`${chalk.bold("1.")} Import the component in your code`);
      console.log(  
        `${chalk.dim(`import { ${title.replace(/-./g, (x: string) => x[1].toUpperCase())} } from "@/components/${title}";`)}`,
      );
      console.log(`${chalk.bold("2.")} Use it in your JSX/TSX`);
      console.log(
        `${chalk.dim(`<${title.replace(/-./g, (x: string) => x[1].toUpperCase())} />`)}`,
      );
      console.log("\n");
    } catch (error) {
      spinner.fail(`Failed to add ${title}`);
      logger.boxedError(
        `Failed to add component: ${error instanceof Error ? error.message : String(error)}`,
        { title: "Error" },
      );
    }
  });

// Remove component from project
components
  .command("remove")
  .description("Remove a component from your project")
  .argument("<name>", "Name of the component to remove")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .action(async (name, options) => {
    const answer = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you want to remove ${name}?`,
        default: false,
      },
    ]);

    if (!answer.confirm) {
      logger.info("Operation cancelled");
      return;
    }

    const spinner = ora(`Removing ${name} from your project...`).start();

    try {
      // Implementation for removing component files
      // This would need to:
      // 1. Check component existence
      // 2. Check dependencies
      // 3. Remove files

      // Use the unified installer for component removal
      await uninstallComponent(name, options.dir, { force: true });

      spinner.succeed(`Removed ${chalk.yellow(name)} from your project`);

      // Display success message with boxen
      logger.boxedSuccess(`Component ${chalk.bold(name)} has been removed!`, {
        title: "Removal Complete",
        padding: 1,
      });
    } catch (error) {
      spinner.fail(`Failed to remove ${name}`);
      logger.boxedError(
        `Failed to remove component: ${error instanceof Error ? error.message : String(error)}`,
        { title: "Error" },
      );
    }
  });

// Search components
components
  .command("search")
  .description("Search for components")
  .argument("<query>", "Search query")
  .action(async (query) => {
    const spinner = ora("Searching components...").start();

    try {
      const registry = await fetchRegistryItems({ type: "registry:component" }) as unknown as Record<string, RegistryItem>;
      const allComponents = registry;

      // Simple search implementation
      const results = Object.values(allComponents).filter(
        (item: any) =>
          item?.name?.includes(query) ||
          item?.name?.toLowerCase().includes(query.toLowerCase()) ||
          item?.description?.toLowerCase().includes(query.toLowerCase()),
      );

      spinner.succeed(`Found ${results.length} matches`);

      if (results.length === 0) {
        console.log(chalk.yellow("\nNo components found matching your query."));
        return;
      }

      // Display boxed search results header
      console.log(
        boxen(`${chalk.bold('Search Results for "${query}"')} \n\n`, {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "blue",
          title: `🔍 Found ${results.length} components`,
          titleAlignment: "center",
        }),
      );

      console.log("\n");
      console.log(`${chalk.bold("Search Results:")}`);
      console.log(chalk.dim("─".repeat(80)));

      for (const component of results) {
        const type =
          component.type === "registry:ui"
            ? chalk.blue("UI")
            : chalk.green("Component");
        console.log(
          `${chalk.bold(component.name)} ${chalk.dim(`(${component.name})`)} - ${type}`,
        );
        console.log(chalk.dim(component.description || "No description"));
        console.log(chalk.dim("─".repeat(80)));
      }
    } catch (error) {
      spinner.fail("Search failed");
      logger.boxedError(
        `Search failed: ${error instanceof Error ? error.message : String(error)}`,
        { title: "Search Error" },
      );
    }
  });

export { components };
