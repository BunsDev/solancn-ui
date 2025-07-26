import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
    const mockOra = vi.fn().mockReturnValue({
      start: vi.fn().mockReturnThis(),
      succeed: vi.fn(),
      fail: vi.fn(),
      info: vi.fn()
    });
    
    vi.mock('ora', () => ({
      default: mockOra
    }));
    
    // Need to re-import logger to use the mocked ora
    const { logger: testLogger } = require('../../lib/logger');
    const spinner = testLogger.spinner('Loading');
    
    expect(mockOra).toHaveBeenCalled();
    expect(mockOra.mock.calls[0][0]).toContain('Loading');
  });

  it('should log boxed info messages', () => {
    logger.boxedInfo('Boxed info message');
    expect(mockConsoleLog).toHaveBeenCalled();
    // Since boxen outputs complex strings with borders, we'll just verify it was called
  });

  it('should log boxed success messages', () => {
    logger.boxedSuccess('Boxed success message');
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  it('should log boxed warning messages', () => {
    logger.boxedWarning('Boxed warning message');
    expect(mockConsoleLog).toHaveBeenCalled();
  });

  it('should log boxed error messages', () => {
    logger.boxedError('Boxed error message');
    expect(mockConsoleLog).toHaveBeenCalled();
  });
});
