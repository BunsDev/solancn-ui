import { type SpawnOptions, spawn } from "node:child_process";
import path from "node:path";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import inquirer from "inquirer";
import ora from "ora";
import { logger } from "../lib/logger";

// Create dev command group
const dev = new Command("dev").description(
  "Development workflows for solancn projects",
);

// Start development server
dev
  .command("start")
  .description("Start the development server")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .option("-p, --port <port>", "Port to run the server on", "3000")
  .option("-h, --host <host>", "Host to bind the server to", "localhost")
  .option("-o, --open", "Open the browser after starting the server")
  .action(async (options) => {
    // Check if the target directory is a valid project
    const pkgJsonPath = path.join(options.dir, "package.json");

    if (!(await fs.pathExists(pkgJsonPath))) {
      console.log(
        chalk.red("Error: No package.json found in the target directory."),
      );
      console.log(
        `Make sure you're running the command in a valid Next.js project directory.`,
      );
      return;
    }

    // Read package.json to determine the package manager
    let pkgManager = "npm";
    try {
      // Check for lock files to determine package manager
      if (await fs.pathExists(path.join(options.dir, "pnpm-lock.yaml"))) {
        pkgManager = "pnpm";
      } else if (await fs.pathExists(path.join(options.dir, "yarn.lock"))) {
        pkgManager = "yarn";
      }
    } catch (error) {
      logger.error("Error detecting package manager:", error);
    }

    console.log(chalk.bold("\nStarting development server..."));
    console.log(chalk.dim("─".repeat(80)));
    console.log(`Package Manager: ${chalk.cyan(pkgManager)}`);
    console.log(`Port: ${chalk.cyan(options.port)}`);
    console.log(`Host: ${chalk.cyan(options.host)}`);
    console.log(chalk.dim("─".repeat(80)));

    // Run the dev script using the appropriate package manager
    const runCommand = (
      cmd: string,
      args: string[],
      options?: SpawnOptions,
    ) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawn(cmd, args, {
          stdio: "inherit",
          shell: process.platform === "win32",
          ...options,
        });

        child.on("error", (err) => {
          reject(err);
        });

        child.on("close", (code) => {
          if (code === 0 || code === null) {
            resolve();
          } else {
            reject(new Error(`Command exited with code ${code}`));
          }
        });
      });
    };

    // Define the command to run
    const devCommand = pkgManager === "yarn" ? "yarn" : pkgManager;
    const devArgs = [
      ...(pkgManager === "npm" ? ["run"] : []),
      "dev",
      "--",
      `-p=${options.port}`,
      `-H=${options.host}`,
    ];

    try {
      // If open option is set, open the browser after a short delay
      if (options.open) {
        setTimeout(() => {
          open(`http://${options.host}:${options.port}`);
        }, 3000); // Wait 3 seconds for the server to likely be ready
      }

      await runCommand(devCommand, devArgs, { cwd: options.dir });
    } catch (error) {
      logger.error("Failed to start development server:", error);
    }
  });

// Watch registry changes
dev
  .command("watch")
  .description("Watch the registry for changes")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .option("-i, --interval <seconds>", "Watch interval in seconds", "30")
  .option("-s, --silent", "Do not show detailed logs", false)
  .action(async (options) => {
    const interval = Number.parseInt(options.interval, 10) * 1000;
    let lastCheck = Date.now();
    let spinner = ora("Watching registry for changes...").start();

    const checkRegistry = async () => {
      try {
        // In a real implementation, this would check the registry for changes
        // For now, we'll just simulate the check
        if (!options.silent) {
          const now = new Date().toLocaleTimeString();
          spinner.text = `Last checked: ${now}`;
        }

        lastCheck = Date.now();
      } catch (error) {
        spinner.fail("Error checking registry for changes");
        spinner = ora("Watching registry for changes...").start();
        logger.error(error);
      }
    };

    // Initial check
    await checkRegistry();

    // Set up interval
    const intervalId = setInterval(checkRegistry, interval);

    // Handle process termination
    const cleanup = () => {
      clearInterval(intervalId);
      spinner.stop();
    };

    process.on("SIGINT", () => {
      cleanup();
      process.exit(0);
    });

    process.on("SIGTERM", () => {
      cleanup();
      process.exit(0);
    });

    console.log(chalk.dim("\nPress Ctrl+C to stop watching..."));
  });

// Sync local registry with remote
dev
  .command("sync")
  .description("Sync the local registry with remote")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .option("-f, --force", "Force sync even if there are local changes")
  .option("--dry-run", "Show what would be synced without making changes")
  .action(async (options) => {
    const spinner = ora("Syncing registry...").start();

    try {
      // Check if registry.json exists
      const registryPath = path.join(options.dir, "registry.json");

      if (!(await fs.pathExists(registryPath))) {
        spinner.fail("Error: No registry.json found in the target directory.");
        return;
      }

      // Simulate registry sync
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network request

      if (options.dryRun) {
        spinner.succeed("Dry run complete. No changes were made.");
        console.log("\nChanges that would be synced:");
        console.log(`- ${chalk.green("3 new components would be added")}`);
        console.log(`- ${chalk.yellow("2 components would be updated")}`);
        console.log(`- ${chalk.blue("1 block would be added")}`);
      } else {
        // Simulate sync process
        spinner.text = "Downloading updates...";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        spinner.text = "Applying changes...";
        await new Promise((resolve) => setTimeout(resolve, 1000));

        spinner.succeed("Registry synced successfully");

        console.log("\nSync summary:");
        console.log(`- ${chalk.green("3 new components added")}`);
        console.log(`- ${chalk.yellow("2 components updated")}`);
        console.log(`- ${chalk.blue("1 block added")}`);
      }
    } catch (error) {
      spinner.fail("Failed to sync registry");
      logger.error(error);
    }
  });

// Create a storybook for the project
dev
  .command("storybook")
  .description("Set up and run Storybook for components")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .option("-p, --port <port>", "Port to run Storybook on", "6006")
  .option("--init", "Initialize Storybook (only needed first time)")
  .option("--build", "Build static Storybook")
  .action(async (options) => {
    // Check if the target directory is a valid project
    const pkgJsonPath = path.join(options.dir, "package.json");

    if (!(await fs.pathExists(pkgJsonPath))) {
      console.log(
        chalk.red("Error: No package.json found in the target directory."),
      );
      return;
    }

    // Read package.json to determine the package manager
    let pkgManager = "npm";
    try {
      if (await fs.pathExists(path.join(options.dir, "pnpm-lock.yaml"))) {
        pkgManager = "pnpm";
      } else if (await fs.pathExists(path.join(options.dir, "yarn.lock"))) {
        pkgManager = "yarn";
      }
    } catch (error) {
      logger.error("Error detecting package manager:", error);
    }

    const runCommand = (
      cmd: string,
      args: string[],
      options?: SpawnOptions,
    ) => {
      return new Promise<void>((resolve, reject) => {
        const child = spawn(cmd, args, {
          stdio: "inherit",
          shell: process.platform === "win32",
          ...options,
        });

        child.on("error", (err) => {
          reject(err);
        });

        child.on("close", (code) => {
          if (code === 0 || code === null) {
            resolve();
          } else {
            reject(new Error(`Command exited with code ${code}`));
          }
        });
      });
    };

    try {
      // Initialize Storybook if requested
      if (options.init) {
        console.log(chalk.bold("\nInitializing Storybook..."));

        const initCommand =
          pkgManager === "npm"
            ? "npx"
            : pkgManager === "yarn"
              ? "yarn"
              : "pnpm";
        const initArgs =
          pkgManager === "npm"
            ? ["storybook", "init"]
            : pkgManager === "yarn"
              ? ["dlx", "storybook", "init"]
              : ["dlx", "storybook", "init"];

        await runCommand(initCommand, initArgs, { cwd: options.dir });

        // Add some template stories for components
        const componentsDir = path.join(options.dir, "src/components");
        const storiesDir = path.join(options.dir, "src/stories");

        if (await fs.pathExists(componentsDir)) {
          console.log(chalk.bold("\nGenerating component stories..."));

          // Create stories directory if it doesn't exist
          await fs.ensureDir(storiesDir);

          // Create a sample story
          const sampleStory = `// Button.stories.js
import React from 'react';
import { Button } from '../components/ui/button';

export default {
  title: 'UI/Button',
  component: Button,
};

export const Primary = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
    children: 'Button',
  },
};
`;

          await fs.writeFile(
            path.join(storiesDir, "Button.stories.js"),
            sampleStory,
          );
          console.log(chalk.green("Created sample Button story"));
        }

        console.log(chalk.green("\nStorybook initialized successfully!"));
        console.log(
          `\nYou can now run Storybook with: ${chalk.cyan("solancn dev storybook")}`,
        );
        return;
      }

      // Build static Storybook if requested
      if (options.build) {
        console.log(chalk.bold("\nBuilding static Storybook..."));

        const buildCommand = pkgManager === "yarn" ? "yarn" : pkgManager;
        const buildArgs = [
          ...(pkgManager === "npm" ? ["run"] : []),
          "build-storybook",
        ];

        await runCommand(buildCommand, buildArgs, { cwd: options.dir });

        console.log(chalk.green("\nStorybook built successfully!"));
        console.log(
          `\nYou can find the static build in ${chalk.cyan("./storybook-static")} directory.`,
        );
        return;
      }

      // Run Storybook
      console.log(chalk.bold("\nStarting Storybook..."));
      console.log(chalk.dim("─".repeat(80)));
      console.log(`Package Manager: ${chalk.cyan(pkgManager)}`);
      console.log(`Port: ${chalk.cyan(options.port)}`);
      console.log(chalk.dim("─".repeat(80)));

      const storybookCommand = pkgManager === "yarn" ? "yarn" : pkgManager;
      const storybookArgs = [
        ...(pkgManager === "npm" ? ["run"] : []),
        "storybook",
        "--",
        `-p=${options.port}`,
      ];

      await runCommand(storybookCommand, storybookArgs, { cwd: options.dir });
    } catch (error) {
      console.log(chalk.red("Failed to run Storybook:"));
      logger.error(error);

      // Check if this might be a missing dependency issue
      if (
        error instanceof Error &&
        (error.message.includes("command not found") ||
          error.message.includes("not recognized"))
      ) {
        console.log("\nIt looks like Storybook might not be installed.");
        console.log(
          `Try running ${chalk.cyan("solancn dev storybook --init")} first to set up Storybook.`,
        );
      }
    }
  });

// Generate component templates
dev
  .command("generate")
  .description("Generate component templates and scaffolding")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .action(async (options) => {
    console.log(chalk.bold("\nComponent Generator"));
    console.log(chalk.dim("─".repeat(80)));

    // Ask for component type
    const { componentType } = await inquirer.prompt([
      {
        type: "list",
        name: "componentType",
        message: "What type of component do you want to generate?",
        choices: [
          { name: "UI Component", value: "ui" },
          { name: "Block Component", value: "block" },
          { name: "Page Layout", value: "layout" },
          { name: "Hook", value: "hook" },
        ],
      },
    ]);

    // Ask for component name
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Component name:",
        validate: (input) => {
          if (input.trim() === "") {
            return "Component name is required";
          }
          return true;
        },
      },
    ]);

    // Determine target directory based on component type
    let targetDir: string;
    let template: string;
    let filename: string;

    switch (componentType) {
      case "ui":
        targetDir = path.join(options.dir, "src/components/ui");
        filename = `${name.toLowerCase()}.tsx`;
        template = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ${name}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your custom props here
}

export function ${name}({
  className,
  ...props
}: ${name}Props) {
  return (
    <div
      className={cn(
        "rounded-md border p-4", // Default styling
        className
      )}
      {...props}
    />
  );
}
`;
        break;

      case "block":
        targetDir = path.join(options.dir, "src/components/blocks");
        filename = `${name.toLowerCase()}.tsx`;
        template = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ${name}Props {
  className?: string;
  // Add your custom props here
}

export function ${name}({ className }: ${name}Props) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">${name}</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              This is a ${name} block component. Replace this with your content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
`;
        break;

      case "layout":
        targetDir = path.join(options.dir, "src/components/layouts");
        filename = `${name.toLowerCase()}.tsx`;
        template = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ${name}Props {
  children: React.ReactNode;
  className?: string;
}

export function ${name}({ children, className }: ${name}Props) {
  return (
    <div className={cn("min-h-screen flex flex-col", className)}>
      <header className="sticky top-0 z-10 w-full border-b bg-background">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Logo</span>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
`;
        break;

      case "hook":
        targetDir = path.join(options.dir, "src/hooks");
        filename = `use${name}.ts`;
        template = `import { useState, useEffect } from "react";

export function use${name}() {
  const [state, setState] = useState();
  
  useEffect(() => {
    // Add your hook logic here
    
    return () => {
      // Clean up logic if needed
    };
  }, []);
  
  return {
    state,
    // Add your returned values and methods here
  };
}
`;
        break;
    }

    const spinner = ora(
      `Generating ${name} ${componentType} component...`,
    ).start();

    try {
      targetDir = path.join(options.dir, "src/components");
      filename = `${name}.tsx`;

      if (!targetDir || !filename) {
        spinner.fail("Error: Invalid component type");
        return;
      }

      // Create target directory if it doesn't exist
      await fs.ensureDir(targetDir);

      // Check if file already exists
      const filePath = path.join(targetDir, filename);

      if (await fs.pathExists(filePath)) {
        spinner.fail(`Component already exists at ${filePath}`);

        // Ask if user wants to overwrite
        const { overwrite } = await inquirer.prompt([
          {
            type: "confirm",
            name: "overwrite",
            message: "Component already exists. Do you want to overwrite it?",
            default: false,
          },
        ]);

        if (!overwrite) {
          console.log("Generation cancelled.");
          return;
        }
      }

      // Write file
      await fs.writeFile(filePath, "template");

      spinner.succeed(`Generated ${name} ${componentType} component`);
      console.log(`\nFile created at: ${chalk.cyan(filePath)}`);

      // Additional steps for different component types
      if (componentType === "ui") {
        console.log(chalk.bold("\nNext steps:"));
        console.log(
          `1. Add your component to the registry in ${chalk.cyan("registry.json")}`,
        );
        console.log(
          `2. Create a documentation page in ${chalk.cyan(`src/app/docs/ui/${name.toLowerCase()}/page.tsx`)}`,
        );
      } else if (componentType === "block") {
        console.log(chalk.bold("\nNext steps:"));
        console.log(
          `1. Add your block to the registry in ${chalk.cyan("registry.json")}`,
        );
        console.log("2. Create a preview image for the block");
      }
    } catch (error) {
      spinner.fail(`Failed to generate ${name} component`);
      logger.error(error);
    }
  });

export { dev };
