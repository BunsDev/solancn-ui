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
vi.mock('boxen', () => (text: string) => text);
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

    // Mock fs.pathExists to return false (project dir doesn't exist)
    // @ts-ignore
    vi.mocked(fs.pathExists)?.mockResolvedValue(false);
    
    // Mock fs.copy
    vi.mocked(fs.copy).mockResolvedValue(undefined);
    
    // Run the init command
    await init();
    
    // Verify inquirer was called
    expect(inquirer.prompt).toHaveBeenCalled();
    
    // Verify directory creation was checked
    expect(fs.pathExists).toHaveBeenCalledWith(expect.stringContaining('test-project'));
    
    // Verify template copy was attempted
    expect(fs.copy).toHaveBeenCalled();
  });
  
  it('should show error if project directory exists', async () => {
    // Mock fs.pathExists to return true (project dir exists)
    // @ts-ignore
    vi.mocked(fs.pathExists)?.mockResolvedValue(true);
    
    // Run the init command
    await init();
    
    // Check that error was shown
    const { logger } = await import('../../lib/logger');
    expect(logger.boxedError).toHaveBeenCalled();
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
    expect(logger.boxedError).toHaveBeenCalled();
  });
});
