import { getComponents } from "@/lib/utils";
import { ComponentsClientPage } from "./client-page";

// Main server component
export default function ComponentsPage() {
  // Fetch blocks from registry on server
  const components = getComponents();
  return <ComponentsClientPage components={
    components.map((component) => ({
      ...component,
      type: "registry:component", // Add the required type property
      preview: null,
      installed: false,
      dependencies: [],
      files: {},
      registryDependencies: [],
      categoryName: "",
      categoryColor: "",
    }))
  } />;
}