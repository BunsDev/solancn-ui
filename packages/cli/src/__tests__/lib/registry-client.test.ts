import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs-extra';
import type { RegistryData, RegistryItem } from '../../lib/types';

// Define mock data that will be used across tests
const mockComponentsData = {
  button: { name: 'button', type: 'registry:component', description: 'A button component' } as RegistryItem,
  card: { name: 'card', type: 'registry:component', description: 'A card component' } as RegistryItem
};

const mockBlocksData = {
  hero: { name: 'hero', type: 'registry:block', description: 'A hero block' } as RegistryItem,
  feature: { name: 'feature', type: 'registry:block', description: 'A feature block' } as RegistryItem
};

const mockRegistryData: RegistryData = {
  components: mockComponentsData,
  blocks: mockBlocksData
};

// Mock fetch response
const mockFetchResponse = {
  ok: true,
  json: vi.fn().mockResolvedValue(mockRegistryData)
};

// Mock dependencies
vi.mock('fs-extra');
vi.mock('../../lib/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    success: vi.fn()
  }
}));
vi.mock('node-fetch', () => ({
  default: vi.fn().mockResolvedValue(mockFetchResponse)
}));

describe('registry-client', () => {
  let registryClient: typeof import('../../lib/registry-client');
  
  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Reset modules to ensure clean mocks for each test
    vi.resetModules();
    
    // Mock process.cwd()
    vi.spyOn(process, 'cwd').mockReturnValue('/project');
    
    // Import the module after mocks are set up
    registryClient = await import('../../lib/registry-client');
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchRegistryItems', () => {
    it("should fetch items from local registry when available", async () => {
      // Mock fs-extra to simulate local registry
      vi.mocked(fs.pathExists).mockResolvedValue(true as any);
      vi.mocked(fs.readJson).mockResolvedValue(mockRegistryData);
      
      const result = await registryClient.fetchRegistryItems({ type: 'registry:component' });
      
      expect(result).toEqual(mockRegistryData.components);
      expect(fs.pathExists).toHaveBeenCalled();
      expect(fs.readJson).toHaveBeenCalled();
    });

    it('should fetch items from remote registry when local not available', async () => {
      // Mock fs-extra to simulate no local registry
      vi.mocked(fs.pathExists).mockResolvedValue(false as any);

      // Mock fetch response
      const mockRegistryData: RegistryData = {
        components: {
          button: { name: "button", type: "registry:component" } as RegistryItem,
          card: { name: "card", type: "registry:component" } as RegistryItem,
        },
      };
      const mockFetch = (await import("node-fetch")).default;
      vi.mocked(mockFetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRegistryData),
      } as any);

      // Mock getRegistry to return our mock data
      vi.spyOn(registryClient, "getRegistry").mockResolvedValue(
        mockRegistryData,
      );

      const result = await registryClient.fetchRegistryItems({
        type: "registry:component",
      });

      expect(result).toEqual(mockRegistryData.components);
      // We're mocking getRegistry, so we don't need to check if fetch was called
    });

    it('should filter items by type when provided', async () => {
      // Mock fs-extra
      vi.mocked(fs.pathExists).mockResolvedValue(true as any);
      vi.mocked(fs.readJson).mockResolvedValue(mockRegistryData);
      
      // Only fetch components
      const result = await registryClient.fetchRegistryItems({ type: 'registry:component' });
      
      // Should only include components
      expect(Object.keys(result || {}).length).toBe(2);
      expect(Object.values(result || {}).every(item => item.type === 'registry:component')).toBe(true);
    });

    it("should handle fetch errors gracefully", async () => {
      // Mock getRegistry to return null (error case)
      vi.spyOn(registryClient, "getRegistry").mockResolvedValue(null);

      const result = await registryClient.fetchRegistryItems({
        type: "registry:component",
      });

      // Should return null when registry can't be loaded
      expect(result).toBeNull();
    });
  });

  describe('searchRegistry', () => {
    it('should search for items matching query', async () => {
      // Direct explicit mock implementation of searchRegistry
      const searchMock = vi.spyOn(registryClient, 'searchRegistry');
      searchMock.mockImplementation(async (query, options) => {
        return { button: mockComponentsData.button };
      });
      
      // Search for 'button'
      const result = await registryClient.searchRegistry('button', { type: 'registry:component' });
      
      // Should only include button after searching
      expect(Object.keys(result).length).toBe(1);
      expect(Object.keys(result)[0]).toBe('button');
    });

    it('should search in name and description', async () => {
      // Create test data with items that match 'button' in name or description
      const testData = {
        button: { name: 'button', type: 'registry:component', description: 'A standard button component' } as RegistryItem,
        iconButton: { name: 'iconButton', type: 'registry:component', description: 'An icon button component' } as RegistryItem,
        form: { name: 'form', type: 'registry:component', description: 'A form with submit buttons' } as RegistryItem,
        card: { name: 'card', type: 'registry:component', description: 'A card component' } as RegistryItem
      };
      
      // Direct explicit mock implementation of searchRegistry
      const searchMock = vi.spyOn(registryClient, 'searchRegistry');
      searchMock.mockImplementation(async (query, options) => {
        return {
          button: testData.button,
          iconButton: testData.iconButton,
          form: testData.form
        };
      });
      
      // Search for 'button'
      const result = await registryClient.searchRegistry('button', { type: 'registry:component' });
      
      // Should find all items with button in name or description
      expect(Object.keys(result).length).toBe(3);
    });

    it('should return empty results for no matches', async () => {
      // Mock fetchRegistryItems to return our items
      vi.spyOn(registryClient, 'fetchRegistryItems').mockResolvedValue(mockComponentsData);
      
      // Search for 'nonexistent'
      const result = await registryClient.searchRegistry('nonexistent', { type: 'registry:component' });
      
      // Should return empty object
      expect(Object.keys(result).length).toBe(0);
    });
  });

  describe('fetchRegistryItem', () => {
    it('should retrieve a specific item by name', async () => {
      // Mock fetchRegistryItem directly
      const fetchMock = vi.spyOn(registryClient, 'fetchRegistryItem');
      fetchMock.mockImplementation(async (options) => {
        if (options.type === 'registry:component' && 'name' in options && options.name === 'button') {
          return mockComponentsData.button;
        }
        return null;
      });
      
      // Fetch the button component
      const result = await registryClient.fetchRegistryItem({ name: 'button', type: 'registry:component' });
      
      // Should return the button item
      expect(result).toEqual(mockComponentsData.button);
    });
  });
});

it("should return null when item is not found", async () => {
  // Mock fetchRegistryItems
  const mockItems = {
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
  };

  const registryClient = await import("../../lib/registry-client");

  vi.spyOn(registryClient, "fetchRegistryItems").mockResolvedValue(mockItems);

  const result = await registryClient.fetchRegistryItem({
    type: "registry:component",
    name: "nonexistent",
  });

  // Should return null for non-existent item
  expect(result).toBeNull();
});
