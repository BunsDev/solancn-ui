import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { ASCII_TEXT, ColorFullText, logger } from "../utils/logger";
import { getRegistryIndexSolancn, getRegistryIndexShadcn } from "../utils/registry";
import { z } from "zod";

const listOptionsSchema = z.object({
    shadcn: z.boolean(),
    json: z.boolean(),
    category: z.string().optional(),
});

type ComponentCategory = "ui" | "layout" | "form" | "data" | "navigation" | "animation" | "other";

interface ListOptions {
    shadcn: boolean;
    json: boolean;
    category?: string;
}

export const listComponents = new Command()
    .name("list")
    .description("List all available Solancn components")
    .option("-s, --shadcn", "include components from shadcn registry", false)
    .option("-j, --json", "output as JSON format", false)
    .option("-c, --category <category>", "filter components by category")
    .addHelpText("after", ColorFullText(ASCII_TEXT))
    .action(async (opts) => {
        console.log(ASCII_TEXT, ColorFullText(ASCII_TEXT));

        let spinner = ora();

        try {
            const options = listOptionsSchema.parse(opts) as ListOptions;

            spinner.start("Fetching components...");

            // Fetch components from registries
            const solancnComponents = await getRegistryIndexSolancn();
            let shadcnComponents = options.shadcn ? await getRegistryIndexShadcn() : [];

            spinner.succeed("Components fetched successfully");

            // Filter by category if specified
            let filteredSolancnComponents = solancnComponents;
            let filteredShadcnComponents = shadcnComponents;

            if (options.category) {
                filteredSolancnComponents = solancnComponents.filter(
                    (component) => component.type === options.category
                );

                filteredShadcnComponents = shadcnComponents.filter(
                    (component) => component.type === options.category
                );
            }

            // Output as JSON if requested
            if (options.json) {
                const result = {
                    solancn: filteredSolancnComponents,
                    ...(options.shadcn ? { shadcn: filteredShadcnComponents } : {}),
                };
                console.log(JSON.stringify(result, null, 2));
                return;
            }

            // Display components in a formatted table
            console.log("\n");

            if (filteredSolancnComponents.length > 0) {
                console.log(chalk.bold.underline("Solancn Components:"));
                console.log(
                    chalk.dim("NAME                DESCRIPTION                                   TYPE")
                );

                filteredSolancnComponents.forEach((component) => {
                    const name = component.name.padEnd(20);
                    // Use name as description since description isn't available in the component type
                    const description = component.name.substring(0, 40).padEnd(40);
                    const type = component.type || "ui";

                    console.log(`${chalk.green(name)} ${description} ${chalk.yellow(type)}`);
                });

                console.log(`\n${chalk.green("Total:")} ${filteredSolancnComponents.length} components\n`);
            } else if (options.category) {
                console.log(chalk.yellow(`No Solancn components found in category: ${options.category}\n`));
            } else {
                console.log(chalk.yellow("No Solancn components available\n"));
            }

            if (options.shadcn) {
                if (filteredShadcnComponents.length > 0) {
                    console.log(chalk.bold.underline("Shadcn Components:"));
                    console.log(
                        chalk.dim("NAME                DESCRIPTION                                   TYPE")
                    );

                    filteredShadcnComponents.forEach((component) => {
                        const name = component.name.padEnd(20);
                        // Use name as description since description isn't available in the component type
                        const description = component.name.substring(0, 40).padEnd(40);
                        const type = component.type || "ui";

                        console.log(`${chalk.blue(name)} ${description} ${chalk.yellow(type)}`);
                    });

                    console.log(`\n${chalk.blue("Total:")} ${filteredShadcnComponents.length} components\n`);
                } else if (options.category) {
                    console.log(chalk.yellow(`No Shadcn components found in category: ${options.category}\n`));
                } else {
                    console.log(chalk.yellow("No Shadcn components available\n"));
                }
            }

            // Help text
            console.log(chalk.dim("To add components, run:"));
            console.log(chalk.dim(`  npx solancn add <component-name>`));
            console.log(chalk.dim(`  # or include shadcn components:`));
            console.log(chalk.dim(`  npx solancn add <component-name> --shadcn`));
        } catch (error) {
            if (spinner) {
                spinner.fail("Failed to list components");
            }
            if (error instanceof Error) {
                logger.error(error.message);
            } else {
                logger.error("An unknown error occurred");
            }
            process.exit(1);
        }
    });
