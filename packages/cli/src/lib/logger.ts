import util from "node:util";
import boxen, { type Options as BoxenOptions } from "boxen";
// Logger for CLI
import chalk from "chalk";
import ora, { type Ora, type Options as OraOptions } from "ora";

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  SILENT = 4,
}

/**
 * Logger options
 */
export interface LoggerOptions {
  level: LogLevel;
  prefix?: string;
  timestamp?: boolean;
}

/**
 * Default logger options
 */
const defaultOptions: LoggerOptions = {
  level: LogLevel.INFO,
  prefix: "solancn",
  timestamp: false,
};

/**
 * CLI Logger class
 */
class Logger {
  private options: LoggerOptions;

  constructor(options: Partial<LoggerOptions> = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Set log level
   */
  setLevel(level: LogLevel): void {
    this.options.level = level;
  }

  /**
   * Format log message
   */
  private format(message: string | Error | unknown): string {
    if (message instanceof Error) {
      return message.stack || message.message;
    }

    if (typeof message === "object") {
      return util.inspect(message, { depth: 5, colors: true });
    }

    return String(message);
  }

  /**
   * Create log prefix
   */
  private getPrefix(): string {
    let result = "";

    if (this.options.timestamp) {
      result += chalk.dim(`[${new Date().toISOString()}] `);
    }

    if (this.options.prefix) {
      result += chalk.cyan(`[${this.options.prefix}] `);
    }

    return result;
  }

  /**
   * Log debug message
   */
  debug(message: string | Error | unknown, ...args: unknown[]): void {
    if (this.options.level <= LogLevel.DEBUG) {
      const formatted = this.format(message);
      const prefix = this.getPrefix();
      console.debug(`${prefix}${chalk.dim(formatted)}`, ...args);
    }
  }

  /**
   * Log info message
   */
  info(message: string | Error | unknown, ...args: unknown[]): void {
    if (this.options.level <= LogLevel.INFO) {
      const formatted = this.format(message);
      const prefix = this.getPrefix();
      console.info(`${prefix}${formatted}`, ...args);
    }
  }

  /**
   * Log warning message
   */
  warn(message: string | Error | unknown, ...args: unknown[]): void {
    if (this.options.level <= LogLevel.WARN) {
      const formatted = this.format(message);
      const prefix = this.getPrefix();
      console.warn(`${prefix}${chalk.yellow(formatted)}`, ...args);
    }
  }

  /**
   * Log error message
   */
  error(message: string | Error | unknown, ...args: unknown[]): void {
    if (this.options.level <= LogLevel.ERROR) {
      const formatted = this.format(message);
      const prefix = this.getPrefix();

      // If it's an Error object, we want to output the stack trace
      if (message instanceof Error && message.stack) {
        console.error(`${prefix}${chalk.red(message.message)}`);
        console.error(chalk.dim(message.stack));
      } else {
        console.error(`${prefix}${chalk.red(formatted)}`, ...args);
      }
    }
  }

  /**
   * Log success message
   */
  success(message: string | unknown, ...args: unknown[]): void {
    if (this.options.level <= LogLevel.INFO) {
      const formatted = this.format(message);
      const prefix = this.getPrefix();
      console.log(`${prefix}${chalk.green(formatted)}`, ...args);
    }
  }

  /**
   * Create a child logger with a different prefix
   */
  child(prefix: string): Logger {
    return new Logger({
      ...this.options,
      prefix: this.options.prefix ? `${this.options.prefix}:${prefix}` : prefix,
    });
  }

  /**
   * Create an ora spinner with logger styling
   * @param text The text to display alongside the spinner
   * @param options Additional ora options
   * @returns An ora spinner instance with methods like start(), stop(), succeed(), etc.
   */
  spinner(text: string, options?: OraOptions): Ora {
    // Format the text with the logger prefix
    const prefix = this.getPrefix();
    const spinner = ora({
      text: `${prefix}${text}`,
      color: "cyan",
      spinner: "dots",
      ...options,
    });

    // Add custom methods to the spinner that maintain our logger's style
    const originalSucceed = spinner?.succeed?.bind(spinner);
    spinner.succeed = (text?: string) => {
      return originalSucceed(
        text ? `${prefix}${chalk.green(text)}` : undefined,
      );
    };

    const originalFail = spinner.fail.bind(spinner);
    spinner.fail = (text?: string) => {
      return originalFail(text ? `${prefix}${chalk.red(text)}` : undefined);
    };

    const originalWarn = spinner.warn.bind(spinner);
    spinner.warn = (text?: string) => {
      return originalWarn(text ? `${prefix}${chalk.yellow(text)}` : undefined);
    };

    const originalInfo = spinner.info.bind(spinner);
    spinner.info = (text?: string) => {
      return originalInfo(text ? `${prefix}${text}` : undefined);
    };

    return spinner;
  }

  /**
   * Log boxed info message
   */
  boxedInfo(message: string, options?: BoxenOptions) {
    const defaultOptions: BoxenOptions = {
      padding: 1,
      margin: 0.5,
      borderColor: "blue",
      borderStyle: "round" as const,
      title: "ℹ️ INFO",
      titleAlignment: "center" as const,
    };

    console.log(boxen(message, { ...defaultOptions, ...options }));
  }

  /**
   * Log boxed success message
   */
  boxedSuccess(message: string, options?: BoxenOptions) {
    const defaultOptions: BoxenOptions = {
      padding: 1,
      margin: 0.5,
      borderColor: "green",
      borderStyle: "round" as const,
      title: "✅ SUCCESS",
      titleAlignment: "center" as const,
    };

    console.log(boxen(chalk.green(message), { ...defaultOptions, ...options }));
  }

  /**
   * Log boxed warning message
   */
  boxedWarning(message: string, options?: BoxenOptions) {
    const defaultOptions: BoxenOptions = {
      padding: 1,
      margin: 0.5,
      borderColor: "yellow",
      borderStyle: "round" as const,
      title: "⚠️ WARNING",
      titleAlignment: "center" as const,
    };

    console.log(
      boxen(chalk.yellow(message), { ...defaultOptions, ...options }),
    );
  }

  /**
   * Log boxed error message
   */
  boxedError(message: string, options?: BoxenOptions) {
    const defaultOptions: BoxenOptions = {
      padding: 1,
      margin: 0.5,
      borderColor: "red",
      borderStyle: "round" as const,
      title: "❌ ERROR",
      titleAlignment: "center" as const,
    };

    console.log(boxen(chalk.red(message), { ...defaultOptions, ...options }));
  }
}

/**
 * Default logger instance
 */
export const logger = new Logger();

/**
 * Create a logger with custom options
 */
export function createLogger(options: Partial<LoggerOptions> = {}): Logger {
  return new Logger(options);
}

/**
 * Export Logger class
 */
export { Logger };
