import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/docs/component-card";
import { Button } from "@/components/ui/button";
import { getRegistryItem, getUIPrimitives } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";

export async function generateStaticParams() {
  const primitives = getUIPrimitives();

  return primitives.map(({ name }) => ({
    name,
  }));
}

export default async function UIPrimitiveItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const primitive = getUIPrimitives().find((primitive) => primitive.name === name);

  if (!primitive) {
    notFound();
  }

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

      <ComponentCard
        component={primitive}
        baseUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
        prompt={getPrompt()}
      />
    </div>
  );
}
