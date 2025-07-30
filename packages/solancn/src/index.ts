#!/usr/bin/env node
import { add } from "./commands/add"
import { build } from "./commands/build"
import { diff } from "./commands/diff"
import { info } from "./commands/info"
import { init } from "./commands/init"
import { migrate } from "./commands/migrate"
import { Command } from "commander"

import packageJson from "../package.json"

process.on("SIGINT", () => process.exit(0))
process.on("SIGTERM", () => process.exit(0))

async function main() {
  const program = new Command()
    .name("solancn")
    .description("add components and dependencies to your project")
    .version(
      packageJson.version || "1.0.0",
      "-v, --version",
      "display the version number"
    )

  program
    .addCommand(init)
    .addCommand(add)
    .addCommand(diff)
    .addCommand(migrate)
    .addCommand(info)
    .addCommand(build)

  program.parse()
}

main()

export * from "./registry/api"
