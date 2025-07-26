import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/docs/component-card";
import { Button } from "@/components/ui/button";
import { getComponents } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";

export async function generateStaticParams() {
  const components = getComponents();

  return components.map(({ name }) => ({
    name,
  }));
}

export default async function ComponentItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const component = getComponents().find((component) => component.name === name);

  if (!component) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4 w-full mx-auto justify-center">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/components">
              <ArrowLeft className="mr-2 size-4" />
              Components
            </Link>
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">
            {component.title}
          </h1>
        </div>
      </div>

      <ComponentCard
        component={component}
        baseUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
        prompt={getPrompt()}
      />
    </div>
  );
}
