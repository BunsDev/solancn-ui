#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import * as path from "path";
import { execa } from "execa";

// Set TEST_MODE to true for our mock environment
process.env.TEST_MODE = "true";

async function mockCLI() {
  console.log(chalk.bold.cyan("🧪 Solancn Mock CLI Interactive Environment"));
  console.log(chalk.bold.yellow("Running in TEST_MODE - using mock registry data\n"));

  // Create a temporary working directory for the mock CLI
  const mockWorkDir = path.join(process.cwd(), ".mock-cli-workspace");
  console.log(chalk.gray(`Mock workspace: ${mockWorkDir}\n`));
  
  // Create the program
  const program = new Command();
  
  // Setup the program with commands that will execute the actual CLI in test mode
  program
    .name("solancn-mock")
    .description("Solancn Mock CLI for testing")
    .version("mock-version");

  // Add the list command
  program
    .command("list")
    .description("List all available components")
    .option("-c, --category <category>", "Filter components by category")
    .option("-j, --json", "Output as JSON")
    .action(async (options) => {
      const spinner = ora("Fetching components...").start();
      try {
        // Build command arguments based on options
        const args = ["list"];
        if (options.category) args.push("-c", options.category);
        if (options.json) args.push("--json");
        
        // Execute CLI command directly
        const { stdout } = await execa("node", ["./dist/index.js", ...args], {
          env: { TEST_MODE: "true" }
        });
        
        spinner.succeed("Components fetched successfully");
        console.log(stdout);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail(`Error fetching components: ${errorMessage}`);
      }
    });

  // Add the add command
  program
    .command("add <component>")
    .description("Add a component to your project")
    .option("-p, --path <path>", "Path to add the component to")
    .option("-t, --template", "Use a template")
    .option("-y, --yes", "Skip confirmation")
    .action(async (component, options) => {
      const spinner = ora(`Adding component ${component}...`).start();
      try {
        // Build command arguments based on options
        const args = ["add", component];
        if (options.path) args.push("-p", options.path);
        if (options.template) args.push("-t");
        if (options.yes) args.push("-y");
        
        // Execute CLI command directly
        const { stdout } = await execa("node", ["./dist/index.js", ...args], {
          env: { TEST_MODE: "true" }
        });
        
        spinner.succeed(`Component ${component} added successfully`);
        console.log(stdout);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail(`Error adding component: ${errorMessage}`);
      }
    });

  // Add the init command
  program
    .command("init")
    .description("Initialize Solancn in your project")
    .option("-p, --path <path>", "Path to initialize Solancn in")
    .option("-y, --yes", "Skip confirmation")
    .action(async (options) => {
      const spinner = ora("Initializing Solancn...").start();
      try {
        // Build command arguments based on options
        const args = ["init"];
        if (options.path) args.push("-p", options.path);
        if (options.yes) args.push("-y");
        
        // Execute CLI command directly
        const { stdout } = await execa("node", ["./dist/index.js", ...args], {
          env: { TEST_MODE: "true" }
        });
        
        spinner.succeed("Solancn initialized successfully");
        console.log(stdout);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        spinner.fail(`Error initializing Solancn: ${errorMessage}`);
      }
    });

  // Start the interactive CLI
  async function promptForCommand() {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "List components", value: "list" },
          { name: "Add a component", value: "add" },
          { name: "Initialize project", value: "init" },
          { name: "Run a custom command", value: "custom" },
          { name: "Exit", value: "exit" }
        ]
      }
    ]);

    if (action === "exit") {
      console.log(chalk.green("Exiting mock CLI. Goodbye!"));
      return;
    }

    if (action === "list") {
      const { category, outputJson } = await inquirer.prompt([
        {
          type: "input",
          name: "category",
          message: "Filter by category (leave empty for all):",
          default: ""
        },
        {
          type: "confirm",
          name: "outputJson",
          message: "Output as JSON?",
          default: false
        }
      ]);

      const options: any = {};
      if (category) options.category = category;
      if (outputJson) options.json = true;

      await program.commands.find(cmd => cmd.name() === "list")?.action(options);
    } else if (action === "add") {
      const { component, path, template, yes } = await inquirer.prompt([
        {
          type: "input",
          name: "component",
          message: "Component name to add:",
          validate: (input) => !!input || "Component name is required"
        },
        {
          type: "input",
          name: "path",
          message: "Path to add the component to (leave empty for default):",
          default: ""
        },
        {
          type: "confirm",
          name: "template",
          message: "Use a template?",
          default: false
        },
        {
          type: "confirm",
          name: "yes",
          message: "Skip confirmation?",
          default: false
        }
      ]);

      const options: any = {};
      if (path) options.path = path;
      if (template) options.template = true;
      if (yes) options.yes = true;

      await program.commands.find(cmd => cmd.name() === "add")?.action(component);
    } else if (action === "init") {
      const { path, yes } = await inquirer.prompt([
        {
          type: "input",
          name: "path",
          message: "Path to initialize Solancn in (leave empty for current directory):",
          default: ""
        },
        {
          type: "confirm",
          name: "yes",
          message: "Skip confirmation?",
          default: false
        }
      ]);

      const options: any = {};
      if (path) options.path = path;
      if (yes) options.yes = true;

      await program.commands.find(cmd => cmd.name() === "init")?.action(options);
    } else if (action === "custom") {
      const { command } = await inquirer.prompt([
        {
          type: "input",
          name: "command",
          message: "Enter custom command (e.g. 'list --json'):",
          validate: (input) => !!input || "Command is required"
        }
      ]);

      try {
        // Parse the command
        await program.parseAsync(["node", "solancn-mock", ...command.split(" ")]);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(chalk.red(`Error executing command: ${errorMessage}`));
      }
    }

    // Continue the prompt loop unless exit was chosen
    if (action !== "exit") {
      console.log(); // Add a newline for better readability
      await promptForCommand();
    }
  }

  await promptForCommand();
}

mockCLI().catch((error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(chalk.red(`Error in mock CLI: ${errorMessage}`));
  process.exit(1);
});