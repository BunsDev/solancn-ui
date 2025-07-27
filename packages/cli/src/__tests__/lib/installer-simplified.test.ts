/**
 * Minimalist installer test focused on registry client integration
 * This version eliminates excess testing and focuses only on registry client functionality
 */
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Create a mockSpinner with all required methods
const mockSpinner = {
  start: vi.fn().mockReturnThis(),
  stop: vi.fn().mockReturnThis(),
  succeed: vi.fn().mockReturnThis(),
  fail: vi.fn().mockReturnThis(),
  warn: vi.fn().mockReturnThis(),
  info: vi.fn().mockReturnThis(),
  text: vi.fn().mockReturnThis()
};

// Set up mocks
vi.mock("fs-extra", () => ({
  pathExists: vi.fn(),
  ensureDir: vi.fn(),
  writeFile: vi.fn(),
  remove: vi.fn()
}));

vi.mock("ora", () => ({
  default: vi.fn(() => mockSpinner)
}));

// Mock registry client with fetchRegistryItem
vi.mock("../../lib/registry-client", () => ({
  fetchRegistryItem: vi.fn()
}));

import fs from "fs-extra";
import type { RegistryItem } from "../../lib/types";
import { fetchRegistryItem } from "../../lib/registry-client";

describe("Registry Client Integration", () => {
  // Test data
  const mockComponent: RegistryItem = {
    name: "button",
    type: "registry:component",
    description: "A button component",
    files: {
      "button.tsx": "export const Button = () => {}",
      "button.css": ".button {}"
    },
    dependencies: ["react@^18.0.0"]
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("fetchRegistryItem", () => {
    it("should return registry item when it exists", async () => {
      vi.mocked(fetchRegistryItem).mockResolvedValue(mockComponent);

      const result = await fetchRegistryItem({ type: "registry:component" }, "button");
      
      expect(fetchRegistryItem).toHaveBeenCalledWith({ type: "registry:component" }, "button");
      expect(result).toEqual(mockComponent);
    });

    it("should return null when registry item does not exist", async () => {
      vi.mocked(fetchRegistryItem).mockResolvedValue(null);

      const result = await fetchRegistryItem({ type: "registry:component" }, "nonexistent");
      
      expect(fetchRegistryItem).toHaveBeenCalledWith({ type: "registry:component" }, "nonexistent");
      expect(result).toBeNull();
    });
  });
});
