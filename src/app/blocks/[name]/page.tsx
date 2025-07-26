import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlockCard } from "@/components/docs/block-card";
import { Button } from "@/components/ui/button";
import { getBlocks } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";

export async function generateStaticParams() {
  const blocks = getBlocks();

  return blocks.map(({ name }) => ({
    name,
  }));
}

export default async function BlockItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const block = getBlocks().find((block) => block.name === name);

  if (!block) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 mx-auto h-dvh w-dvw justify-center">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/blocks">
              <ArrowLeft className="mr-2 size-4" />
              Blocks
            </Link>
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">{block.title}</h1>
        </div>
      </div>

      <BlockCard
        block={block}
        baseUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
        prompt={getPrompt()}
      />
    </div>
  );
}
