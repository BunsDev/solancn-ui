import { getBlocks } from "@/lib/registry";
import { BlocksClientPage } from "./client-page";

// Main server component
export default function BlocksPage() {
  // Fetch blocks from registry on server
  const blocks = getBlocks();
  return <BlocksClientPage initialBlocks={blocks} />;
}
