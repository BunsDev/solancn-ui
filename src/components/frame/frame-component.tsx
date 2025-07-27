"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function FrameComponent() {
  return (
    <Card className="w-full bg-background text-text border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <CardTitle className="text-[#14F195]">Solana Frames</CardTitle>
        <CardDescription className="text-gray-400">
          Create and manage your Solana Frames
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-background border border-[#9945FF]/30">
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              Create Frame
            </TabsTrigger>
            <TabsTrigger
              value="browse"
              className="data-[state=active]:bg-[#9945FF]/20"
            >
              Browse Frames
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <label htmlFor="frame-title" className="text-sm font-medium">
                  Frame Title
                </label>
                <Input
                  id="frame-title"
                  placeholder="My Awesome Frame"
                  className="mt-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              <div>
                <label
                  htmlFor="frame-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <Textarea
                  id="frame-description"
                  placeholder="Write a description for your frame..."
                  className="mt-1 min-h-[100px] bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              <div>
                <label htmlFor="frame-image" className="text-sm font-medium">
                  Image URL
                </label>
                <Input
                  id="frame-image"
                  placeholder="https://example.com/image.png"
                  className="mt-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              <div>
                <label htmlFor="frame-actions" className="text-sm font-medium">
                  Frame Actions
                </label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex space-x-2">
                    <Input
                      id="frame-actions"
                      placeholder="Button Text"
                      className="bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                    />
                    <Input
                      id="frame-actions"
                      placeholder="Action URL"
                      className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      id="frame-actions"
                      placeholder="Button Text"
                      className="bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                    />
                    <Input
                      id="frame-actions"
                      placeholder="Action URL"
                      className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                  >
                    + Add Action
                  </Button>
                </div>
              </div>

              <div className="pt-2">
                <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                  Create Frame
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="browse" className="mt-4">
            <div className="space-y-4">
              <div className="text-center p-6 border border-dashed border-[#9945FF]/30 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#9945FF]/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9945FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <title>No Frames Found</title>
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No Frames Found</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Connect your wallet to view your frames or create a new one
                </p>
                <Button className="bg-[#9945FF] hover:bg-[#9945FF]/90">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t border-[#9945FF]/20 pt-4">
        <div className="w-full text-sm text-gray-400 flex items-center justify-between">
          <span>Powered by Solana</span>
          <a
            href="https://solana.com"
            className="text-[#14F195] hover:underline"
          >
            Learn more about Solana Frames →
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}

export const frame = {
  name: "frame",
  components: {
    Default: <FrameComponent />,
  },
};