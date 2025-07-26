import type { RegistryItem } from "../types";

export function getCategory(item: RegistryItem): string {
  const name = item.name.toLowerCase();
  const description = item.description?.toLowerCase() || "";

  // Try to determine category from block data
  if (item.category) {
    return item.category.toLowerCase();
  }

  // Use pattern matching to assign categories
  if (
    name.includes("nav") ||
    name.includes("menu") ||
    name.includes("sidebar") ||
    description.includes("navigation") ||
    description.includes("menu")
  ) {
    return "navigation";
  }

  if (
    name.includes("form") ||
    name.includes("input") ||
    name.includes("field") ||
    description.includes("form") ||
    description.includes("input")
  ) {
    return "forms";
  }

  if (name.includes("card") || description.includes("card")) {
    return "cards";
  }

  if (
    name.includes("auth") ||
    name.includes("login") ||
    name.includes("signup") ||
    description.includes("authentication") ||
    description.includes("login")
  ) {
    return "authentication";
  }

  if (
    name.includes("layout") ||
    name.includes("grid") ||
    name.includes("section") ||
    description.includes("layout") ||
    description.includes("section")
  ) {
    return "layout";
  }

  if (
    name.includes("dashboard") ||
    name.includes("analytics") ||
    description.includes("dashboard") ||
    description.includes("analytics")
  ) {
    return "dashboard";
  }

  if (
    name.includes("alert") ||
    name.includes("toast") ||
    name.includes("notification") ||
    description.includes("alert") ||
    description.includes("notification")
  ) {
    return "feedback";
  }

  if (
    name.includes("modal") ||
    name.includes("dialog") ||
    name.includes("drawer") ||
    name.includes("popover") ||
    description.includes("modal") ||
    description.includes("dialog")
  ) {
    return "overlays";
  }

  if (
    name.includes("table") ||
    name.includes("list") ||
    name.includes("data") ||
    description.includes("data") ||
    description.includes("display")
  ) {
    return "data";
  }

  if (
    name.includes("hero") ||
    name.includes("cta") ||
    name.includes("landing") ||
    description.includes("marketing") ||
    description.includes("landing") ||
    description.includes("hero")
  ) {
    return "marketing";
  }

  // Default to layout if no category matches
  return "layout";
}
