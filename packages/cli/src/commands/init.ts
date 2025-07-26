import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import boxen from "boxen";
import { fetchRegistryItem } from "../lib/registry-client";
import { logger } from "../lib/logger";

export async function init() {
  // Display welcome message with boxen
  console.log(
    boxen(
      `${chalk.bold.blue("Welcome to solancn")}\n\nLet's set up your new project with modern UI components, blocks, and themes. ${chalk.dim("Follow the prompts to customize your setup.")}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
        title: "🚀 Project Setup",
        titleAlignment: "center",
      },
    ),
  );

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is your project name?",
      default: "my-solancn-app",
    },
    {
      type: "list",
      name: "template",
      message: "Select a starter template:",
      choices: ["blank", "dashboard", "store"],
    },
  ]);

  const spinner = ora("Creating project...").start();

  try {
    // Create project directory
    await fs.mkdir(answers.projectName);

    // Fetch template from registry
    const template = await fetchRegistryItem(answers.template);

    // Process template files and write to disk
    // ...

    spinner.succeed("Project created successfully!");

    // Display next steps in a box
    logger.boxedSuccess(
      `Your ${chalk.bold(answers.template)} project has been created at ${chalk.bold(answers.projectName)}!\n\nNext steps:\n\n${chalk.cyan("cd")} ${answers.projectName}\n\n${chalk.cyan("pnpm install")}\n\n${chalk.cyan("pnpm dev")}`,
      {
        title: "✨ Ready to Go!",
        padding: 1,
        margin: { top: 1, bottom: 1, left: 0, right: 0 },
      },
    );
  } catch (error) {
    spinner.fail("Failed to create project");
    logger.boxedError(
      `There was an error creating your project: ${error instanceof Error ? error.message : String(error)}\n\nPlease check your network connection and try again.`,
      {
        title: "Error Creating Project",
        padding: 1,
      },
    );
  }
}
