import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { demos } from "@/app/(docs)/blocks/[slug]/(demos)";
import { ComponentCard } from "@/components/docs/component-card";
import { Button } from "@/components/ui/button";
import { getComponent } from "@/lib/utils";

export async function generateStaticParams() {
  return Object.keys(demos).map((slug) => ({
    slug,
  }));
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const block = getComponent(slug);

  if (!block) {
    notFound();
  }

  const { components } = demos[slug];

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="font-bold text-3xl tracking-tight">{block.title}</h1>
        </div>
      </div>

      <ComponentCard
        name={block.name}
        baseUrl={process.env.VERCEL_BRANCH_URL ?? ""}
        title="Block Preview"
        promptTitle={`${block.title} Block Kit`}
        components={components}
      />
    </div>
  );
}
