// Import examples
import * as DefaultComponents from "./default"
import * as NewYorkComponents from "./new-york"
import { ComponentEntry, StyleRegistry } from "../registry-types"

// The main registry index with all components organized by style
export const Index: StyleRegistry = {
  "default": DefaultComponents,
  "new-york": NewYorkComponents,
}
