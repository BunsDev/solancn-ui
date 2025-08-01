import path from "path";
import { resolveImport } from "../utils/resolve-import";
import { cosmiconfig } from "cosmiconfig";
import { loadConfig } from "tsconfig-paths";
import { z } from "zod";

export const DEFAULT_STYLE = "new-york";
export const DEFAULT_COMPONENTS = "./components";
export const DEFAULT_COMPONENTS_UI = "./components/ui";
export const DEFAULT_COMPONENTS_SOLANCN = "./components/solancn";
export const DEFAULT_UTILS = "./lib/utils";
export const DEFAULT_TAILWIND_CSS = "./src/app/globals.css";
export const DEFAULT_TAILWIND_CONFIG = "./tailwind.config.js";
export const DEFAULT_TAILWIND_BASE_COLOR = "zinc";
export const DEFAULT_ICONS_PREFIX = "lucide";
export const DEFAULT_TEMPLATES = "./templates";
export const DEFAULT_DOCS = "./docs";
export const DEFAULT_LIB = "./lib";
export const DEFAULT_HOOKS = "./hooks";

// TODO: Figure out if we want to support all cosmiconfig formats.
// A simple components.json file would be nice.
const explorer = cosmiconfig("components", {
  searchPlaces: ["components.json"],
});

export const rawConfigSchema = z
  .object({
    $schema: z.string().optional(),
    style: z.string(),
    rsc: z.coerce.boolean().default(true),
    tsx: z.coerce.boolean().default(true),
    tailwind: z.object({
      config: z.string(),
      css: z.string(),
      baseColor: z.string(),
      cssVariables: z.boolean().default(true),
      prefix: z.string().default("").optional(),
    }),
    aliases: z.object({
      components: z.string(),
      utils: z.string(),
      ui: z.string().optional(),
      solancn: z.string().optional(),
      templates: z.string().optional(),
      docs: z.string().optional(),
      lib: z.string().optional(),
      hooks: z.string().optional(),
    }),
    iconLibrary: z.string().optional(),
  })
  .strict();

export type RawConfig = z.infer<typeof rawConfigSchema>;

export const configSchema = rawConfigSchema.extend({
  resolvedPaths: z.object({
    tailwindConfig: z.string(),
    tailwindCss: z.string(),
    utils: z.string(),
    components: z.string(),
    ui: z.string(),
    solancn: z.string(),
    templates: z.string(),
    docs: z.string().optional(),
    lib: z.string().optional(),
    hooks: z.string().optional(),
    iconLibrary: z.string().optional(),
  }),
});

export type Config = z.infer<typeof configSchema>;

export async function getConfig(cwd: string) {
  const config = await getRawConfig(cwd);

  if (!config) {
    return null;
  }

  return await resolveConfigPaths(cwd, config);
}

export async function resolveConfigPaths(cwd: string, config: RawConfig) {
  // Read tsconfig.json.
  const tsConfig = await loadConfig(cwd);

  if (tsConfig.resultType === "failed") {
    throw new Error(
      `Failed to load ${config.tsx ? "tsconfig" : "jsconfig"}.json. ${
        tsConfig.message ?? ""
      }`.trim(),
    );
  }
  const components = await resolveImport(
    config.aliases["components"],
    tsConfig,
  );
  const ui = `${components}/ui`;
  const solancn = `${components}/solancn`;

  const newAliases = {
    ui: `${config.aliases.components}/ui`,
    solancn: `${config.aliases.components}/solancn`,
  };

  const newConfig = {
    ...config,
    aliases: {
      ...config.aliases,
      ...newAliases,
    },
    resolvedPaths: {
      tailwindConfig: path.resolve(cwd, config.tailwind.config),
      tailwindCss: path.resolve(cwd, config.tailwind.css),
      utils: await resolveImport(config.aliases["utils"], tsConfig),
      components,
      ui,
      solancn,
      templates: config.aliases.templates ? await resolveImport(config.aliases.templates, tsConfig) : `${components}/templates`,
      docs: config.aliases.docs ? await resolveImport(config.aliases.docs, tsConfig) : undefined,
      lib: config.aliases.lib ? await resolveImport(config.aliases.lib, tsConfig) : undefined,
      hooks: config.aliases.hooks ? await resolveImport(config.aliases.hooks, tsConfig) : undefined,
      iconLibrary: config.iconLibrary,
    },
  };
  return configSchema.parse(newConfig);
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd);

    if (!configResult) {
      return null;
    }

    return rawConfigSchema.parse(configResult.config);
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`);
  }
}
