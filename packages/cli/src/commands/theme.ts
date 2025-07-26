import { Command } from "commander";
import inquirer, { type Question } from "inquirer";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "node:path";
import { fetchRegistryItem } from "../lib/registry-client";
import { logger } from "../lib/logger";
import boxen from "boxen";

// Create theme command group
const theme = new Command("theme").description(
  "Manage and customize themes for your project",
);

// Get theme info
theme
  .command("info")
  .description("Show information about the current theme")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .action(async (options) => {
    const spinner = ora("Fetching theme information...").start();

    try {
      // Check for tokens.css file in target directory
      const tokensPath = path.join(options.dir, "src/app/tokens.css");
      const hasTokens = await fs.pathExists(tokensPath);

      if (!hasTokens) {
        spinner.fail("No theme found in the current project");
        console.log(
          `\nTo add a theme to your project, run: ${chalk.cyan("solancn theme add")}`,
        );
        return;
      }

      // Read tokens.css content
      const tokensContent = await fs.readFile(tokensPath, "utf-8");

      // Parse CSS variables from tokens.css
      const lightThemeVars: Record<string, string> = {};
      const darkThemeVars: Record<string, string> = {};

      // Extract CSS variables using regex
      const lightVarsMatch = tokensContent.match(
        /--light-mode\s*{\s*([\s\S]*?)}/,
      );
      const darkVarsMatch = tokensContent.match(
        /--dark-mode\s*{\s*([\s\S]*?)}/,
      );

      if (lightVarsMatch?.[1]) {
        const lightVars =
          lightVarsMatch[1].match(/--([^:]+):\s*([^;]+);/g) || [];
        for (const variable of lightVars) {
          const [name, value] = variable.replace("--", "").split(/:\s*/);
          lightThemeVars[name.trim()] = value.replace(";", "").trim();
        }
      }

      if (darkVarsMatch?.[1]) {
        const darkVars = darkVarsMatch[1].match(/--([^:]+):\s*([^;]+);/g) || [];
        for (const variable of darkVars) {
          const [name, value] = variable.replace("--", "").split(/:\s*/);
          darkThemeVars[name.trim()] = value.replace(";", "").trim();
        }
      }

      spinner.succeed("Theme information loaded");

      // Display theme information
      logger.boxedInfo("Theme Information:", {
        title: "Theme Information",
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
        titleAlignment: "center",
      });

      // Light theme
      logger.boxedInfo("Light Theme:", {
        title: "Light Theme",
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
        titleAlignment: "center",
      });
      for (const [key, value] of Object.entries(lightThemeVars)) {
        logger.boxedInfo(`  ${chalk.dim(key)}: ${value}`);
      }

      // Dark theme
      logger.boxedInfo("Dark Theme:", {
        title: "Dark Theme",
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
        titleAlignment: "center",
      });
      for (const [key, value] of Object.entries(darkThemeVars)) {
        logger.boxedInfo(`  ${chalk.dim(key)}: ${value}`);
      }
    } catch (error) {
      spinner.fail("Failed to fetch theme information");
      logger.error(error);
    }
  });

// Add theme to project
theme
  .command("add")
  .description("Add the default theme to your project")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .option("-f, --force", "Force overwrite if files exist")
  .action(async (options) => {
    const spinner = ora("Adding theme to your project...").start();

    try {
      // Fetch theme from registry
      const themeData = await fetchRegistryItem({ type: "theme" });

      if (!themeData) {
        spinner.fail("Failed to fetch theme data");
        return;
      }

      // Create destination directories
      const tokensDestDir = path.join(options.dir, "src/app");
      const globalCssDestDir = path.join(options.dir, "src/app");
      const tailwindConfigDestDir = path.join(options.dir);

      await fs.ensureDir(tokensDestDir);
      await fs.ensureDir(globalCssDestDir);
      await fs.ensureDir(tailwindConfigDestDir);

      // Check if files exist
      const tokensDestPath = path.join(tokensDestDir, "tokens.css");
      const globalCssDestPath = path.join(globalCssDestDir, "globals.css");
      const tailwindConfigDestPath = path.join(
        tailwindConfigDestDir,
        "tailwind.config.ts",
      );

      const tokensExists = await fs.pathExists(tokensDestPath);
      const globalCssExists = await fs.pathExists(globalCssDestPath);
      const tailwindConfigExists = await fs.pathExists(tailwindConfigDestPath);

      if (
        (tokensExists || globalCssExists || tailwindConfigExists) &&
        !options.force
      ) {
        spinner.fail("Theme files already exist in the project");
        logger.boxedWarning(
          `Theme files already exist in the project\n\n
					Use ${chalk.cyan("--force")} flag to overwrite existing files.`,
          { title: "Files Already Exist" },
        );
        return;
      }

      // Get file contents from registry (simulated for now)
      // In a real implementation, you'd fetch these from the registry API
      const tokensContent = `/* Generated by solancn CLI */\n@layer base {\n  :root, :root[data-theme="light"], .light-mode {\n    --primary: oklch(0.52 0.13 144.17);\n    --primary-foreground: oklch(1.0 0 0);\n    --radius: 0.5rem;\n  }\n  \n  .dark-mode, :root[data-theme="dark"] {\n    --primary: oklch(0.52 0.13 144.17);\n    --primary-foreground: oklch(1.0 0 0);\n  }\n}\n`;

      const globalsCssContent = `/* Generated by solancn CLI */\n@import "./tokens.css";\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;

      const tailwindConfigContent = `/* Generated by solancn CLI */\nimport type { Config } from "tailwindcss";\n\nconst config: Config = {\n  darkMode: ["class", '[data-theme="dark"]'],\n  content: [\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {\n      colors: {\n        primary: "var(--primary)",\n        "primary-foreground": "var(--primary-foreground)",\n      },\n      borderRadius: {\n        DEFAULT: "var(--radius)",\n      },\n    },\n  },\n  plugins: [],\n};\nexport default config;\n`;

      // Write files
      await fs.writeFile(tokensDestPath, tokensContent);
      await fs.writeFile(globalCssDestPath, globalsCssContent);
      await fs.writeFile(tailwindConfigDestPath, tailwindConfigContent);

      spinner.succeed("Theme files added to your project");

      // Show summary in boxen
      logger.boxedSuccess(
        `Theme files added:\n\n
				${chalk.dim("src/app/tokens.css")} - Theme tokens and variables
				${chalk.dim("src/app/globals.css")} - Global CSS with Tailwind imports
				${chalk.dim("tailwind.config.ts")} - Tailwind configuration\n\n
				Next steps:\n 1. Update your theme by editing ${chalk.dim("src/app/tokens.css")}\n 2. Import globals.css in your layout or entry file`,
        {
          title: "Theme Added Successfully",
          padding: 1,
        },
      );
    } catch (error) {
      spinner.fail("Failed to add theme to your project");
      logger.error(error);
    }
  });

// Customize theme
theme
  .command("customize")
  .description("Customize theme tokens interactively")
  .option("-d, --dir <directory>", "Target directory", process.cwd())
  .action(async (options) => {
    // Check for tokens.css file in target directory
    const tokensPath = path.join(options.dir, "src/app/tokens.css");
    const hasTokens = await fs.pathExists(tokensPath);

    if (!hasTokens) {
      logger.boxedWarning(
        `No theme found in the current project\n\nTo add a theme to your project, run: ${chalk.cyan("solancn theme add")}`,
        { title: "Theme Not Found" },
      );
      return;
    }

    // Display theme customization heading with boxen
    console.log(
      boxen(
        `Theme Customization\n\nLet's customize your theme colors. You can provide values in any valid CSS format.\nFor best results with shadcn/ui, oklch format is recommended.`,
        {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "cyan",
          title: "🎨 Customize Theme",
          titleAlignment: "center",
        },
      ),
    );

    // Define the interface for our answers
    interface ThemeCustomizationAnswers {
      primaryLight: string;
      primaryForegroundLight: string;
      primaryDark: string;
      primaryForegroundDark: string;
      radius: string;
    }

    // Use the inquirer v12 approach with an array of questions
    const answers = await inquirer.prompt<ThemeCustomizationAnswers>([
      {
        type: 'input',
        name: 'primaryLight',
        message: 'Light theme - Primary color:',
        default: 'oklch(0.52 0.13 144.17)'
      },
      {
        type: 'input',
        name: 'primaryForegroundLight',
        message: 'Light theme - Primary foreground color:',
        default: 'oklch(1.0 0 0)'
      },
      {
        type: 'input',
        name: 'primaryDark',
        message: 'Dark theme - Primary color:',
        default: 'oklch(0.52 0.13 144.17)'
      },
      {
        type: 'input',
        name: 'primaryForegroundDark',
        message: 'Dark theme - Primary foreground color:',
        default: 'oklch(1.0 0 0)'
      },
      {
        type: 'input',
        name: 'radius',
        message: 'Border radius:',
        default: '0.5rem'
      }
    ]);

    // Generate tokens.css content
    const tokensContent = `/* Generated by solancn CLI */
@layer base {
  :root, :root[data-theme="light"], .light-mode {
    --primary: ${answers.primaryLight};
    --primary-foreground: ${answers.primaryForegroundLight};
    --radius: ${answers.radius};
  }
  
  .dark-mode, :root[data-theme="dark"] {
    --primary: ${answers.primaryDark};
    --primary-foreground: ${answers.primaryForegroundDark};
  }
}
`;

    // Save the file
    const spinner = ora("Saving theme customization...").start();

    try {
      await fs.writeFile(tokensPath, tokensContent);
      spinner.succeed("Theme customized successfully");

      logger.boxedSuccess(
        `Theme customization applied successfully!\n\nNext steps:\n 1. Restart your dev server to see changes\n 2. Fine-tune your theme by editing ${chalk.dim("src/app/tokens.css")} directly if needed`,
        { title: "Theme Customized" },
      );
    } catch (error) {
      spinner.fail("Failed to save theme customization");
      logger.error(error);
    }
  });

// Export theme
theme
  .command("export")
  .description("Export theme configuration")
  .option("-d, --dir <directory>", "Source directory", process.cwd())
  .option("-o, --output <file>", "Output file", "theme-export.json")
  .option("-f, --format <format>", "Export format (json, css)", "json")
  .action(async (options) => {
    const spinner = ora("Exporting theme configuration...").start();

    try {
      // Check for tokens.css file
      const tokensPath = path.join(options.dir, "src/app/tokens.css");
      const hasTokens = await fs.pathExists(tokensPath);

      if (!hasTokens) {
        spinner.fail("No theme found in the current project");
        return;
      }

      // Read tokens.css content
      const tokensContent = await fs.readFile(tokensPath, "utf-8");

      // Parse CSS variables
      const lightThemeVars: Record<string, string> = {};
      const darkThemeVars: Record<string, string> = {};

      // Extract CSS variables using regex
      const lightVarsMatch = tokensContent.match(
        /--light-mode\s*{\s*([\s\S]*?)}/,
      );
      const darkVarsMatch = tokensContent.match(
        /--dark-mode\s*{\s*([\s\S]*?)}/,
      );

      if (lightVarsMatch?.[1]) {
        const lightVars =
          lightVarsMatch[1].match(/--([^:]+):\s*([^;]+);/g) || [];
        for (const variable of lightVars) {
          const [name, value] = variable.replace("--", "").split(/:\s*/);
          lightThemeVars[name.trim()] = value.replace(";", "").trim();
        }
      }

      if (darkVarsMatch?.[1]) {
        const darkVars = darkVarsMatch[1].match(/--([^:]+):\s*([^;]+);/g) || [];
        for (const variable of darkVars) {
          const [name, value] = variable.replace("--", "").split(/:\s*/);
          darkThemeVars[name.trim()] = value.replace(";", "").trim();
        }
      }

      // Create export data
      const exportData = {
        name: "Exported Theme",
        type: "registry:style",
        cssVars: {
          light: lightThemeVars,
          dark: darkThemeVars,
        },
      };

      // Export based on format
      if (options.format === "json") {
        await fs.writeFile(options.output, JSON.stringify(exportData, null, 2));
      } else if (options.format === "css") {
        let cssOutput = "/* Exported from solancn CLI */\n@layer base {\n";
        cssOutput += '  :root, :root[data-theme="light"], .light-mode {\n';

        for (const [key, value] of Object.entries(lightThemeVars)) {
          cssOutput += `    --${key}: ${value};\n`;
        }

        cssOutput += "  }\n\n";
        cssOutput += '  .dark-mode, :root[data-theme="dark"] {\n';

        for (const [key, value] of Object.entries(darkThemeVars)) {
          cssOutput += `    --${key}: ${value};\n`;
        }

        cssOutput += "  }\n}\n";

        await fs.writeFile(options.output, cssOutput);
      }

      spinner.succeed(`Theme exported to ${options.output}`);
    } catch (error) {
      spinner.fail("Failed to export theme configuration");
      logger.error(error);
    }
  });

export { theme };
