import { describe, it, expect, vi } from "vitest";
import { logger, ASCII_TEXT, message, ColorFullText } from "../utils/logger";

// Mock console methods to avoid actual logging during tests
vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});

describe("Logger utility", () => {
  it("should export logger object with expected methods", () => {
    expect(logger).toBeDefined();
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.success).toBe("function");
    expect(typeof logger.break).toBe("function");
  });

  it("should call console.log with arguments when logger methods are called", () => {
    const consoleLogSpy = vi.spyOn(console, "log");

    logger.info("Test info message");
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);

    logger.warn("Test warning message");
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);

    logger.success("Test success message");
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);

    logger.break();
    expect(consoleLogSpy).toHaveBeenCalledTimes(4);

    consoleLogSpy.mockRestore();
  });

  it("should call console.log when logger.error is called", () => {
    const consoleLogSpy = vi.spyOn(console, "log");

    logger.error("Test error message");
    expect(consoleLogSpy).toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });

  it("should export ASCII_TEXT with Solancn banner", () => {
    expect(ASCII_TEXT).toBeDefined();
    expect(typeof ASCII_TEXT).toBe("string");
    expect(ASCII_TEXT).toContain("███████╗ ██████╗ ██╗      █████╗ ███╗   ██╗");
  });

  it("should export message with Solancn information", () => {
    expect(message).toBeDefined();
    expect(typeof message).toBe("string");
    expect(message).toContain("Solancn - Component library");
  });

  it("should have ColorFullText function that returns a string", () => {
    expect(ColorFullText).toBeDefined();
    expect(typeof ColorFullText).toBe("function");

    const result = ColorFullText("Test");
    expect(typeof result).toBe("string");
  });
});
