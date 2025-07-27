import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  return new Response("Hello");
}
