import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import memfs from 'memfs';
import { init } from '../../commands/init';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
// import path from 'path';

vi.mock('fs-extra');
vi.mock('inquirer');
vi.mock('chalk', () => ({
  default: {
    bold: { blue: (text: string) => text },
    green: (text: string) => text,
    red: (text: string) => text,
    dim: (text: string) => text,
  },
}));
vi.mock('boxen', () => ({
  default: (text: string, options?: any) => `[Boxed: ${text}]`
}));
vi.mock('../../lib/logger', () => ({
  logger: {
    spinner: vi.fn().mockReturnValue({
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn(),
      fail: vi.fn(),
    }),
    boxedSuccess: vi.fn(),
    boxedError: vi.fn(),
    error: vi.fn(),
  }
}));

describe('init command', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the file system
    memfs.memfs({
      '/test-project': {},
      '/templates': {
        'next-app': {
          'package.json': '{"name":"test-template","version":"1.0.0"}',
          'src': {
            'index.ts': 'console.log("Hello World")'
          }
        }
      }
    });
    
    // Mock inquirer prompt responses
    vi.mocked(inquirer.prompt).mockResolvedValue({
      projectName: 'test-project',
      template: 'next-app'
    });
  });
  
  afterEach(() => {
    memfs.memfs();
  });
  
  it('should create a new project with the selected template', async () => {
    const mockPathExists = vi.fn()
      // First call to pathExists should be for registry.json (return true)
      .mockResolvedValueOnce(true)
      // Second call to pathExists should be for project dir (return false)
      .mockResolvedValueOnce(false);
    
    vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
    
    // Mock fs.copy
    vi.mocked(fs.copy).mockResolvedValue(undefined);
    
    // Run the init command
    await init();
    
    // Verify inquirer was called
    expect(inquirer.prompt).toHaveBeenCalled();
    
    // Verify directory creation was checked
    expect(mockPathExists).toHaveBeenCalledTimes(1);
    expect(mockPathExists.mock.calls[0][0]).toContain('test-project');
    
    // Verify mkdir was called
    expect(fs.mkdir).toHaveBeenCalledWith('test-project');
  });
  
  it('should show error if project directory exists', async () => {
    const mockPathExists = vi.fn()
      // First call to pathExists should be for registry.json (return true)
      .mockResolvedValueOnce(true)
      // Second call to pathExists should be for project dir (return true)
      .mockResolvedValueOnce(true);
    
    vi.mocked(fs.pathExists).mockImplementation(mockPathExists);
    
    // Run the init command
    await init();
    
    // Check that error was shown
    const { logger } = await import('../../lib/logger');
    expect(logger.boxedError).toHaveBeenCalledTimes(1);
    
    // Verify copy was not called
    expect(fs.copy).not.toHaveBeenCalled();
  });

  it('should handle template copy errors', async () => {
    // Mock fs.pathExists to return false (project dir doesn't exist)
    // @ts-ignore
    vi.mocked(fs.pathExists)?.mockResolvedValue(false);
    
    // Mock fs.copy to throw an error
    vi.mocked(fs.copy).mockRejectedValue(new Error('Copy failed'));
    
    // Run the init command
    await init();
    
    // Check that error was shown
    const { logger } = await import('../../lib/logger');
    expect(logger.boxedError).toHaveBeenCalledTimes(1);
  });
});
