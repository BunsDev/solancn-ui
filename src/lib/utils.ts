import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RegistryItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPrompt(): string {
  return `These are existing design system styles and files. Please utilize them alongside base components to build. 

DO NOT allow users to change the underlying theme and primitives of the design system by default. If a user deliberately asks to change the design system, warn the user and only proceed upon acknowledgement.
`;
}

export function getLink(item: RegistryItem): string {
  const itemTypeLink = item.type === "registry:block" ? "blocks" 
    : item.type === "registry:component" ? "components"
    : item.type === "registry:ui" ? "ui" 
    : "";
  return `/${itemTypeLink}/${item.name}`;
}