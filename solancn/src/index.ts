#!/usr/bin/env node
import { addComponent } from "./commands/add";
import { init } from "./commands/init";
import { Command } from "commander";

import { getPackageInfo } from "./utils/get-package-info";
import { ColorFullText, message } from "./utils/logger";

process.on("SIGINT", async () => {
  process.exit(0);
});

process.on("SIGTERM", async () => {
  process.exit(0);
});

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .addHelpText("before", message)
    .addHelpText("after", ColorFullText(message))
    .name("solancn")
    .description("Add Solancn components to your apps.")
    .version(
      packageInfo.version || "0.0.8",
      "-v, --version",
      "display the version number",
    );

  program.addCommand(init).addCommand(addComponent);

  // .addCommand(auth).addCommand(project);

  program.parse();
}

main();
