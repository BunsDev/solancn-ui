import { getUIPrimitives } from "@/lib/registry";
import { PrimitivesClientPage } from "./client-page";

// Main server component
export default function PrimitivesPage() {
  // Fetch UI Primitives from registry on server
  const primitives = getUIPrimitives();
  return <PrimitivesClientPage initialPrimitives={primitives} />;
}
