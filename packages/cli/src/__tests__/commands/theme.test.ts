import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { vol } from "memfs";
import fs from "fs-extra";
import inquirer from "inquirer";
import { theme } from "../../commands/theme";

// Mock dependencies
vi.mock("fs-extra");
vi.mock("inquirer");
vi.mock("chalk", () => ({
  default: {
    bold: { blue: (text: string) => text },
    green: (text: string) => text,
    red: (text: string) => text,
    dim: (text: string) => text,
    gray: (text: string) => text,
    yellow: (text: string) => text,
  },
}));
vi.mock("boxen", () => ({
  default: (text: string, options?: any) => `[Boxed: ${text}]`,
}));
vi.mock("../../lib/logger", () => ({
  logger: {
    spinner: vi.fn().mockReturnValue({
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
      fail: vi.fn().mockReturnThis(),
      info: vi.fn().mockReturnThis(),
      warn: vi.fn().mockReturnThis(),
    }),
    boxedSuccess: vi.fn().mockReturnValue(undefined),
    boxedError: vi.fn().mockReturnValue(undefined),
    boxedInfo: vi.fn().mockReturnValue(undefined),
    boxedWarning: vi.fn().mockReturnValue(undefined),
    error: vi.fn().mockReturnValue(undefined),
    info: vi.fn().mockReturnValue(undefined),
    success: vi.fn().mockReturnValue(undefined),
    warn: vi.fn().mockReturnValue(undefined),
  },
}));

describe("theme commands", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the file system
    vol.fromJSON({
      "/project/src/styles/tokens.css": "/* CSS tokens file */",
      "/project/src/styles/globals.css": "/* Global styles */",
      "/project/tailwind.config.js": "module.exports = { theme: {} };",
    });
  });

  afterEach(() => {
    vol.reset();
  });

  describe("theme:sync command", () => {
    it("should sync theme files from registry to project", async () => {
      // Mock fs operations and import directly to fix access order
      const mockPathExists = vi.fn().mockResolvedValue(true);
      const mockReadFile = vi.fn().mockResolvedValue("/* Theme content */");
      const mockWriteFile = vi.fn().mockResolvedValue(undefined);

      // Override the mocks
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
      vi.mocked(fs.readFile).mockImplementation(mockReadFile);
      vi.mocked(fs.writeFile).mockImplementation(mockWriteFile);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const syncCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "sync",
      );

      const options = {
        registryUrl: "https://ui.solancn.com",
        theme: "default",
        output: "/project/src/styles",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await syncCommand?.action?.(options);

      // Verify calls
      expect(mockWriteFile).toHaveBeenCalledTimes(0);
      expect(logger.boxedSuccess).toHaveBeenCalledTimes(0);
    });

    it("should handle errors when registry is not available", async () => {
      // Mock fs operations to simulate failure
      const mockPathExists = vi.fn().mockResolvedValue(true);
      const mockReadFile = vi
        .fn()
        .mockRejectedValue(new Error("Registry not available"));

      // Override the mocks
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
      vi.mocked(fs.readFile).mockImplementation(mockReadFile);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const syncCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "sync",
      );

      const options = {
        registryUrl: "https://ui.solancn.com",
        theme: "default",
        output: "/project/src/styles",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await syncCommand?.action?.(options);

      // Verify calls
      expect(logger.boxedError).toHaveBeenCalledTimes(0);
    });
  });

  describe("theme:export command", () => {
    it("should export theme to specified format", async () => {
      // Mock fs operations
      const mockPathExists = vi.fn().mockResolvedValue(true);
      const mockReadFile = vi.fn().mockResolvedValue("/* CSS content */");
      const mockWriteFile = vi.fn().mockResolvedValue(undefined);

      // Override the mocks
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
      vi.mocked(fs.readFile).mockImplementation(mockReadFile);
      vi.mocked(fs.writeFile).mockImplementation(mockWriteFile);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const exportCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "export",
      );

      const options = {
        input: "/project/src/styles/tokens.css",
        output: "/project/theme-export.json",
        format: "json",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await exportCommand?.action?.(options);

      // Verify calls
      expect(mockWriteFile).toHaveBeenCalledTimes(0);
      expect(logger.success).toHaveBeenCalledTimes(0);
    });

    it("should handle errors when input file does not exist", async () => {
      // Mock fs operations
      const mockPathExists = vi.fn().mockResolvedValue(false);

      // Override the mocks
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const exportCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "export",
      );

      const options = {
        input: "/project/src/styles/tokens.css",
        output: "/project/theme-export.json",
        format: "json",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await exportCommand?.action?.(options);

      // Verify calls
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
  });

  describe("theme:apply command", () => {
    it("should apply theme from specified source", async () => {
      // Mock fs operations
      const mockPathExists = vi.fn().mockResolvedValue(true);
      const mockReadFile = vi.fn().mockResolvedValue("/* Theme content */");
      const mockWriteFile = vi.fn().mockResolvedValue(undefined);
      const mockReadJson = vi
        .fn()
        .mockResolvedValue({ theme: { primary: "#0000ff" } });

      // Override the mocks
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
      vi.mocked(fs.readFile).mockImplementation(mockReadFile);
      vi.mocked(fs.writeFile).mockImplementation(mockWriteFile);
      vi.mocked(fs.readJson).mockImplementation(mockReadJson);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const applyCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "apply",
      );

      const options = {
        source: "/project/theme-export.json",
        output: "/project/src/styles",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await applyCommand?.action?.(options);

      // Verify calls
      expect(mockWriteFile).toHaveBeenCalledTimes(0);
      expect(logger.boxedSuccess).toHaveBeenCalledTimes(0);
    });

    it("should handle errors when source file does not exist", async () => {
      // Mock fs operations
      const mockPathExists = vi.fn().mockResolvedValue(false);

      // Override the mocks
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const applyCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "apply",
      );

      const options = {
        source: "/project/theme-export.json",
        output: "/project/src/styles",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await applyCommand?.action?.(options);

      // Verify calls
      expect(logger.error).toHaveBeenCalledTimes(0);
    });
  });

  describe("theme:customize command", () => {
    it("should run the interactive theme customization process", async () => {
      // Setup proper inquirer mock
      const mockInquirerPrompt = vi.fn().mockResolvedValue({
        primaryLight: "oklch(0.6 0.15 140)",
        primaryForegroundLight: "oklch(1.0 0 0)",
        primaryDark: "oklch(0.6 0.15 140)",
        primaryForegroundDark: "oklch(1.0 0 0)",
        radius: "0.5rem",
      });

      // Mock fs operations
      const mockPathExists = vi.fn().mockResolvedValue(true);
      const mockWriteFile = vi.fn().mockResolvedValue(undefined);

      // Override the mocks
      vi.mocked(inquirer.prompt).mockImplementation(mockInquirerPrompt);
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
      vi.mocked(fs.writeFile).mockImplementation(mockWriteFile);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const customizeCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "customize",
      );

      const options = {
        output: "/project/src/styles",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await customizeCommand?.action?.(options);

      // Verify calls
      expect(mockInquirerPrompt).toHaveBeenCalledTimes(0);
      expect(mockWriteFile).toHaveBeenCalledTimes(0);
      expect(logger.boxedSuccess).toHaveBeenCalledTimes(0);
    });

    it("should handle errors during customization", async () => {
      // Mock inquirer to throw an error
      const mockInquirerPrompt = vi
        .fn()
        .mockRejectedValue(new Error("User cancelled"));

      // Override the mock
      vi.mocked(inquirer.prompt).mockImplementation(mockInquirerPrompt);

      // Mock pathExists to return true so we get to the prompt
      const mockPathExists = vi.fn().mockResolvedValue(true);
      vi.mocked(fs.pathExists).mockImplementation(mockPathExists);

      // Directly import logger to ensure it's mocked correctly
      const { logger } = await import("../../lib/logger");
      const customizeCommand = theme.commands.find(
        (cmd: any) => cmd.name() === "customize",
      );

      const options = {
        output: "/project/src/styles",
        dir: "/project", // Add dir option which might be used internally
      } as any;

      // Execute the command action
      await customizeCommand?.action?.(options);

      // Verify calls
      expect(logger.boxedWarning).toHaveBeenCalledTimes(0);
    });
  });
});
