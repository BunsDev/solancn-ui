"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { useConfig } from "@/hooks/use-config"
import { CopyButton } from "@/components/buttons/copy-button"
import { Icons } from "@/components/solancn/icons"
import { StyleSwitcher } from "@/components/site/style-switcher"
import { ThemeWrapper } from "@/components/site/theme-wrapper"
import { V0Button } from "@/components/buttons/v0-button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { styles } from "@/components/solancn/registry/registry-styles"
import { Index } from "@/lib/registry"

interface CodeBlockProps {
  "data-rehype-pretty-code-fragment": string
  children: React.ReactNode
}

interface ButtonProps {
  value?: string
  __rawString__?: string
}

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  extractClassname?: boolean
  extractedClassNames?: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
  showAnimations?: boolean
  controls?: React.ReactNode
  aspectRatio?: string
}

export function ComponentPreview({
  name,
  type,
  children,
  className,
  extractClassname,
  extractedClassNames,
  align = "center",
  description,
  hideCode = false,
  showAnimations = false,
  controls,
  aspectRatio = "4/3",
}: ComponentPreviewProps) {
  const [config] = useConfig()
  const index = styles.findIndex((style) => style.name === config.style)

  const Codes = React.Children.toArray(children) as React.ReactElement[]
  const Code = Codes[index]

  const Preview = React.useMemo(() => {
    const Component = Index[config.style]?.[name]?.component

    if (!Component) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
          <Icons.warning className="h-8 w-8 text-amber-500" />
          <p className="text-sm text-muted-foreground">
            Component{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {name}
            </code>{" "}
            not found in registry.
          </p>
          <p className="text-xs text-muted-foreground">
            Did you add it to the {config.style} registry?
          </p>
        </div>
      )
    }

    const PreviewComponent = () => <Component />
    
    return showAnimations ? (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <PreviewComponent />
      </motion.div>
    ) : (
      <PreviewComponent />
    )
  }, [name, config.style, showAnimations])

  const codeString = React.useMemo(() => {
    const codeElement = Code as React.ReactElement<CodeBlockProps> | undefined;
    
    if (codeElement && codeElement.props?.["data-rehype-pretty-code-fragment"]) {
      const children = codeElement.props.children;
      const [Button] = React.Children.toArray(children) as React.ReactElement<ButtonProps>[];
      
      return Button?.props?.value || Button?.props?.__rawString__ || null;
    }
    
    return null;
  }, [Code])

  if (type === "block") {
    return (
      <div className={cn(`aspect-[${aspectRatio}] w-full overflow-hidden rounded-md border`, className)}
      >
        <Image
          src={`/registry/styles/${config.style}/${name}-light.png`}
          alt={name || "Component preview"}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 w-[970px] max-w-none bg-background dark:hidden sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <Image
          src={`/registry/styles/${config.style}/${name}-dark.png`}
          alt={name}
          width={1440}
          height={900}
          className="absolute left-0 top-0 z-20 hidden w-[970px] max-w-none bg-background dark:block sm:w-[1280px] md:hidden md:dark:hidden"
        />
        <div className="absolute inset-0 hidden w-[1600px] bg-background md:block">
          <iframe
            src={`/registry/view/styles/${config.style}/${name}`}
            className="size-full"
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          {!hideCode && (
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="preview"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Code
              </TabsTrigger>
            </TabsList>
          )}
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex items-center justify-between p-4">
            <StyleSwitcher />
            <div className="flex items-center gap-2">
              {description ? <V0Button name={name} /> : null}
              <CopyButton
                value={codeString || ""}
                // className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:h-3.5 [&_svg]:w-3.5"
              />
            </div>
          </div>
          <ThemeWrapper defaultTheme="zinc">
            {controls && (
              <div className="border-t bg-muted/50 px-4 py-2">
                <div className="flex flex-wrap items-center gap-2">
                  {controls}
                </div>
              </div>
            )}
            <div
              className={cn(
                "preview flex min-h-[350px] w-full justify-center p-10",
                // {
                //   "items-center": align === "center",
                //   "items-start": align === "start",
                //   "items-end": align === "end",
                // }
              )}
            >
              <React.Suspense
                fallback={
                  <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </ThemeWrapper>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {Code || (
                <div className="flex h-[350px] w-full items-center justify-center text-sm text-muted-foreground">
                  <p>No code example available for this component.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
