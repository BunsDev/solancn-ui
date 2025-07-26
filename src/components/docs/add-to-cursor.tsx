import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AddToCursor({
  mcp,
}: {
  mcp: { command: string; env: { [key: string]: string } };
}) {
  function generateCursorDeeplink() {
    const name = "shadcn";
    const config = btoa(JSON.stringify(mcp));

    return `cursor://anysphere.cursor-deeplink/mcp/install?name=${name}&config=${config}`;
  }

  return (
    <Button
      size="sm"
      className="bg-primary text-text hover:bg-primary hover:shadow-sm dark:bg-primary dark:text-text dark:hover:bg-primary"
      asChild
    >
      <Link href={generateCursorDeeplink()}>
        <img
          src="https://cursor.com/deeplink/mcp-install-light.svg"
          alt="Add shadcn/ui Registry MCP server to Cursor"
          height="80"
          className="hidden dark:block"
        />
        <img
          src="https://cursor.com/deeplink/mcp-install-dark.svg"
          alt="Add shadcn/ui Registry MCP server to Cursor"
          height="80"
          className="block dark:hidden"
        />
      </Link>
    </Button>
  );
}
