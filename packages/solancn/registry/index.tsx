import * as React from "react"

// This file serves as the central registry for all components
// organized by style (default, new-york)

// Import component examples from the project
import * as DefaultComponents from "./default"
import * as NewYorkComponents from "./new-york"

// Type definitions for the registry
export interface ComponentEntry {
  component: React.ComponentType
  files?: string[]
  dependencies?: string[]
  type?: "component" | "example" | "block"
}

export interface Registry {
  [componentName: string]: ComponentEntry
}

export interface StyleRegistry {
  [style: string]: {
    [componentName: string]: ComponentEntry
  }
}

// The main registry index with all components organized by style
export const Index: StyleRegistry = {
  "default": DefaultComponents,
  "new-york": NewYorkComponents,
}
