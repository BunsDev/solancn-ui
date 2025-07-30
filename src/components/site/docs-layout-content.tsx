"use client";

import { ReactNode } from "react";
import Header from "@/components/site/header";
import Sidebar from "@/components/site/sidebar";
import { TableOfContents } from "@/components/site/table-of-contents";
import { useTOC } from "@/contexts/toc-context";

export function DocsLayoutContent({ children }: { children: ReactNode }) {
  const { showTOC } = useTOC();

  return (
    <div className="w-full flex-col bg-white dark:bg-black text-neutral-800 dark:text-white relative">
      <Header />
      <div className="mx-auto max-w-[1536px] flex flex-1 md:space-x-16">
        <Sidebar />
        <main className={`flex-1 py-6 pb-16 pt-8 min-w-0 px-4 text-neutral-800 dark:text-white ${
          showTOC ? 'max-w-4xl' : 'max-w-none pr-8'
        }`}>
          <div className="prose prose-zinc dark:prose-invert prose-h1:text-3xl prose-h1:font-semibold prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-14 prose-h3:text-lg prose-h3:font-medium prose-h3:scroll-m-20 max-w-full">
            {children}
          </div>
        </main>
        {showTOC && <TableOfContents />}
      </div>
    </div>
  );
}
