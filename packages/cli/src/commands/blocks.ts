import chalk from "chalk";
import { Command } from "commander";
import inquirer from "inquirer";
import ora from "ora";
import { installBlock } from "../lib/installer";
import { logger } from "../lib/logger";
import { fetchRegistryItems } from "../lib/registry-client";
import type { RegistryItem } from "../lib/types";

// import { spawnSync } from 'child_process';

// Create blocks command group
const blocks = new Command("blocks").description(
  "Manage UI blocks in your project",
);

// List all available blocks
blocks
  .command("list")
  .description("List all available blocks")
  .option("-j, --json", "Output as JSON")
  .action(async (options) => {
    const spinner = ora("Fetching blocks...").start();

    try {
      const registry = (await fetchRegistryItems({
        type: "registry:block",
      })) as Record<string, RegistryItem>;
      const allBlocks = Object.values(registry)?.filter(
        (item: RegistryItem) => item.type === "registry:block",
      );

      spinner.succeed(`Found ${allBlocks.length} blocks`);

      if (options.json) {
        console.log(JSON.stringify(allBlocks, null, 2));
        return;
      }

      // Display blocks in a formatted table
      console.log("\n");
      console.log(chalk.bold("Available Blocks:"));
      console.log(chalk.dim("─".repeat(80)));

      for (const block of allBlocks) {
        console.log(
          `${chalk.bold(block.name)} ${chalk.dim(`(${block.name})`)}`,
        );
        console.log(chalk.dim(block.description || "No description"));

        // Display dependencies if any
        if (block.dependencies && block.dependencies.length > 0) {
          console.log(chalk.dim(`Dependencies: ${block.dependencies.length}`));
        }

        console.log(chalk.dim("─".repeat(80)));
      }
    } catch (error) {
      spinner.fail("Failed to fetch blocks");
      logger.error(error);
    }
  });

// Add block to project
blocks
  .command("add")
  .description("Add a block to your project")
  .argument("[name]", "Name of the block to add")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .option("-f, --force", "Force overwrite if files exist")
  .action(async (name, options) => {
    let blockName = name;

    // If no block name is provided, show a selection prompt
    if (!blockName) {
      const spinner = ora("Fetching available blocks...").start();

      try {
        const registry = (await fetchRegistryItems({
          type: "registry:block",
        })) as Record<string, RegistryItem>;
        const blocks = Object.values(registry)?.filter(
          (item: RegistryItem) => item.type === "registry:block",
        );

        spinner.stop();

        const answer = await inquirer.prompt([
          {
            type: "list",
            name: "blockName",
            message: "Select a block to add:",
            choices:
              blocks?.map((b: RegistryItem) => ({
                name: `${b.name} - ${b.description || "No description"}`,
                value: b.name,
              })) || [],
          },
        ]);

        blockName = answer.blockName;
      } catch (error) {
        spinner.fail("Failed to fetch blocks");
        logger.error(error);
        return;
      }
    }

    // Get target directory
    const targetDir = options.dir;

    // Install the block
    const spinner = ora(`Adding ${blockName} block to your project...`).start();

    try {
      const block = await installBlock(blockName, targetDir, {
        force: options.force,
      });
      spinner.succeed(
        `Added ${chalk.green(block.name || blockName)} block to your project`,
      );

      // Show next steps
      console.log("\n");
      console.log(chalk.bold("Next steps:"));
      console.log("1. Review the files created in your project");
      console.log("2. Run your project to see the new block");
      console.log(` ${chalk.dim("pnpm dev")}`);
      console.log("\n");
    } catch (error) {
      spinner.fail(`Failed to add ${blockName}`);
      logger.error(error);
    }
  });

// Preview block in browser
blocks
  .command("preview")
  .description("Preview a block in the browser")
  .argument("[name]", "Name of the block to preview")
  .option("-p, --port <port>", "Port to use for preview server", "3001")
  .action(async (name, options) => {
    let blockName = name;

    // If no block name is provided, show a selection prompt
    if (!blockName) {
      const spinner = ora("Fetching available blocks...").start();

      try {
        const registry = (await fetchRegistryItems({
          type: "registry:block",
        })) as Record<string, RegistryItem>;
        const blocks = Object.values(registry)?.filter(
          (item: RegistryItem) => item.type === "registry:block",
        );

        spinner.stop();

        const answer = await inquirer.prompt([
          {
            type: "list",
            name: "blockName",
            message: "Select a block to preview:",
            choices:
              blocks?.map((b: RegistryItem) => ({
                name: `${b.name} - ${b.description || "No description"}`,
                value: b.name,
              })) || [],
          },
        ]);

        blockName = answer.blockName;
      } catch (error) {
        spinner.fail("Failed to fetch blocks");
        logger.error(error);
        return;
      }
    }

    const spinner = ora(`Preparing preview for ${blockName}...`).start();

    try {
      // Determine the registry URL for preview
      const registryBaseUrl =
        process.env.REGISTRY_URL || "https://ui.solancn.com";
      const previewUrl = `${registryBaseUrl}/preview/${blockName}?port=${options.port}`;

      spinner.succeed(`Opening preview for ${chalk.green(blockName)}`);

      // Open the preview URL in the browser
      await open(previewUrl);
    } catch (error) {
      spinner.fail(`Failed to preview ${blockName}`);
      logger.error(error);
    }
  });

// Export block to v0
blocks
  .command("open-in-v0")
  .description("Open a block in v0.dev")
  .argument("[name]", "Name of the block to open in v0")
  .action(async (name) => {
    let blockName = name;

    // If no block name is provided, show a selection prompt
    if (!blockName) {
      const spinner = ora("Fetching available blocks...").start();

      try {
        const registry = (await fetchRegistryItems({
          type: "registry:block",
        })) as Record<string, RegistryItem>;
        const blocks = Object.values(registry)?.filter(
          (item: RegistryItem) => item.type === "registry:block",
        );

        spinner.stop();

        const answer = await inquirer.prompt([
          {
            type: "list",
            name: "blockName",
            message: "Select a block to open in v0.dev:",
            choices:
              blocks?.map((b: RegistryItem) => ({
                name: `${b.name} - ${b.description || "No description"}`,
                value: b.name,
              })) || [],
          },
        ]);

        blockName = answer.blockName;
      } catch (error) {
        spinner.fail("Failed to fetch blocks");
        logger.error(error);
        return;
      }
    }

    const spinner = ora(`Preparing to open ${blockName} in v0.dev...`).start();

    try {
      // Determine the registry URL
      const registryBaseUrl =
        process.env.REGISTRY_URL || "https://ui.solancn.com";

      // Create the v0.dev URL
      const v0Url = `https://v0.dev/chat/api/open?title=solancn&prompt=These+are+existing+design+system+styles+and+files.+Please+utilize+them+alongside+base+components+to+build.&url=${encodeURIComponent(`${registryBaseUrl}/r/${blockName}.json`)}`;

      spinner.succeed(`Opening ${chalk.green(blockName)} in v0.dev`);

      // Open the v0.dev URL in the browser
      await open(v0Url);
    } catch (error) {
      spinner.fail(`Failed to open ${blockName} in v0.dev`);
      logger.error(error);
    }
  });

export { blocks };
