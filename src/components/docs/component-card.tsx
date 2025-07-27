"use client";

import { Check, Copy } from "lucide-react";
import { type ReactElement, type ReactNode, useEffect, useState } from "react";

import { OpenInV0Button } from "@/components/docs/open-in-v0";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getComponent, getPrompt } from "@/lib/utils";

interface ComponentCardProps {
  name: string;
  baseUrl: string;
  description?: string;
  title?: string;
  prompt?: string;
  promptTitle?: string;
  previewUrl?: string;
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export function ComponentCard({
  name,
  title,
  description,
  prompt: propPrompt,
  promptTitle,
  baseUrl,
  previewUrl,
  components,
}: ComponentCardProps) {
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState(propPrompt);

  useEffect(() => {
    if (!propPrompt) {
      getPrompt().then(setPrompt);
    }
  }, [propPrompt]);

  const component = getComponent(name);

  const registryUrl = `https://${baseUrl}/r/${name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (component == null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No registry item found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <Card id="starting-kit" className="border-foreground/25">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="font-medium text-lg">{title}</CardTitle>

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <CardDescription>
                {description ?? component.description}
              </CardDescription>

              <div className="flex items-center gap-1 sm:ml-auto relative z-30">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent className="font-mono">
                      Copy command
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={copyToClipboard}
                        variant="outline"
                        className="p-4 relative z-50"
                        aria-label="Copy npx command to clipboard"
                      >
                        {copied ? (
                          <Check className="size-4" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>

                <OpenInV0Button
                  registryUrl={registryUrl}
                  title={promptTitle}
                  prompt={prompt}
                  className="relative z-50"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        {(components || previewUrl) && (
          <CardContent className="grid grid-cols-1 items-center justify-center gap-4 rounded-md px-6 items-center text-center">
            {components &&
              Object.entries(components).map(([key, node]) => (
                <div className="w-full" key={key}>
                  {node}
                </div>
              ))}

            {previewUrl && (
              <div
                className={
                  "flex flex-col w-full overflow-hidden rounded-lg border border-primary/20 bg-black shadow-lg shadow-primary/5 mx-auto transition-all duration-300 hover:border-primary/40 aspect-video"
                }
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"></div>
                <iframe
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  title={`${title || name} Preview`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
