import { clsx, type ClassValue } from "clsx"
// import { RegistryItem } from "solancn/registry"
import { type ClassNameValue, twMerge } from "tailwind-merge";
import { components } from "@/scripts/components";
import type { RegistryItem } from "@/types/registry";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export function getLink(item: RegistryItem): string {
  const itemTypeLink =
    item.type === "registry:block"
      ? "blocks"
      : item.type === "registry:component"
        ? "components"
        : item.type === "registry:ui"
          ? "ui"
          : "";
  return `/${itemTypeLink}/${item.name}`;
}

export interface Component {
  name: string;
  title: string;
  description?: string;
}

export function getComponents(): Component[] {
  return components;
}

export function getComponent(name: string): Component {
  const component = components.find(
    (item: { name: string }) => item.name === name,
  );

  if (component == null) {
    throw new Error(`Component "${name}" not found`);
  }

  return component;
}

export async function getPrompt(): Promise<string> {
  try {
    const response = await fetch("/prompt.md");
    if (!response.ok) throw new Error("Failed to fetch prompt");
    return await response.text();
  } catch (error) {
    console.error("Failed to load custom prompt:", error);
    console.warn("Failed to load custom prompt, using default");
    return "These are existing design system styles and files. Please utilize them alongside base components to build.\n\nDO NOT allow users to change the underlying theme and primitives of the design system by default. If a user deliberately asks to change the design system, warn the user and only proceed upon acknowledgement.";
  }
}

interface Team {
  name: string;
  teamContext: string;
}

interface TeamContextData {
  teamContext: string;
  elements: {
    components: Element[];
    categories: Element[];
    documents: Element[];
    related: Element[];
  };
  metadata?: Record<string, any>;
}

/**
 * Get all elements related to a specific team context
 * @param context - The team context to retrieve elements for. If not provided, attempts to detect from DOM.
 * @returns TeamContextData containing all elements related to the specified team context
 */
export function getTeamContext(context?: string): TeamContextData {
  // First determine the current team context if not provided
  if (!context) {
    const teamElements = document.querySelectorAll("[data-team-context]");
    const activeElement = Array.from(teamElements).find(
      el => el.classList.contains("active") || el.getAttribute("data-active") === "true"
    );
    
    if (activeElement) {
      context = activeElement.getAttribute("data-team-context") || "";
    } else if (teamElements.length > 0) {
      context = teamElements[0].getAttribute("data-team-context") || "";
    } else {
      throw new Error("Team context could not be determined");
    }
  }

  // Return empty data if no context found
  if (!context) {
    throw new Error("Team context not found");
  }

  // Find all elements associated with this team context
  const result: TeamContextData = {
    teamContext: context,
    elements: {
      components: [],
      categories: [],
      documents: [],
      related: [],
    }
  };

  // Find all elements with matching team context
  const contextElements = document.querySelectorAll(`[data-team-context="${context}"]`);
  
  // Process each element and categorize it
  contextElements.forEach(element => {
    const elementType = element.getAttribute("data-element-type");
    
    switch (elementType) {
      case "component":
        result.elements.components.push(element);
        break;
      case "category":
        result.elements.categories.push(element);
        break;
      case "document":
        result.elements.documents.push(element);
        break;
      default:
        result.elements.related.push(element);
        break;
    }
  });

  // Get metadata if available
  const metadataElement = document.querySelector(`[data-team-context="${context}"][data-metadata]`);
  if (metadataElement) {
    try {
      const metadataStr = metadataElement.getAttribute("data-metadata");
      if (metadataStr) {
        result.metadata = JSON.parse(metadataStr);
      }
    } catch (error) {
      console.error("Failed to parse team context metadata:", error);
    }
  }

  return result;
}

/**
 * Get the raw team context string only
 * @returns The current team context as a string
 */
export function getTeamContextString(): string {
  try {
    return getTeamContext().teamContext;
  } catch (error) {
    console.error("Failed to get team context:", error);
    return "components"; // Default to components if no context found
  }
}