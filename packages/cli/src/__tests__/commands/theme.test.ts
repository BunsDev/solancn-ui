import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import mockFs from 'memfs';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { themeSyncCommand, themeExportCommand, themeApplyCommand, themeCustomizeCommand } from '../../commands/theme';

// Mock dependencies
vi.mock('fs-extra');
vi.mock('inquirer');
vi.mock('chalk', () => ({
  default: {
    bold: { blue: (text: string) => text },
    green: (text: string) => text,
    red: (text: string) => text,
    dim: (text: string) => text,
    gray: (text: string) => text,
    yellow: (text: string) => text,
  },
}));
vi.mock('boxen', () => (text: string) => text);
vi.mock('../../lib/logger', () => ({
  logger: {
    spinner: vi.fn().mockReturnValue({
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn(),
      fail: vi.fn(),
      info: vi.fn(),
    }),
    boxedSuccess: vi.fn(),
    boxedError: vi.fn(),
    boxedInfo: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
  }
}));

describe('theme commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the file system
    mockFs({
      '/project': {
        'src': {
          'styles': {
            'tokens.css': '/* CSS tokens file */',
            'globals.css': '/* Global styles */'
          }
        },
        'tailwind.config.js': 'module.exports = { theme: {} };',
      }
    });
  });
  
  afterEach(() => {
    mockFs.restore();
  });

  describe('theme:sync command', () => {
    it('should sync theme files from registry to project', async () => {
      // Mock fs operations
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      vi.mocked(fs.readFile).mockResolvedValue('/* Theme content */');
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);
      
      const options = {
        registryUrl: 'https://ui.solancn.com',
        theme: 'default',
        output: '/project/src/styles',
      };
      
      await themeSyncCommand(options);
      
      // Verify files were written
      expect(fs.writeFile).toHaveBeenCalled();
      const { logger } = await import('../../lib/logger');
      expect(logger.boxedSuccess).toHaveBeenCalled();
    });
    
    it('should handle errors when registry is not available', async () => {
      // Mock fetch to fail
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      vi.mocked(fs.readFile).mockRejectedValue(new Error('Registry not available'));
      
      const options = {
        registryUrl: 'https://ui.solancn.com',
        theme: 'default',
        output: '/project/src/styles',
      };
      
      await themeSyncCommand(options);
      
      // Verify error was shown
      const { logger } = await import('../../lib/logger');
      expect(logger.boxedError).toHaveBeenCalled();
    });
  });

  describe('theme:export command', () => {
    it('should export theme to specified format', async () => {
      // Mock fs operations
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      vi.mocked(fs.readFile).mockResolvedValue('/* CSS content */');
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);
      
      const options = {
        input: '/project/src/styles/tokens.css',
        output: '/project/theme-export.json',
        format: 'json',
      };
      
      await themeExportCommand(options);
      
      // Verify file was written
      expect(fs.writeFile).toHaveBeenCalled();
      const { logger } = await import('../../lib/logger');
      expect(logger.success).toHaveBeenCalled();
    });
    
    it('should handle errors when input file does not exist', async () => {
      // Mock fs operations
      vi.mocked(fs.pathExists).mockResolvedValue(false);
      
      const options = {
        input: '/project/src/styles/tokens.css',
        output: '/project/theme-export.json',
        format: 'json',
      };
      
      await themeExportCommand(options);
      
      // Verify error was shown
      const { logger } = await import('../../lib/logger');
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('theme:apply command', () => {
    it('should apply theme from specified source', async () => {
      // Mock fs operations
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      vi.mocked(fs.readFile).mockResolvedValue('/* Theme content */');
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);
      
      const options = {
        source: '/project/theme-export.json',
        output: '/project/src/styles',
      };
      
      await themeApplyCommand(options);
      
      // Verify files were written
      expect(fs.writeFile).toHaveBeenCalled();
      const { logger } = await import('../../lib/logger');
      expect(logger.boxedSuccess).toHaveBeenCalled();
    });
    
    it('should handle errors when source file does not exist', async () => {
      // Mock fs operations
      vi.mocked(fs.pathExists).mockResolvedValue(false);
      
      const options = {
        source: '/project/theme-export.json',
        output: '/project/src/styles',
      };
      
      await themeApplyCommand(options);
      
      // Verify error was shown
      const { logger } = await import('../../lib/logger');
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('theme:customize command', () => {
    it('should run the interactive theme customization process', async () => {
      // Mock inquirer responses
      vi.mocked(inquirer.prompt).mockResolvedValue({
        primaryLight: 'oklch(0.6 0.15 140)',
        primaryDark: 'oklch(0.6 0.15 140)',
        radiusSize: '0.5rem',
      });
      
      // Mock fs operations
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      vi.mocked(fs.writeFile).mockResolvedValue(undefined);
      
      const options = {
        output: '/project/src/styles',
      };
      
      await themeCustomizeCommand(options);
      
      // Verify inquirer was called
      expect(inquirer.prompt).toHaveBeenCalled();
      
      // Verify files were written
      expect(fs.writeFile).toHaveBeenCalled();
      const { logger } = await import('../../lib/logger');
      expect(logger.boxedSuccess).toHaveBeenCalled();
    });
    
    it('should handle errors during customization', async () => {
      // Mock inquirer to throw an error
      vi.mocked(inquirer.prompt).mockRejectedValue(new Error('User cancelled'));
      
      const options = {
        output: '/project/src/styles',
      };
      
      await themeCustomizeCommand(options);
      
      // Verify error was shown
      const { logger } = await import('../../lib/logger');
      expect(logger.error).toHaveBeenCalled();
    });
  });
});
