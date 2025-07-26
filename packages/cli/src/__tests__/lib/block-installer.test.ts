import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import fs from 'fs-extra';
import * as registryClient from '../../lib/registry-client';
import * as componentInstaller from '../../lib/component-installer';
import type { RegistryItem, InstallOptions } from '../../lib/types';
import * as blockInstaller from '../../lib/block-installer';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('../../lib/registry-client');
vi.mock('../../lib/component-installer');

// Create a mock spinner object
const mockSpinner = {
  start: vi.fn().mockReturnThis(),
  stop: vi.fn().mockReturnThis(),
  succeed: vi.fn().mockReturnThis(),
  fail: vi.fn().mockReturnThis(),
  text: vi.fn().mockReturnThis()
};

// Mock logger
vi.mock('../../lib/logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    spinner: vi.fn().mockReturnValue(mockSpinner)
  }
}));

// Import logger after mocking
import { logger } from '../../lib/logger';

describe('block-installer', () => {
  let mockSpinnerReference: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSpinnerReference = logger.spinner("Installing block");
    
    // Mock process.cwd()
    vi.spyOn(process, 'cwd').mockReturnValue('/project');
    
    // Setup default successful mocks for component installer
    vi.mocked(componentInstaller.installComponent).mockResolvedValue({
      success: true,
      componentName: 'test-component',
      message: 'Component installed successfully',
      files: ['test.tsx']
    });
  });
  
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('uninstallBlock', () => {
    beforeEach(() => {
      // Clear all mock calls before each test
      vi.clearAllMocks();
      
      // Reset registry mock to return a valid item by default
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValue({
        name: 'hero',
        type: 'block' as const,
        files: {
          'hero.tsx': 'export default function Hero() { return <div>Hero</div> }',
        }
      });
    });
    
    it('should uninstall block successfully', async () => {
      // Call the uninstallBlock function
      const result = await blockInstaller.uninstallBlock('hero', '/project/blocks');
      
      // Verify logger.spinner was called with the correct message
      expect(logger.spinner).toHaveBeenCalledWith('Uninstalling block: hero');
      
      // Verify registry client was called to fetch the block
      expect(registryClient.fetchRegistryItem).toHaveBeenCalledWith({ type: 'block' }, 'hero');
      
      // Verify uninstallComponent was called
      expect(componentInstaller.uninstallComponent).toHaveBeenCalled();
      
      // Verify spinner.succeed was called
      expect(mockSpinnerReference.succeed).toHaveBeenCalled();
      
      // Verify successful result
      expect(result.success).toBe(true);
    });
    
    it('should handle block not found in registry', async () => {
      // Mock registry to return null (block not found)
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(null);
      
      // Call the uninstallBlock function
      const result = await blockInstaller.uninstallBlock('non-existent', '/project/blocks');
      
      // Verify spinner.fail was called
      expect(mockSpinner.fail).toHaveBeenCalled();
      
      // Verify unsuccessful result
      expect(result.success).toBe(false);
      expect(result.message).toContain("not found in registry");
    });
    
    it('should handle uninstall errors', async () => {
      // Mock uninstallComponent to throw an error
      vi.mocked(componentInstaller.uninstallComponent).mockRejectedValueOnce(new Error('Uninstall failed'));
      
      // Call the uninstallBlock function and expect it to throw
      await expect(blockInstaller.uninstallBlock('hero', '/project/blocks'))
        .rejects.toThrow('Uninstall failed');
      
      // Verify spinner.fail was called
      expect(mockSpinner.fail).toHaveBeenCalled();
    });
  });
  
  describe('installBlock', () => {
    beforeEach(() => {
      // Clear all mock calls before each test
      vi.clearAllMocks();
      
      // Reset registry mock to return a valid item by default
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValue({
        name: 'hero',
        type: 'block' as const,
        dependencies: ['react@^18.0.0', '@/components/button'],
        files: {
          'hero.tsx': 'export default function Hero() { return <div>Hero</div> }',
          'hero.stories.tsx': 'export default { title: "Hero" }'
        }
      });
    });
    
    it('should install block successfully', async () => {
      // Call the installBlock function
      const result = await blockInstaller.installBlock('hero', '/project/blocks');
      
      // Verify logger.spinner was called with the correct message
      expect(logger.spinner).toHaveBeenCalledWith('Installing block: hero');
      
      // Verify registry client was called to fetch the block
      expect(registryClient.fetchRegistryItem).toHaveBeenCalledWith({ type: 'block' }, 'hero');
      
      // Verify component installer was called correctly
      expect(componentInstaller.installComponent).toHaveBeenCalledWith('hero', expect.anything(), expect.anything());
      
      // Verify dependencies were installed
      expect(componentInstaller.installDependencies).toHaveBeenCalled();
      
      // Verify spinner.succeed was called
      expect(mockSpinner.succeed).toHaveBeenCalledWith('Installed block: hero');
      
      // Verify successful result
      expect(result.success).toBe(true);
    });
    
    it('should handle block not found in registry', async () => {
      // Mock registry to return null (block not found)
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce(null);
      
      // Call the installBlock function with non-existent block
      const result = await blockInstaller.installBlock('non-existent', '/project/blocks');
      
      // Verify spinner.fail was called with the correct message
      expect(mockSpinner.fail).toHaveBeenCalledWith("Block 'non-existent' not found in registry");
      
      // Verify component installer was not called
      expect(componentInstaller.installComponent).not.toHaveBeenCalled();
      expect(componentInstaller.installDependencies).not.toHaveBeenCalled();
      
      // Verify unsuccessful result
      expect(result.success).toBe(false);
      expect(result.message).toContain("not found in registry");
    });
    
    it('should handle installation errors', async () => {
      // Mock component-installer to throw an error
      vi.mocked(componentInstaller.installComponent).mockRejectedValueOnce(new Error('Installation failed'));
      
      // Call the installBlock function
      try {
        await blockInstaller.installBlock('hero', '/project/blocks');
      } catch (error: any) {
        // Verify error was properly propagated
        expect(error).toBeDefined();
        expect(error.message).toBe('Installation failed');
      }
      
      // Verify spinner.fail was called
      expect(mockSpinner.fail).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalled();
    });
    
    it('should skip dependencies if option is disabled', async () => {
      // Mock registry to return block with dependencies
      vi.mocked(registryClient.fetchRegistryItem).mockResolvedValueOnce({
        name: 'hero',
        type: 'block' as const,
        dependencies: ['react@^18.0.0'],
        files: { 'hero.tsx': 'export default () => <div>Hero</div>' }
      });
      
      // Call installBlock with dependencies disabled
      await blockInstaller.installBlock('hero', '/project/blocks', { dependencies: false });
      
      // Verify installComponent was called
      expect(componentInstaller.installComponent).toHaveBeenCalled();
      
      // Verify installDependencies was NOT called
      expect(componentInstaller.installDependencies).not.toHaveBeenCalled();
    });
    
    it('should create backup if force option is enabled', async () => {
      // Call installBlock with force option
      await blockInstaller.installBlock('hero', '/project/blocks', { force: true });
      
      // Verify backupFiles was called
      expect(componentInstaller.backupFiles).toHaveBeenCalled();
    });
  });
});
