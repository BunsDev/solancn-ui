"use client";

import { Check, Copy, ClipboardCopy } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
import type { Block } from "@/lib/types";

interface BlockCardProps {
  block: Block;
  baseUrl: string;
  prompt: string;
}

export function BlockCard({ block, baseUrl, prompt }: BlockCardProps) {
  const [copied, setCopied] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const registryUrl = `https://${baseUrl}/r/${block.name}.json`;
  const npxCommand = `npx shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      // Show tooltip on success
      setTooltipVisible(true);
      // Hide the success state after 2 seconds
      setTimeout(() => setCopied(false), 1500);
      // Hide the tooltip after a bit longer
      setTimeout(() => setTooltipVisible(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  
  // Reset tooltip visibility when user moves away
  useEffect(() => {
    return () => setTooltipVisible(false);
  }, []);

  return (
    <div className="flex flex-col justify-center h-dvh gap-4">
      <Card id="starting-kit" className="border-foreground/25">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="font-medium text-lg">Preview</CardTitle>

            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
              <CardDescription>{block.description}</CardDescription>

              <div className="flex items-center gap-1 sm:ml-auto">
                <TooltipProvider>
                  <Tooltip open={tooltipVisible} onOpenChange={setTooltipVisible}>
                    <TooltipContent 
                      side="bottom"
                      className="font-mono bg-black/90 text-white backdrop-blur-lg border border-primary/20 px-3 py-2"
                      sideOffset={5}
                    >
                      {copied ? "Copied!" : "Copy CLI command"}
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          <Button
                            onClick={copyToClipboard}
                            variant="outline"
                            className={`relative overflow-hidden p-4 border-2 transition-all duration-300 ${copied ? 'border-[#14F195] bg-[#14F195]/10' : 'border-[#9945FF]/40 hover:border-[#9945FF] hover:bg-[#9945FF]/10'}`}
                            aria-label="Copy npx command to clipboard"
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {copied ? (
                                <motion.div
                                  key="check"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <Check className="size-4 text-[#14F195]" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="copy"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <ClipboardCopy className="size-4 text-[#9945FF]" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                          
                          {/* Ripple effect when clicked */}
                          {copied && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0.75 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 rounded-md bg-[#14F195]/20"
                            />
                          )}
                        </motion.div>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>

                <OpenInV0Button
                  registryUrl={registryUrl}
                  title={`${block.title} Kit`}
                  prompt={prompt}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 rounded-md px-6">
          <div
            className={
              "h-full sm:h-[calc(100vh-24rem)] max-h-full w-full overflow-hidden rounded-md border border-border p-4"
            }
          >
            <iframe
              id="iframe"
              src={`/starters/${block.name}`}
              className="h-full w-full"
              title="Page Preview"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
