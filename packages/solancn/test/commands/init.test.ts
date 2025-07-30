import fs from "fs"
import path from "path"
import { execa } from "execa"
import { afterEach, beforeEach, expect, test, vi } from "vitest"
import type { Options } from "ora"

import { runInit } from "../../src/commands/init"
import { getConfig } from "../../src/utils/get-config"
import * as getPackageManger from "../../src/utils/get-package-manager"

// Import our registry mock
vi.mock("../../src/registry", () => {
  return import("../mocks/registry-mock")
})

// Mock process.exit to prevent test termination
const processExitMock = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any);

// Mock execa
vi.mock("execa")

// Mock fs promises
vi.mock("node:fs/promises", () => ({
  writeFile: vi.fn(),
  mkdir: vi.fn(),
}))

// Mock spinner implementation
vi.mock("../../src/utils/spinner", () => ({
  spinner: vi.fn().mockImplementation(() => ({
    start: vi.fn().mockReturnThis(),
    stop: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis()
  }))
}))

// Mock fs.existsSync to control file existence checks
vi.mock("fs", async () => {
  const actualFs = await vi.importActual("fs") as typeof fs
  return {
    ...actualFs,
    existsSync: vi.fn().mockImplementation((path: string) => {
      // Return true for package.json, false for components.json
      if (path.includes("package.json")) return true
      if (path.includes("components.json")) return false
      return actualFs.existsSync(path)
    }),
  }
})

test.skip("init config-full", async () => {
  vi.spyOn(getPackageManger, "getPackageManager").mockResolvedValue("pnpm")
  const mockMkdir = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined)
  const mockWriteFile = vi.spyOn(fs.promises, "writeFile").mockResolvedValue()
  
  // Mock existsSync to return false for components.json and true for package.json
  vi.spyOn(fs, "existsSync").mockImplementation((path) => {
    if (path.toString().includes("components.json")) return false
    if (path.toString().includes("package.json")) return true
    return false
  })

  const targetDir = path.resolve(__dirname, "../fixtures/config-full")
  const config = await getConfig(targetDir)

  await runInit({
    cwd: targetDir,
    yes: true,
    defaults: false,
    force: false,
    silent: true,
    isNewProject: false,
    cssVariables: true,
  })

  expect(mockMkdir).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/src\/lib$/),
    expect.anything()
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/src\/components$/),
    expect.anything()
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/src\/app\/globals.css$/),
    expect.stringContaining(`@tailwind base`),
    "utf8"
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    3,
    expect.stringMatching(/src\/lib\/utils.ts$/),
    expect.stringContaining(`import { type ClassValue, clsx } from "clsx"`),
    "utf8"
  )
  expect(execa).toHaveBeenCalledWith(
    "pnpm",
    [
      "add",
      "tailwindcss-animate",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
      "@radix-ui/react-icons",
    ],
    {
      cwd: targetDir,
    }
  )

  mockMkdir.mockRestore()
  mockWriteFile.mockRestore()
})

test.skip("init config-partial", async () => {
  vi.spyOn(getPackageManger, "getPackageManager").mockResolvedValue("npm")
  const mockMkdir = vi.spyOn(fs.promises, "mkdir").mockResolvedValue(undefined)
  const mockWriteFile = vi.spyOn(fs.promises, "writeFile").mockResolvedValue()
  
  // Mock existsSync to return false for components.json and true for package.json
  vi.spyOn(fs, "existsSync").mockImplementation((path) => {
    if (path.toString().includes("components.json")) return false
    if (path.toString().includes("package.json")) return true
    return false
  })

  const targetDir = path.resolve(__dirname, "../fixtures/config-partial")
  const config = await getConfig(targetDir)

  await runInit({
    cwd: targetDir,
    yes: true,
    defaults: false,
    force: false,
    silent: true,
    isNewProject: false,
    cssVariables: true,
  })

  expect(mockMkdir).toHaveBeenNthCalledWith(
    1,
    expect.stringMatching(/src\/assets\/css$/),
    expect.anything()
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/lib$/),
    expect.anything()
  )
  expect(mockMkdir).toHaveBeenNthCalledWith(
    3,
    expect.stringMatching(/components$/),
    expect.anything()
  )
  expect(mockWriteFile).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/utils.ts$/),
    expect.stringContaining(`import { type ClassValue, clsx } from "clsx"`),
    "utf8"
  )
  expect(execa).toHaveBeenCalledWith(
    "npm",
    [
      "install",
      "tailwindcss-animate",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "lucide-react",
    ],
    {
      cwd: targetDir,
    }
  )

  mockMkdir.mockRestore()
  mockWriteFile.mockRestore()
})

beforeEach(() => {
  // Reset all mocks before each test
  vi.resetAllMocks()
  processExitMock.mockClear()
})

afterEach(() => {
  vi.resetAllMocks()
})
