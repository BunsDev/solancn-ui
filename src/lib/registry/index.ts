import registry from "@/registry";
import type { Block, Component, UIPrimitive, RegistryItemType } from "@/lib/types";

export function getRegistryItems(): Component[] {
  // exclude style item as it's not relevant to show in the ui
  const components = registry.items.filter(
    (item) => item.type !== "registry:style" as RegistryItemType,
  );

  return components as unknown as Component[];
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
    (component) => component.type === "registry:block" as RegistryItemType,
  ) as unknown as Block[];
}

export function getComponents(): Component[] {
  return getRegistryItems().filter(
    (component) => component.type === "registry:component" as RegistryItemType,
  ) as unknown as Component[];
}

export function getUIPrimitives(): UIPrimitive[] {
  return getRegistryItems().filter(
    (component) => component.type === "registry:ui" as RegistryItemType,
  ) as unknown as UIPrimitive[];
}
