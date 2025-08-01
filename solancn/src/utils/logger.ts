import chalk from "chalk";
import gradient from "gradient-string";

export const logger = {
  error(...args: unknown[]) {
    console.log(chalk.red(...args));
  },
  warn(...args: unknown[]) {
    console.log(chalk.yellow(...args));
  },
  info(...args: unknown[]) {
    console.log(chalk.cyan(...args));
  },
  success(...args: unknown[]) {
    console.log(chalk.green(...args));
  },
  break() {
    console.log("");
  },
};

const TEXT = `
███████╗ ██████╗ ██╗      █████╗ ███╗   ██╗ ██████╗███╗   ██╗    ██╗   ██╗██╗
██╔════╝██╔═══██╗██║     ██╔══██╗████╗  ██║██╔════╝████╗  ██║    ██║   ██║██║
███████╗██║   ██║██║     ███████║██╔██╗ ██║██║     ██╔██╗ ██║    ██║   ██║██║
╚════██║██║   ██║██║     ██╔══██║██║╚██╗██║██║     ██║╚██╗██║    ██║   ██║██║
███████║╚██████╔╝███████╗██║  ██║██║ ╚████║╚██████╗██║ ╚████║    ╚██████╔╝██║
╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═══╝     ╚═════╝ ╚═╝
`;

const theme = {
  purple: "#9945FF",
  green: "#14F195",
};

const printer = gradient(Object.values(theme));

export const ASCII_TEXT = printer.multiline(TEXT);

export const message = `
Solancn - Component library made by BunsDev.
 → https://solancn.com
`;

export const ColorFullText = (string: string) => printer.multiline(string);
