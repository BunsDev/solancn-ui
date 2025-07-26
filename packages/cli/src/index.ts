import { Command } from "commander";
import { init } from "./commands/init";
import { components } from "./commands/components";
import { blocks } from "./commands/blocks";
import { theme } from "./commands/theme";
import { dev } from "./commands/dev";

const program = new Command();

program
	.name("solancn")
	.description("CLI for solancn design system")
	.version("0.0.1");

program
	.command("init")
	.description("Initialize a new project with solancn")
	.action(init);

// Add the imported command objects directly to the program
program.addCommand(components);
program.addCommand(blocks);
program.addCommand(theme);
program.addCommand(dev);

program.parse();
