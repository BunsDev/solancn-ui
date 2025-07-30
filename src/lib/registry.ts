import path from "path"
import { Project, ScriptKind, SourceFile, SyntaxKind } from "ts-morph"
import { z } from "zod"

import { Style } from "@/components/solancn/registry/registry-styles"
import { ComponentEntry, Registry, StyleRegistry } from "./registry-types"

// Import the registry index
import * as DefaultRegistry from "./registry/default"
import * as NewYorkRegistry from "./registry/new-york"

// Process registry components to ensure they match ComponentEntry type
function processRegistry(registry: any): Registry {
  const processed: Registry = {}

  // Process each exported component
  Object.entries(registry).forEach(([name, component]: [string, any]) => {
    if (component && typeof component === 'object' && component.component) {
      processed[name] = {
        component: component.component,
        type: component.type || 'component',
        files: component.files || [],
        dependencies: component.dependencies || [],
      }
    }
  })

  return processed
}

// Create a unified registry index with properly typed components
export const Index: StyleRegistry = {
  "default": processRegistry(DefaultRegistry),
  "new-york": processRegistry(NewYorkRegistry)
}

// Registry schema definitions
export const registryItemFileSchema = z.object({
  path: z.string(),
  type: z.enum([
    "registry:component",
    "registry:ui",
    "registry:example",
    "registry:template",
    "registry:hook",
    "registry:lib",
    "registry:page",
  ]),
  target: z.string().optional(),
  content: z.string().optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  component: z.any(),
  files: z.array(registryItemFileSchema),
  dependencies: z.array(z.string()).optional(),
  type: z.enum(["components", "templates"]).optional(),
  meta: z.any().optional(),
})

export const DEFAULT_REGISTRY_STYLE: Style["name"] = "new-york"

// Create a memoized version of the registry index for better performance
const memoizedIndex: StyleRegistry = Object.fromEntries(
  Object.entries(Index || {}).map(([style, items]) => [style, { ...items }])
)

/**
 * Get a component from the registry by name and style
 */
export function getRegistryEntry(name: string, style: Style["name"]): ComponentEntry | null {
  return Index[style]?.[name] ?? null
}

/**
 * Get detailed information about a registry item by name and style
 */
export async function getRegistryItem(
  name: string,
  style: Style["name"] = DEFAULT_REGISTRY_STYLE
): Promise<z.infer<typeof registryItemSchema> | null> {
  const item = memoizedIndex[style]?.[name]

  if (!item) {
    return null
  }

  // Create files array from item files or empty array if not present
  const files = item.files ? (Array.isArray(item.files) ?
    item.files.map((file) => typeof file === "string" ?
      { path: file, type: "registry:component" as const } :
      { ...file, type: file.type || "registry:component" as const }) :
    []) : []

  // Validate the item structure
  const result = registryItemSchema.safeParse({
    name,
    component: item.component,
    files,
    dependencies: item.dependencies || [],
    type: item.type || "component"
  })

  if (!result.success) {
    console.error("Registry item validation failed:", result.error.message)
    return null
  }

  return result.data
}

/**
 * Helper function to get the content of a file
 * For static exports, this returns mock content or pre-bundled content
 */
export async function getFileContent(filePath: string): Promise<string> {
  // For static exports, return mock content based on the file extension
  // In a real app, this could be pre-bundled content generated at build time
  try {
    const extension = filePath.split('.').pop()?.toLowerCase() || ''
    
    // Return mock content based on extension
    switch (extension) {
      case 'tsx':
      case 'ts':
        return '// TypeScript content for ' + filePath
      case 'js':
      case 'jsx':
        return '// JavaScript content for ' + filePath
      case 'css':
        return '/* CSS content for ' + filePath + ' */'
      case 'json':
        return JSON.stringify({ mockData: 'for ' + filePath }, null, 2)
      default:
        return '// Mock content for ' + filePath
    }
  } catch (error) {
    console.error(`Error getting file content ${filePath}:`, error)
    return '// Unable to load content for ' + filePath
  }
}

/**
 * Get the target path for a registry file
 */
export function getFileTarget(filePath: string, fileType: string): string {
  // Extract filename from path
  const fileName = filePath.split("/").pop() || ''

  // Determine target directory based on file type
  if (fileType.includes('component') || fileType.includes('block') || fileType.includes('example')) {
    return `components/${fileName}`
  }

  if (fileType.includes('ui')) {
    return `components/ui/${fileName}`
  }

  if (fileType.includes('hook')) {
    return `hooks/${fileName}`
  }

  if (fileType.includes('lib')) {
    return `lib/${fileName}`
  }

  return fileName
}

/**
 * Fix relative paths for files in a registry item
 */
export function fixFilePaths(files: Array<{ path: string; type: string }>): Array<{ path: string; type: string; target: string }> {
  if (!files || !files.length) {
    return []
  }

  // Get the directory of the first file to use as reference point
  const firstFilePath = files[0].path
  const firstFilePathDir = path.dirname(firstFilePath)

  return files.map(file => {
    return {
      ...file,
      path: path.relative(firstFilePathDir, file.path),
      target: getFileTarget(file.path, file.type),
    }
  })
}

/**
 * Fix import paths in content to use standard format
 */
export function fixImport(content: string): string {
  // Regex to match various import paths
  const regex = /@\/(.+?)\/(?:(?:.*?\/)(?:components|ui|hooks|lib))\/([\w-]+)/g

  return content.replace(regex, (match, _, component) => {
    // Extract the component type from the match
    if (match.includes('/components/')) {
      return `@/components/${component}`
    } else if (match.includes('/ui/')) {
      return `@/components/ui/${component}`
    } else if (match.includes('/hooks/')) {
      return `@/hooks/${component}`
    } else if (match.includes('/lib/')) {
      return `@/lib/${component}`
    }

    return match
  })
}

/**
 * FileTree type for creating a directory tree structure
 */
export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

/**
 * Convert a flat list of files into a hierarchical file tree
 */
export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
): FileTree[] {
  const root: FileTree[] = []

  // Loop through each file and build tree structure
  for (const file of files) {
    const filePath = file.target ?? file.path
    const parts = filePath.split("/")
    let currentLevel = root

    // Build tree structure by traversing path parts
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        // If node exists, update or traverse
        if (isFile) {
          existingNode.path = filePath
        } else {
          currentLevel = existingNode.children!
        }
      } else {
        // If node doesn't exist, create it
        const newNode: FileTree = isFile
          ? { name: part, path: filePath }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}
