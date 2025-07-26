// First import vitest
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Define mocks before any imports of modules that will be mocked
const mockSpinner = {
  start: vi.fn().mockReturnThis(),
  stop: vi.fn().mockReturnThis(),
  succeed: vi.fn().mockReturnThis(),
  fail: vi.fn().mockReturnThis(),
  text: vi.fn().mockReturnThis(),
};

// Set up mocks before importing the actual modules
vi.mock("fs-extra");
vi.mock("../../lib/registry-client");
vi.mock("../../lib/logger", async () => {
  return {
    logger: {
      info: vi.fn(),
      debug: vi.fn(),
      success: vi.fn(),
      error: vi.fn(),
      warn: vi.fn(),
      spinner: vi.fn().mockReturnValue(mockSpinner),
    },
  };
});

// Import dependencies after setting up mocks
import fs from "fs-extra";
import type { RegistryItem, InstallOptions } from "../../lib/types";
import { logger } from "../../lib/logger";
import * as registryClient from "../../lib/registry-client";
import * as installer from "../../lib/installer";

describe("installer", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock process.cwd()
    vi.spyOn(process, "cwd").mockReturnValue("/project");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ===== Common Registry Items for Tests =====

  const mockComponent: RegistryItem = {
    name: "button",
    type: "component",
    description: "A button component",
    files: {
      "button.tsx": "export const Button = () => {}",
      "button.css": ".button {}",
    },
    dependencies: ["react@^18.0.0", "@/components/button"],
  };

  const mockBlock: RegistryItem = {
    name: "hero",
    type: "block",
    description: "A hero block",
    files: {
      "hero.tsx": "export default function Hero() { return <div>Hero</div> }",
      "hero.css": ".hero {}",
    },
    dependencies: ["@/components/button"],
  };

  // ===== Item Installation Tests =====

  describe("installItem", () => {
    beforeEach(() => {
      vi.mocked(fs.ensureDir).mockResolvedValue();
      vi.mocked(fs.writeFile).mockResolvedValue();
      vi.mocked(fs.pathExists).mockResolvedValue(false as unknown as any); // Default to files not existing
    });

    it("should install component successfully", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );

      const options = {
        force: false as const,
        dependencies: true as const,
        targetDir: "/project/components",
      } as InstallOptions;

      const result = await installer.installItem(
        "button",
        "/project/components",
        {
          ...options,
          itemType: "component",
        },
      );

      expect(logger.spinner).toHaveBeenCalledWith(
        "Installing component: button",
      );
      expect(registryClient.fetchRegistryItem).toHaveBeenCalledWith(
        "button",
        "component",
      );
      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalledTimes(
        mockComponent.files ? Object.keys(mockComponent.files).length : 0,
      );
      expect(mockSpinner.succeed).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.componentName).toBe("button");
    });

    it("should install block successfully", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockBlock,
      );

      const options = {
        force: false as const,
        dependencies: true as const,
        targetDir: "/project/blocks",
      } as InstallOptions;

      const result = await installer.installItem("hero", "/project/blocks", {
        ...options,
        itemType: "block",
      });

      expect(logger.spinner).toHaveBeenCalledWith("Installing block: hero");
      expect(registryClient.fetchRegistryItem).toHaveBeenCalledWith(
        "hero",
        "block",
      );
      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.writeFile).toHaveBeenCalledTimes(
        Object.keys(mockBlock.files || {}).length,
      );
      expect(mockSpinner.succeed).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.componentName).toBe("hero");
    });

    it("should handle item not found", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(null);

      const options = {
        force: false as const,
        dependencies: true as const,
        targetDir: "/project/components",
      } as InstallOptions;

      const result = await installer.installItem(
        "nonexistent",
        "/project/components",
        options,
      );

      expect(mockSpinner.fail).toHaveBeenCalled();
      expect(result.success).toBe(false);
      expect(result.message).toContain("not found in registry");
    });

    it("should handle fs operation errors", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );
      vi.mocked(fs.ensureDir).mockRejectedValueOnce(
        new Error("Directory creation failed"),
      );

      const options = {
        force: false,
        dependencies: true, // Enable dependencies installation
      };

      await expect(
        installer.installItem("button", "/project/components", options),
      ).rejects.toThrow("Directory creation failed");

      expect(mockSpinner.fail).toHaveBeenCalled();
    });

    it("should skip dependency installation when option is set", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );

      const options: InstallOptions = {
        dependencies: false,
        force: false,
        targetDir: "/project/components",
      };

      await installer.installItem("button", "/project/components", options);

      // We're not testing the actual dependency installation here,
      // just that the function completes successfully
      expect(mockSpinner.succeed).toHaveBeenCalled();
    });

    it("should create backup if force is enabled and files exist", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );
      vi.mocked(fs.pathExists).mockResolvedValue(true as unknown as any); // Files exist
      vi.spyOn(installer, "backupFiles").mockResolvedValue();

      const options: InstallOptions = {
        dependencies: false,
        force: true,
        targetDir: "/project/components",
      };

      await installer.installItem("button", "/project/components", options);

      expect(installer.backupFiles).toHaveBeenCalled();
      expect(mockSpinner.succeed).toHaveBeenCalled();
    });

    it("should not install if files exist and force is false", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );
      vi.mocked(fs.pathExists).mockResolvedValue(true as unknown as any); // Files exist

      const options = {
        force: false,
        dependencies: true, // Enable dependencies installation
      };

      const result = await installer.installItem(
        "button",
        "/project/components",
        options,
      );

      expect(result.success).toBe(false);
      expect(result.message).toContain("already exists");
      expect(mockSpinner.fail).toHaveBeenCalled();
    });
  });

  // ===== Item Uninstallation Tests =====

  describe("uninstallItem", () => {
    beforeEach(() => {
      vi.mocked(fs.pathExists).mockResolvedValue(true as unknown as any);
      vi.mocked(fs.remove).mockResolvedValue();
    });

    it("should uninstall component successfully", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );

      const result = await installer.uninstallItem(
        "button",
        "/project/components",
        {
          itemType: "component",
        },
      );

      expect(logger.spinner).toHaveBeenCalledWith(
        "Uninstalling component: button",
      );
      expect(registryClient.fetchRegistryItem).toHaveBeenCalledWith(
        "button",
        "component",
      );
      expect(fs.remove).toHaveBeenCalledTimes(
        mockComponent.files ? Object.keys(mockComponent.files).length : 0,
      );
      expect(mockSpinner.succeed).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should uninstall block successfully", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockBlock,
      );

      const result = await installer.uninstallItem("hero", "/project/blocks", {
        itemType: "block",
      });

      expect(logger.spinner).toHaveBeenCalledWith("Uninstalling block: hero");
      expect(registryClient.fetchRegistryItem).toHaveBeenCalledWith(
        "hero",
        "block",
      );
      expect(fs.remove).toHaveBeenCalledTimes(
        mockBlock.files ? Object.keys(mockBlock.files).length : 0,
      );
      expect(mockSpinner.succeed).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it("should handle item not found in registry", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(null);

      const result = await installer.uninstallItem(
        "nonexistent",
        "/project/components",
      );

      expect(result.success).toBe(false);
      expect(result.message).toContain("not found in registry");
      expect(mockSpinner.fail).toHaveBeenCalled();
    });

    it("should handle uninstall errors", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );
      vi.mocked(fs.remove).mockRejectedValueOnce(new Error("Removal failed"));

      await expect(
        installer.uninstallItem("button", "/project/components"),
      ).rejects.toThrow("Removal failed");

      expect(mockSpinner.fail).toHaveBeenCalled();
    });
  });

  // ===== Item Installation Status Tests =====

  describe("isItemInstalled", () => {
    it("should return true when all item files exist", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );
      vi.mocked(fs.pathExists).mockResolvedValue(true as unknown as any);

      const result = await installer.isItemInstalled(
        "button",
        "component",
        "/project/components",
      );

      expect(result).toBe(true as any);
      expect(fs.pathExists).toHaveBeenCalledTimes(
        mockComponent.files ? Object.keys(mockComponent.files).length : 0,
      );
    });

    it("should return false when item not found in registry", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(null);

      const result = await installer.isItemInstalled(
        "nonexistent",
        "component",
        "/project/components",
      );

      expect(result).toBe(false as any);
    });

    it("should return false when any file is missing", async () => {
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(
        mockComponent,
      );
      vi.mocked(fs.pathExists)
        .mockResolvedValueOnce(true as unknown as any)
        .mockResolvedValueOnce(false as unknown as any);

      const result = await installer.isItemInstalled(
        "button",
        "component",
        "/project/components",
      );

      expect(result).toBe(false as any);
    });
  });

  // ===== Backup Files Tests =====

  describe("backupFiles", () => {
    beforeEach(() => {
      vi.mocked(fs.pathExists).mockResolvedValue(true as unknown as any);
      vi.mocked(fs.ensureDir).mockResolvedValue();
      vi.mocked(fs.copy).mockResolvedValue();
    });

    it("should create backups for existing files", async () => {
      const files = ["button.tsx", "button.css"];
      const targetDir = "/project/components";

      await installer.backupFiles(files, targetDir);

      expect(fs.ensureDir).toHaveBeenCalled();
      expect(fs.copy).toHaveBeenCalledTimes(files.length);
    });

    it("should not backup files that do not exist", async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false as unknown as any);

      const files = ["button.tsx", "button.css"];
      const targetDir = "/project/components";

      await installer.backupFiles(files, targetDir);

      expect(fs.copy).not.toHaveBeenCalled();
    });

    it("should handle errors during backup", async () => {
      vi.mocked(fs.copy).mockRejectedValueOnce(new Error("Backup failed"));

      const files = ["button.tsx", "button.css"];
      const targetDir = "/project/components";

      await expect(installer.backupFiles(files, targetDir)).rejects.toThrow(
        "Backup failed",
      );
    });
  });

  // ===== Dependencies Installation Tests =====

  describe("installDependencies", () => {
    it("should skip installation when no dependencies are provided", async () => {
      await installer.installDependencies([], "/project");

      expect(logger.info).toHaveBeenCalledWith("No dependencies to install");
    });

    it("should log installation for provided dependencies", async () => {
      const dependencies = ["react@^18.0.0", "@/components/button"];

      await installer.installDependencies(dependencies, "/project");

      expect(logger.info).toHaveBeenCalledTimes(3); // Once for starting message + twice for each dependency
    });
  });

  // ===== Backward Compatibility Tests =====

  describe("backward compatibility functions", () => {
    beforeEach(() => {
      vi.spyOn(installer, "installItem").mockResolvedValue({
        success: true,
        componentName: "test",
        message: "success",
        files: [],
      });

      vi.spyOn(installer, "uninstallItem").mockResolvedValue({
        success: true,
        componentName: "test",
        message: "success",
        files: [],
      });

      vi.spyOn(installer, "isItemInstalled").mockResolvedValue(true);
    });

    it("should call installItem from installComponent", async () => {
      await installer.installComponent("button", "/project/components", {
        dependencies: false,
      });

      expect(installer.installItem).toHaveBeenCalledWith(
        "button",
        "/project/components",
        { dependencies: false, itemType: "component" },
      );
    });

    it("should call installItem from installBlock", async () => {
      await installer.installBlock("hero", "/project/blocks", {
        dependencies: false,
      });

      expect(installer.installItem).toHaveBeenCalledWith(
        "hero",
        "/project/blocks",
        { dependencies: false, itemType: "block" },
      );
    });

    it("should call uninstallItem from uninstallComponent", async () => {
      await installer.uninstallComponent("button", "/project/components", {
        force: true,
      });

      expect(installer.uninstallItem).toHaveBeenCalledWith(
        "button",
        "/project/components",
        { force: true, itemType: "component" },
      );
    });

    it("should call uninstallItem from uninstallBlock", async () => {
      await installer.uninstallBlock("hero", "/project/blocks", {
        force: true,
      });

      expect(installer.uninstallItem).toHaveBeenCalledWith(
        "hero",
        "/project/blocks",
        { force: true, itemType: "block" },
      );
    });

    it("should call isItemInstalled from isComponentInstalled", async () => {
      await installer.isComponentInstalled("button", "/project/components");

      expect(installer.isItemInstalled).toHaveBeenCalledWith(
        "button",
        "component",
        "/project/components",
      );
    });

    it("should call isItemInstalled from isBlockInstalled", async () => {
      await installer.isBlockInstalled("hero", "/project/blocks");

      expect(installer.isItemInstalled).toHaveBeenCalledWith(
        "hero",
        "block",
        "/project/blocks",
      );
    });
  });
});
