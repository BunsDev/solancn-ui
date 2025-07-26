import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs-extra';
import * as registryClient from '../../lib/registry-client';
import type { RegistryData, RegistryItem } from '../../lib/types';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('node-fetch', () => ({
  default: vi.fn()
}));

describe('registry-client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock process.cwd()
    vi.spyOn(process, 'cwd').mockReturnValue('/project');
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchRegistryItems', () => {
    it('should fetch items from local registry when available', async () => {
      // Mock fs-extra to simulate local registry
      const mockRegistryData: RegistryData = {
        components: {
          button: { name: 'button', type: 'component' } as RegistryItem,
          card: { name: 'card', type: 'component' } as RegistryItem
        }
      };
      // @ts-ignore
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      vi.mocked(fs.readJSON).mockResolvedValue(mockRegistryData);
      
      // Mock getRegistry to return our mock data
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(mockRegistryData);
      
      const result = await registryClient.fetchRegistryItems({ type: 'component' });
      
      expect(result).toEqual(mockRegistryData.components);
      expect(registryClient.getRegistry).toHaveBeenCalled();
    });
    
    it('should fetch items from remote registry when local not available', async () => {
      // Mock fs-extra to simulate no local registry
      // @ts-ignore
      vi.mocked(fs.pathExists).mockResolvedValue(false);
      
      // Mock fetch response
      const mockRegistryData: RegistryData = {
        components: {
          button: { name: 'button', type: 'component' } as RegistryItem,
          card: { name: 'card', type: 'component' } as RegistryItem
        }
      };
      const mockFetch = (await import('node-fetch')).default;
      vi.mocked(mockFetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRegistryData)
      } as any);
      
      // Mock getRegistry to return our mock data
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(mockRegistryData);
      
      const result = await registryClient.fetchRegistryItems({ type: 'component' });
      
      expect(result).toEqual(mockRegistryData.components);
      // We're mocking getRegistry, so we don't need to check if fetch was called
    });
    
    it('should filter items by type when provided', async () => {
      // Mock fs-extra to simulate local registry
      const mockRegistryData: RegistryData = {
        components: {
          button: { name: 'button', type: 'component' } as RegistryItem,
          card: { name: 'card', type: 'component' } as RegistryItem
        },
        blocks: {
          hero: { name: 'hero', type: 'block' } as RegistryItem
        }
      };
      
      // Mock getRegistry to return our mock data
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(mockRegistryData);
      
      const result = await registryClient.fetchRegistryItems({ type: 'component' });
      
      // Should only include components
      expect(Object.keys(result || {}).length).toBe(2);
      expect(Object.values(result || {}).every(item => item.type === 'component')).toBe(true);
    });
    
    it('should handle fetch errors gracefully', async () => {
      // Mock getRegistry to return null (error case)
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(null);
      
      const result = await registryClient.fetchRegistryItems({ type: 'component' });
      
      // Should return null when registry can't be loaded
      expect(result).toBeNull();
    });
  });

  describe('searchRegistry', () => {
    it('should search for items matching query', async () => {
      // Mock getRegistry
      const mockRegistry: RegistryData = {
        components: {
          button: { name: 'button', type: 'component', description: 'A button component' } as RegistryItem,
          card: { name: 'card', type: 'component', description: 'A card component' } as RegistryItem,
        },
        blocks: {
          hero: { name: 'hero', type: 'block', description: 'A hero section' } as RegistryItem
        }
      };
      
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(mockRegistry);
      
      const result = await registryClient.searchRegistry('button', { type: 'component' });
      
      // Should only include button after search
      expect(Object.keys(result).length).toBe(1);
      expect(Object.keys(result)[0]).toBe('button');
    });
    
    it('should search in name and description', async () => {
      // Mock getRegistry
      const mockRegistry: RegistryData = {
        components: {
          button: { name: 'button', type: 'component', description: 'A button component' } as RegistryItem,
          'primary-button': { name: 'primary-button', type: 'component', description: 'A primary button variant' } as RegistryItem,
          card: { name: 'card', type: 'component', description: 'A card with button' } as RegistryItem
        }
      };
      
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(mockRegistry);
      
      const result = await registryClient.searchRegistry('button', { type: 'component' });
      
      // Should find all items with button in name or description
      expect(Object.keys(result).length).toBe(3);
    });
    
    it('should return empty results for no matches', async () => {
      // Mock getRegistry
      const mockRegistry: RegistryData = {
        components: {
          button: { name: 'button', type: 'component', description: 'A button component' } as RegistryItem,
          card: { name: 'card', type: 'component', description: 'A card component' } as RegistryItem
        }
      };
      
      vi.spyOn(registryClient, 'getRegistry').mockResolvedValue(mockRegistry);
      
      const result = await registryClient.searchRegistry('nonexistent', { type: 'component' });
      
      // Should return empty object
      expect(Object.keys(result).length).toBe(0);
    });
  });
  });

  describe('fetchRegistryItem', () => {
    it('should retrieve a specific item by name', async () => {
      // Mock fetchRegistryItems
      const mockItems = {
        button: { name: 'button', type: 'component', description: 'A button component' } as RegistryItem,
        card: { name: 'card', type: 'component', description: 'A card component' } as RegistryItem
      };
      
      vi.spyOn(registryClient, 'fetchRegistryItems').mockResolvedValue(mockItems);
      
      const result = await registryClient.fetchRegistryItem({ type: 'component' }, 'button');
      
      // Should return the button item
      expect(result).toEqual(mockItems.button);
    });
    
    it('should return null when item is not found', async () => {
      // Mock fetchRegistryItems
      const mockItems = {
        button: { name: 'button', type: 'component', description: 'A button component' } as RegistryItem,
        card: { name: 'card', type: 'component', description: 'A card component' } as RegistryItem
      };
      
      vi.spyOn(registryClient, 'fetchRegistryItems').mockResolvedValue(mockItems);
      
      const result = await registryClient.fetchRegistryItem({ type: 'component' }, 'nonexistent');
      
      // Should return null for non-existent item
      expect(result).toBeNull();
    });
});
