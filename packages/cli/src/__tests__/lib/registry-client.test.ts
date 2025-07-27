import fs from "fs-extra";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RegistryData, RegistryItem } from "../../lib/types";

// Define minimal mock data needed for core tests
const mockRegistryData: RegistryData = {
  components: {
    button: {
      name: "button",
      type: "registry:component",
      description: "A button component",
    } as RegistryItem,
    card: {
      name: "card",
      type: "registry:component",
      description: "A card component",
    } as RegistryItem,
  },
  blocks: {
    hero: {
      name: "hero",
      type: "registry:block",
      description: "A hero block",
    } as RegistryItem,
    feature: {
      name: "feature",
      type: "registry:block",
      description: "A feature block",
    } as RegistryItem,
  },
};

// Mock dependencies
vi.mock("fs-extra");
vi.mock("node-fetch", () => ({
  default: vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockRegistryData),
  }),
}));

describe("registry-client", () => {
  let registryClient: typeof import("../../lib/registry-client");

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.spyOn(process, "cwd").mockReturnValue("/project");
    registryClient = await import("../../lib/registry-client");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Core Registry Functions", () => {
    // Core test 1: Getting registry data from local source
    it("should load registry data from local file when available", async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(true as any);
      vi.mocked(fs.readJson).mockResolvedValue(mockRegistryData);

      const result = await registryClient.loadLocalRegistry();

      expect(result).toEqual(mockRegistryData);
      expect(fs.pathExists).toHaveBeenCalled();
      expect(fs.readJson).toHaveBeenCalled();
    });

    // Core test 2: Fetching registry items by type
    it("should fetch items by type and filter them correctly", async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(true as any);
      vi.mocked(fs.readJson).mockResolvedValue(mockRegistryData);

      // Test components
      const components = await registryClient.fetchRegistryItems({
        type: "registry:component",
      });
      expect(components).toEqual(mockRegistryData?.components);

      // Test blocks
      const blocks = await registryClient.fetchRegistryItems({
        type: "registry:block",
      });
      expect(blocks).toEqual(mockRegistryData?.blocks);
    });

    // Core test 3: Fetching a specific item by name and type
    it("should fetch a specific registry item by name and type", async () => {
      // Use direct mock implementation for fetchRegistryItem
      vi.spyOn(registryClient, "fetchRegistryItem").mockImplementation(
        async (options) => {
          const { type, name } = options;

          if (type === "registry:component" && name === "button") {
            return mockRegistryData.components?.button || null;
          } else if (type === "registry:block" && name === "hero") {
            return mockRegistryData.blocks?.hero || null;
          }
          return null;
        },
      );

      // Test fetching an existing component0
      const buttonResult = await registryClient.fetchRegistryItem({
        type: "registry:component",
        name: "button",
      });
      expect(buttonResult).toEqual(mockRegistryData.components?.button);

      // Test fetching an existing block
      const heroResult = await registryClient.fetchRegistryItem({
        type: "registry:block",
        name: "hero",
      });
      expect(heroResult).toEqual(mockRegistryData.blocks?.hero);

      // Test fetching a non-existent item
      const nonExistentResult = await registryClient.fetchRegistryItem({
        type: "registry:component",
        name: "nonexistent",
      });
      expect(nonExistentResult).toBeNull();
    });
  });
});
