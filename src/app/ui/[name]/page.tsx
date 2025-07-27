import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { UIPrimitiveCard } from "@/components/docs/ui-primitive-card";
import { Button } from "@/components/ui/button";
import { getRegistryItem, getUIPrimitives } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";

interface PageProps {
  params: {
    name: string;
  };
}

export async function generateStaticParams() {
  const primitives = getUIPrimitives();

  return primitives.map(({ name }) => ({
    name,
  }));
}

export default async function UIPrimitiveItemPage({
  params,
}: PageProps) {
  const { name } = params;
  const primitive = getUIPrimitives().find((primitive) => primitive.name === name);

  if (!primitive) {
    notFound();
  }

  // Get prompt separately to handle the async operation
  const prompt = await getPrompt();

  return (
    <div className="flex flex-col gap-4 w-full mx-auto justify-center">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/ui">
              <ArrowLeft className="mr-2 size-4" />
              UI Primitives
            </Link>
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">
            {primitive.title}
          </h1>
        </div>
      </div>

      <UIPrimitiveCard
        primitive={primitive}
        baseUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
        prompt={prompt}
      />
    </div>
  );
}
