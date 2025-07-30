import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { RegistryItem } from "./types";
import { components } from "@/scripts/components";

export const cn = (...classNames: ClassNameValue[]) => {
  return twMerge(clsx(...classNames));
};

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
    console.warn("Failed to load custom prompt, using default");
    return "These are existing design system styles and files. Please utilize them alongside base components to build.\n\nDO NOT allow users to change the underlying theme and primitives of the design system by default. If a user deliberately asks to change the design system, warn the user and only proceed upon acknowledgement.";
  }
}
