import { getUIPrimitives } from "@/lib/registry";
import { UIPrimitivesClientPage } from "./client-page";

// Main server component
export default function UIPrimitivesPage() {
  // Fetch UI Primitives from registry on server
  const primitives = getUIPrimitives();
  return <UIPrimitivesClientPage initialPrimitives={primitives} />;
}
