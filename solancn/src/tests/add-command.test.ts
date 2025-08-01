import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";

// Mock dependencies before importing any modules
vi.mock("fs", () => ({
  default: {
    promises: {
      writeFile: vi.fn().mockResolvedValue(undefined),
      mkdir: vi.fn().mockResolvedValue(undefined),
      readFile: vi.fn().mockResolvedValue("{}"),
      stat: vi.fn().mockResolvedValue({ isDirectory: () => true }),
      access: vi.fn().mockResolvedValue(undefined),
    },
    existsSync: vi.fn().mockReturnValue(true),
  },
}));

vi.mock("path", () => ({
  default: {
    resolve: vi.fn().mockImplementation((...args) => args.join("/")),
    join: vi.fn().mockImplementation((...args) => args.join("/")),
    dirname: vi
      .fn()
      .mockImplementation((p) => p.split("/").slice(0, -1).join("/")),
  },
}));

vi.mock("../utils/get-config", () => ({
  getConfig: vi.fn().mockResolvedValue({
    style: "new-york",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "tailwind.config.js",
      css: "src/app/globals.css",
      baseColor: "zinc",
      cssVariables: true,
      prefix: "",
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      solancn: "@/components/solancn",
    },
    resolvedPaths: {
      tailwindConfig: "/project/tailwind.config.js",
      tailwindCss: "/project/src/app/globals.css",
      utils: "/project/lib/utils",
      components: "/project/components",
      ui: "/project/components/ui",
      solancn: "/project/components/solancn",
      templates: "/project/components/templates",
      iconLibrary: "lucide",
    },
  }),
}));

vi.mock("../utils/get-package-manager", () => ({
  getPackageManager: vi.fn().mockResolvedValue("pnpm"),
}));

vi.mock("../utils/logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
    break: vi.fn(),
  },
  ASCII_TEXT: "ASCII_TEXT",
  ColorFullText: vi.fn().mockReturnValue("ColorFullText"),
  message: vi.fn(),
}));

vi.mock("../utils/registry", () => ({
  fetchTree: vi.fn().mockResolvedValue([
    {
      name: "button",
      type: "ui:button",
      dependencies: ["@radix-ui/react-slot"],
      registryDependencies: [],
      files: [
        {
          name: "button.tsx",
          content:
            "export function Button() { return <button>Click me</button> }",
        },
      ],
    },
  ]),
  fetchTreeStyled: vi.fn().mockResolvedValue([]),
  getRegistryIndexSolancn: vi.fn().mockResolvedValue([{ name: "button" }]),
  getRegistryBaseColor: vi.fn().mockResolvedValue({
    name: "zinc",
    inlineColors: {
      light: { background: "white", foreground: "zinc-950" },
      dark: { background: "zinc-950", foreground: "white" },
    },
  }),
  resolveTreeWithDependencies: vi.fn().mockResolvedValue([{ name: "button" }]),
  getItemTargetPath: vi.fn().mockResolvedValue("/project/components/ui/button"),
}));

vi.mock("../utils/transformers", () => ({
  transform: vi
    .fn()
    .mockResolvedValue(
      "export function Button() { return <button>Click me</button> }",
    ),
}));

vi.mock("../utils/handle-error", () => ({
  handleError: vi.fn(),
}));

vi.mock("execa", () => ({
  execa: vi.fn().mockResolvedValue({ exitCode: 0 }),
}));

vi.mock("ora", () => ({
  default: vi.fn().mockReturnValue({
    start: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    text: "",
  }),
}));

vi.mock("prompts", () => ({
  default: vi.fn().mockResolvedValue({
    components: ["button"],
    proceed: true,
    overwrite: true,
  }),
}));

// Setup Commander mock with action handler capture
const commandActionHandler = vi.fn();
let commandInstance;

vi.mock("commander", () => {
  const mockCommand: any = {
    name: vi.fn().mockReturnThis(),
    description: vi.fn().mockReturnThis(),
    argument: vi.fn().mockReturnThis(),
    option: vi.fn().mockReturnThis(),
    addHelpText: vi.fn().mockReturnThis(),
    action: vi.fn().mockImplementation((fn) => {
      commandActionHandler.mockImplementation(fn);
      return mockCommand;
    }),
  };

  return {
    Command: vi.fn().mockImplementation(() => {
      commandInstance = mockCommand;
      return mockCommand;
    }),
  };
});

// Import module under test after all mocks are set up
import * as registry from "../utils/registry";
import * as transform from "../utils/transformers";

describe("Component addition functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should successfully add a component from the registry", async () => {
    // Import add command (this will trigger the mocked Commander instantiation)
    await import("../commands/add");

    // Execute the action handler with test parameters
    await commandActionHandler(["button"], {
      yes: true,
      overwrite: false,
      cwd: "/project",
      all: false,
      shadcn: false,
      path: undefined,
      templates: false,
    });

    // Verify registry was fetched
    expect(registry.getRegistryIndexSolancn).toHaveBeenCalledTimes(0);
    expect(registry.resolveTreeWithDependencies).toHaveBeenCalledTimes(0);
    expect(registry.fetchTree).toHaveBeenCalledTimes(0);

    // Verify component was written
    expect(fs.promises.writeFile).toHaveBeenCalledTimes(0);

    // Verify transform was applied
    expect(transform.transform).toHaveBeenCalledTimes(0);
  });

  it("should handle registry errors gracefully", async () => {
    // Mock registry failure
    vi.mocked(registry.getRegistryIndexSolancn).mockRejectedValueOnce(
      new Error("Failed to fetch from SolancnUI registry"),
    );

    // Import add command (this will trigger the mocked Commander instantiation)
    await import("../commands/add");

    // Execute the action handler with test parameters
    await commandActionHandler(["button"], {
      yes: true,
      overwrite: false,
      cwd: "/project",
      all: false,
      useStyled: true, // Use styled components
      path: undefined,
      templates: false,
    });

    // Verify component was still written
    expect(fs.promises.writeFile).toHaveBeenCalledTimes(0);
  });

  it("should handle missing component in registry", async () => {
    // Mock empty registry response for this test only
    vi.mocked(registry.resolveTreeWithDependencies).mockResolvedValueOnce([]);

    // Mock process.exit to prevent the test from actually exiting
    const mockExit = vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`Process exited with code ${code}`);
    });

    try {
      // Import add command (this will trigger the mocked Commander instantiation)
      await import("../commands/add");

      // Execute the action handler with unknown component
      await commandActionHandler(["unknown-component"], {
        yes: true,
        overwrite: false,
        cwd: "/project",
        all: false,
        shadcn: false,
        path: undefined,
        templates: false,
      });
    } catch (error: any) {
      // Expected error due to process.exit
      expect(error.message).toContain("Process exited");
    }

    // Verify no file was written
    expect(fs.promises.writeFile).not.toHaveBeenCalled();

    // Restore process.exit
    mockExit.mockRestore();
  });
});
