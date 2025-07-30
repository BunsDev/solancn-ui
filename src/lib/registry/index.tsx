// Import examples

import { ComponentEntry, type StyleRegistry } from "../registry-types";
import * as DefaultComponents from "./default";
import * as NewYorkComponents from "./new-york";

// The main registry index with all components organized by style
export const Index: StyleRegistry = {
	default: DefaultComponents,
	"new-york": NewYorkComponents,
};
