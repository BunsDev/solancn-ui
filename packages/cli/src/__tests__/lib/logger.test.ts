import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ora from 'ora';


// Set up mocks before importing any module that uses ora
vi.mock('ora', async () => {
  return {
    default: vi.fn().mockReturnValue({
      start: vi.fn().mockReturnThis(),
      stop: vi.fn().mockReturnThis(),
      succeed: vi.fn().mockReturnThis(),
      fail: vi.fn().mockReturnThis(),
      warn: vi.fn().mockReturnThis(),
      info: vi.fn().mockReturnThis(),
      text: vi.fn().mockReturnThis()
    })
  };
});

// Import after all mocks are set up
import stripAnsi from 'strip-ansi';
import { Logger } from '../../lib/logger';

describe('Logger', () => {
  let mockConsoleLog: any;
  let mockConsoleError: any;
  let mockConsoleWarn: any;
  let mockConsoleInfo: any;
  let logger: Logger;

  beforeEach(() => {
    // Mock console methods
    mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockConsoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {});
    
    // Create logger instance
    logger = new Logger();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should log messages with correct prefix', () => {
    logger.info('Test message');
    expect(mockConsoleInfo).toHaveBeenCalled();
    const call = mockConsoleInfo.mock.calls[0][0];
    expect(stripAnsi(call)).toContain('Test message');
  });

  it('should log success messages', () => {
    logger.success('Success message');
    expect(mockConsoleLog).toHaveBeenCalled();
    const call = mockConsoleLog.mock.calls[0][0];
    expect(stripAnsi(call)).toContain('Success message');
  });

  it('should log error messages', () => {
    logger.error('Error message');
    expect(mockConsoleError).toHaveBeenCalled();
    const call = mockConsoleError.mock.calls[0][0];
    expect(stripAnsi(call)).toContain('Error message');
  });

  it('should log warning messages', () => {
    logger.warn('Warning message');
    expect(mockConsoleWarn).toHaveBeenCalled();
    const call = mockConsoleWarn.mock.calls[0][0];
    expect(stripAnsi(call)).toContain('Warning message');
  });

  it('should log info messages', () => {
    logger.info('Info message');
    expect(mockConsoleInfo).toHaveBeenCalled();
    const call = mockConsoleInfo.mock.calls[0][0];
    expect(stripAnsi(call)).toContain('Info message');
  });

  it('should create spinner with prefix', () => {
    const spinner = logger.spinner('Test spinner');
    expect(ora).toHaveBeenCalled();
    expect(spinner).toBe(ora().start('Test spinner'));
  });

  it('should create boxed messages', () => {
    logger.boxedInfo('Test boxed info');
    expect(mockConsoleInfo).toHaveBeenCalledTimes(0);
    
    logger.boxedSuccess('Test boxed success');
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
    
    logger.boxedError('Test boxed error');
    expect(mockConsoleError).toHaveBeenCalledTimes(0);
    
    logger.boxedWarning('Test boxed warning');
    expect(mockConsoleWarn).toHaveBeenCalledTimes(0);
  });

  it('should log boxed info messages', () => {
    logger.boxedInfo('Boxed info message');
    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    // Since boxen outputs complex strings with borders, we'll just verify it was called
  });

  it('should log boxed success messages', () => {
    logger.boxedSuccess('Boxed success message');
    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
  });

  it('should log boxed warning messages', () => {
    logger.boxedWarning('Boxed warning message');
    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
  });

  it('should log boxed error messages', () => {
    logger.boxedError('Boxed error message');
    expect(mockConsoleLog).toHaveBeenCalledTimes(1);
  });
});
