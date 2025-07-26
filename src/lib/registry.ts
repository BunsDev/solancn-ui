import registry from "@/registry";

export interface Component {
  name: string;
  type: "registry:block" | "registry:component" | "registry:ui";
  title: string;
  category?: string;
  features?: string[];
  description?: string;
  tags?: string[];
  files?: { path: string; type: string; target: string }[];
}

export interface Block extends Component {}

export interface UIPrimitive extends Component {}

export function getRegistryItems(): Component[] {
  // exclude style item as it's not relevant to show in the ui
  const components = registry.items.filter(
    (item) => item.type !== "registry:style",
  );

  return components as Component[];
}

export function getRegistryItem(name: string): Component {
  const components = getRegistryItems();

  const component = components.find(
    (item: { name: string }) => item.name === name,
  );

  if (component == null) {
    throw new Error(`Component "${name}" not found`);
  }

  return component;
}

export function getBlocks(): Block[] {
  return getRegistryItems().filter(
    (component) => component.type === "registry:block",
  ) as Block[];
}

export function getComponents(): Component[] {
  return getRegistryItems().filter(
    (component) => component.type === "registry:component",
  ) as Component[];
}

export function getUIPrimitives(): UIPrimitive[] {
  return getRegistryItems().filter(
    (component) => component.type === "registry:ui",
  ) as UIPrimitive[];
}

