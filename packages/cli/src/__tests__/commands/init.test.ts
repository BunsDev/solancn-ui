import { beforeEach, describe, expect, it, vi } from 'vitest';
import { init } from '../../commands/init';
import * as fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import { fetchRegistryItem } from '../../lib/registry-client';
import type { RegistryItem } from '../../lib/types';

// These vi.mock calls get hoisted to the top during execution
vi.mock('fs-extra', () => ({
  pathExists: vi.fn().mockResolvedValue(false),
  mkdir: vi.fn().mockResolvedValue(undefined),
  copy: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
  ensureDir: vi.fn().mockResolvedValue(undefined)
}));
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
// Mock spinner for ora
const mockSpinner = {
  start: vi.fn().mockReturnThis(),
  stop: vi.fn().mockReturnThis(),
  succeed: vi.fn().mockReturnThis(),
  fail: vi.fn().mockReturnThis(),
  warn: vi.fn().mockReturnThis(),
  info: vi.fn().mockReturnThis(),
  text: vi.fn().mockReturnThis(),
};

// Mock ora - the spinner methods are used by logger
vi.mock('ora', () => ({
  default: vi.fn(() => mockSpinner)
}));

// Mock registry client
vi.mock('../../lib/registry-client', () => ({
  fetchRegistryItem: vi.fn()
}));

// Mock inquirer
vi.mock('inquirer', () => ({
  prompt: vi.fn().mockResolvedValue({
    projectName: 'test-project',
    template: 'blank'
  })
}));

// Mock logger with the spinner
vi.mock('../../lib/logger', () => ({
  logger: {
    spinner: vi.fn(() => mockSpinner),
    boxedSuccess: vi.fn(),
    boxedError: vi.fn(),
    error: vi.fn(),
  }
}));

// Mock chalk
vi.mock('chalk', () => {
  // Create a text formatter function that returns itself to allow chaining
  const formatter = (text: string) => text;
  
  // Make formatter.bold also a function that returns the same type of chainable function
  formatter.bold = formatter;
  formatter.blue = formatter;
  formatter.green = formatter;
  formatter.red = formatter;
  formatter.dim = formatter;
  formatter.cyan = formatter;
  
  // Make each chained function also have all the same methods
  formatter.bold.blue = formatter;
  formatter.bold.green = formatter;
  formatter.bold.red = formatter;
  formatter.bold.dim = formatter;
  formatter.bold.cyan = formatter;
  
  return { default: formatter };
});

// Mock boxen
vi.mock('boxen', () => ({
  default: (text: string) => `[Boxed: ${text}]`
}));

describe('init command', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Setup default mock responses for the happy path
    vi.mocked(fetchRegistryItem).mockResolvedValue({
      name: 'blank',
      type: 'registry:theme',
      description: 'A blank template',
      files: {
        'package.json': '{"name":"test-template","version":"1.0.0"}'
      }
    } as unknown as RegistryItem);
  });

  it('should create a new project with the selected template', async () => {
    // Run the init command
    await init();
    
    // Verify spinner was used
    expect(ora).toHaveBeenCalledWith('Creating project...');
    expect(mockSpinner.start).toHaveBeenCalled();
    
    // Verify inquirer was called
    expect(inquirer.prompt).toHaveBeenCalled();
    
    // Verify mkdir was called with the project name from prompts
    expect(fs.mkdir).toHaveBeenCalledWith('test-project');
    
    // Verify fetchRegistryItem was called with template name
    expect(fetchRegistryItem).toHaveBeenCalledWith('blank');
    
    // Verify spinner success was shown
    expect(mockSpinner.succeed).toHaveBeenCalledWith('Project created successfully!');
  });

  it('should show error if project directory exists', async () => {
    // Setup mkdir to throw an error as if directory already exists
    vi.mocked(fs.mkdir).mockRejectedValueOnce(new Error('Directory already exists'));
    
    // Run the init command
    await init();
    
    // Verify spinner fail was called
    expect(mockSpinner.fail).toHaveBeenCalledWith('Failed to create project');
    
    // Verify mkdir was called but failed
    expect(fs.mkdir).toHaveBeenCalledWith('test-project');
    
    // Verify error was shown
    const { logger } = await import('../../lib/logger');
    expect(logger.boxedError).toHaveBeenCalledTimes(1);
  });

  it('should handle template copy errors', async () => {
    // Reset mkdir to succeed but fetchRegistryItem to fail
    vi.mocked(fs.mkdir).mockResolvedValueOnce(undefined);
    vi.mocked(fetchRegistryItem).mockRejectedValueOnce(new Error('Registry error'));
    
    // Run the init command
    await init();
    
    // Verify spinner fail was called
    expect(mockSpinner.fail).toHaveBeenCalledWith('Failed to create project');
    
    // Verify mkdir was called
    expect(fs.mkdir).toHaveBeenCalledWith('test-project');
    
    // Check that error was shown
    const { logger } = await import('../../lib/logger');
    expect(logger.boxedError).toHaveBeenCalledTimes(1);
  });
});
