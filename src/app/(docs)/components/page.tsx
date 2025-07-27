import { getComponents } from "@/lib/registry";
import { ComponentsClientPage } from "./client-page";

// Main server component
export default function ComponentsPage() {
  // Fetch blocks from registry on server
  const components = getComponents();
  return <ComponentsClientPage components={components} />;
}