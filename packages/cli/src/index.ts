import { Command } from "commander";
import { init } from "./commands/init";
import { components } from "./commands/components";
import { blocks } from "./commands/blocks";
import { theme } from "./commands/theme";
import { dev } from "./commands/dev";

export function createProgram() {
  const program = new Command();
  
  program
    .name("solancn")
    .description("CLI for solancn design system")
    .version("0.0.3");
  
  program
    .command("init")
    .description("Initialize a new project with solancn")
    .action(init);
  
  // Add the imported command objects directly to the program
  program.addCommand(components);
  program.addCommand(blocks);
  program.addCommand(theme);
  program.addCommand(dev);
  
  return program;
}

// Only parse arguments when this file is executed directly
if (require.main === module) {
  const program = createProgram();
  program.parse(process.argv);
}

// Export for testing
export default createProgram;