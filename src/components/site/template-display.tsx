import * as React from "react"

import { highlightCode } from "@/lib/highlight-code"
import {
  createFileTreeForRegistryItemFiles,
  getRegistryItem,
} from "@/lib/registry"
import { cn } from "@/lib/utils"
import { ComponentPreview } from "@/components/site/component-preview"
import { TemplateViewer } from "@/components/site/template-viewer"

export async function TemplateDisplay({ name }: { name: string }) {
  const item = await getCachedRegistryItem(name)
  const files = item?.files
  if (!files) {
    return null
  }

  const [tree, highlightedFiles] = await Promise.all([
    getCachedFileTree(item.files),
    getCachedHighlightedFiles(item.files),
  ])

  return (
    <TemplateViewer
      item={{
        name: item.name,
        files: item.files.map((file) => ({
          ...file,
          type: "registry:file",
          target: file.path,
          content: file.content,
        })),
      }}
      tree={tree}
      highlightedFiles={highlightedFiles.reduce((acc, file) => {
        acc[file.path] = file.highlightedContent
        return acc
      }, {} as Record<string, string>)}
    >
      <ComponentPreview
        name={item.name}
        hideCode
        className={cn(
          "my-0 **:[.preview]:h-auto **:[.preview]:p-4 **:[.preview>.p-6]:p-0",
          item.meta?.containerClassName
        )}
      />
    </TemplateViewer>
  )
}

const getCachedRegistryItem = React.cache(async (name: string) => {
  return await getRegistryItem(name)
})

const getCachedFileTree = React.cache(
  async (files: Array<{ path: string; target?: string; content?: string }>) => {
    if (!files) {
      return null
    }

    return await createFileTreeForRegistryItemFiles(files)
  }
)

const getCachedHighlightedFiles = React.cache(
  async (files: Array<{ path: string; content?: string }>) => {
    return await Promise.all(
      files.map(async (file) => ({
        ...file,
        highlightedContent: await highlightCode(file.content ?? ""),
      }))
    ) 
  }
)
