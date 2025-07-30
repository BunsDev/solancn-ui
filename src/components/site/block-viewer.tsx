"use client"

import * as React from "react"
import { registryItemFileSchema } from "solancn/registry"
import { z } from "zod"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/code-block"

interface BlockViewerProps {
  item: {
    name: string
    files?: Array<z.infer<typeof registryItemFileSchema>>
  }
  tree: any // File tree structure
  highlightedFiles: Record<string, string>
  children?: React.ReactNode
}

export function BlockViewer({
  item,
  tree,
  highlightedFiles,
  children,
}: BlockViewerProps) {
  const [activeFile, setActiveFile] = React.useState<string | null>(
    item.files?.[0]?.path || null
  )

  return (
    <div className="grid w-full gap-8">
      {children && <div className="w-full">{children}</div>}
      <Tabs defaultValue="code" className="relative">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="code" className="relative mt-0">
          <div className="flex h-full flex-col space-y-4">
            <div className="grid w-full gap-6 overflow-hidden">
              <div className="flex flex-col space-y-4">
                {item.files?.length ? (
                  <div className="grid w-full gap-6 overflow-auto">
                    <div className="flex h-full min-h-[350px] flex-col space-y-4">
                      <div className="grid gap-1">
                        <div className="overflow-x-auto">
                          <nav className="flex items-center gap-1">
                            {item.files.map((file) => (
                              <button
                                key={file.path}
                                onClick={() => setActiveFile(file.path)}
                                className={cn(
                                  "flex h-7 items-center rounded-md px-2 text-xs transition-colors hover:bg-muted",
                                  activeFile === file.path
                                    ? "bg-muted font-medium text-foreground"
                                    : "text-muted-foreground"
                                )}
                              >
                                {file.path.split("/").pop()}
                              </button>
                            ))}
                          </nav>
                        </div>
                        {activeFile ? (
                          <div className="mt-2 max-w-full overflow-hidden rounded-md border">
                            <CodeBlock
                              value={highlightedFiles?.[activeFile] || ""}
                              expandable={false}
                              className="!my-0 !overflow-x-hidden !px-0"
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
