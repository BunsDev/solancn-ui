import type { Category, RegistryItem } from "../types";

export function getCategory(item: RegistryItem): Category {
  const name = item.name.toLowerCase();
  const description = item.description?.toLowerCase() || "";

  // Try to determine category from block data
  if (item.category) {
    return { name: item.category, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" };
  }

  // Use pattern matching to assign categories
  if (
    name.includes("nav") ||
    name.includes("menu") ||
    name.includes("sidebar") ||
    description.includes("navigation") ||
    description.includes("menu")
  ) {
    return { name: "navigation", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" };
  }

  if (
    name.includes("form") ||
    name.includes("input") ||
    name.includes("field") ||
    description.includes("form") ||
    description.includes("input")
  ) {
    return { name: "forms", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" };
  }

  if (name.includes("card") || description.includes("card")) {
    return { name: "cards", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" };
  }

  if (
    name.includes("auth") ||
    name.includes("login") ||
    name.includes("signup") ||
    description.includes("authentication") ||
    description.includes("login")
  ) {
    return { name: "authentication", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400" };
  }

  if (
    name.includes("layout") ||
    name.includes("grid") ||
    name.includes("section") ||
    description.includes("layout") ||
    description.includes("section")
  ) {
    return { name: "layout", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" };
  }

  if (
    name.includes("dashboard") ||
    name.includes("analytics") ||
    description.includes("dashboard") ||
    description.includes("analytics")
  ) {
    return { name: "dashboard", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" };
  }

  if (
    name.includes("alert") ||
    name.includes("toast") ||
    name.includes("notification") ||
    description.includes("alert") ||
    description.includes("notification")
  ) {
    return { name: "feedback", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" };
  }

  if (
    name.includes("modal") ||
    name.includes("dialog") ||
    name.includes("drawer") ||
    name.includes("popover") ||
    description.includes("modal") ||
    description.includes("dialog")
  ) {
    return { name: "overlays", color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" };
  }

  if (
    name.includes("table") ||
    name.includes("list") ||
    name.includes("data") ||
    description.includes("data") ||
    description.includes("display")
  ) {
    return { name: "data", color: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400" };
  }

  if (
    name.includes("hero") ||
    name.includes("cta") ||
    name.includes("landing") ||
    description.includes("marketing") ||
    description.includes("landing") ||
    description.includes("hero")
  ) {
    return { name: "marketing", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" };
  }

  // Default to layout if no category matches
  return { name: "layout", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" };
}
