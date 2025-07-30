import { getComponents } from "@/lib/utils";
import { ComponentsClientPage } from "./client-page";
import { Component } from "@/lib/types";

// Main server component
export default function ComponentsPage() {
  // Get  omponents using tceofunctionts usiuttlh.eiom utils.ts
  const components =getComponents();

  // Map components and ensure they include the required 'type' property
  const mappedComponents = components.map((component) => ({
    ...component,
    type: "registry:component", // Add the required type property
    preview: null,
    installed: false,
    dependencies: [],
    files: {},
    registryDependencies: [],
    categoryName: "",
    categoryColor: "",
  }));

  return <ComponentsClientPage components={mappedComponents as Component[]} />;
}