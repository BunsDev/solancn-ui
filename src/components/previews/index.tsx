"use client";

import type React from 'react';
import type { Block, Component, UIPrimitive } from "@/lib/types";
import { Button } from "@/components/ui/button";

// Solana brand colors
const SOLANA_PURPLE = "#9945FF";
const SOLANA_GREEN = "#14F195";
const SOLANA_BLACK = "#000000";

// These will be implemented in separate files
const SwapPreview = () => (
  <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Swap Demo</div>
    <div className="flex items-center justify-between w-full mb-2">
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-20 text-center">SOL</div>
      <div className="text-lg">↔</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-20 text-center">USDC</div>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">Preview</div>
  </div>
);

const PortfolioPreview = () => (
  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Portfolio</div>
    <div className="grid grid-cols-2 gap-2 w-full mb-2">
      <div className="bg-white/20 rounded-md p-1.5 text-xs text-center">SOL</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs text-center">USDC</div>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">View Assets</div>
  </div>
);

const ButtonPreview = () => (
  <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
    <Button className="bg-[#9945FF] text-white rounded-md py-1.5 px-3 text-sm">Primary</Button>
    <Button className="border border-gray-200 rounded-md py-1.5 px-3 text-sm dark:border-gray-700">Secondary</Button>
  </div>
);

const WalletPreview = () => (
  <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Wallet</div>
    <div className="bg-white/20 rounded-md p-1.5 text-xs w-full mb-2 flex justify-between">
      <span>Balance:</span>
      <span>1.45 SOL</span>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">Connect</div>
  </div>
);

const StakePreview = () => (
  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Stake</div>
    <div className="bg-white/20 rounded-md p-1.5 text-xs w-full mb-2 flex justify-between">
      <span>APY:</span>
      <span>5.2%</span>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">Stake SOL</div>
  </div>
);

const AccordionPreview = () => (
  <div className="flex flex-col w-full gap-1">
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
      <span className="text-xs font-medium">Section 1</span>
      <span>▼</span>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2 flex justify-between items-center">
      <span className="text-xs font-medium">Section 2</span>
      <span>▶</span>
    </div>
  </div>
);

const CardPreview = () => (
  <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden w-32 scale-90">
    <div className="bg-gray-100 dark:bg-gray-800 p-2 text-xs font-medium">Card Header</div>
    <div className="p-2 text-xs">Card content...</div>
  </div>
);

const HeroPreview = () => (
  <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-bold mb-1">Hero Title</div>
    <div className="text-xs mb-2 text-center">Subtitle text goes here</div>
    <div className="flex gap-1">
      <div className="bg-white/30 rounded-md py-0.5 px-2 text-xs font-medium">Button 1</div>
      <div className="bg-white rounded-md py-0.5 px-2 text-xs font-medium text-[#9945FF]">Button 2</div>
    </div>
  </div>
);

// Registry preview map - maps registry item names to their preview components
export const previewRegistry: Record<string, React.ReactNode> = {
  // Block previews
  swapDemo: <SwapPreview />,
  portfolioDemo: <PortfolioPreview />,
  walletDemo: <WalletPreview />,
  stakeDemo: <StakePreview />,
  transferDemo: (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
      <div className="text-sm font-medium mb-2">Transfer</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-full text-center mb-2">SOL</div>
      <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">Send</div>
    </div>
  ),
  borrowDemo: (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
      <div className="text-sm font-medium mb-2">Borrow</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-full text-center mb-2">1.5 SOL</div>
      <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">Borrow</div>
    </div>
  ),
  lendDemo: (
    <div className="bg-gradient-to-r from-teal-500 to-green-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
      <div className="text-sm font-medium mb-2">Lend</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-full text-center mb-2">2.0 SOL</div>
      <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">Lend</div>
    </div>
  ),
  
  // UI previews
  button: <ButtonPreview />,
  card: <CardPreview />,
  accordion: <AccordionPreview />,
  dialog: (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-900 shadow-md w-32 h-24 flex flex-col justify-between">
      <div className="text-xs font-medium">Dialog Title</div>
      <div className="text-[10px]">Dialog content...</div>
      <div className="flex justify-end gap-1">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-sm py-0.5 px-1 text-[8px]">Cancel</div>
        <div className="bg-[#9945FF] rounded-sm py-0.5 px-1 text-[8px] text-white">OK</div>
      </div>
    </div>
  ),
  select: (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden w-32">
      <div className="p-1 text-xs flex justify-between items-center">
        <span>Select option</span>
        <span>▼</span>
      </div>
    </div>
  ),
  
  // Component previews
  hero: <HeroPreview />,
  footer: (
    <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900 w-full flex justify-between items-center">
      <div className="text-[10px]"> 2025 Solana</div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-[#9945FF]" />
        <div className="w-2 h-2 rounded-full bg-[#14F195]" />
      </div>
    </div>
  ),
  header: (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-900 w-full flex justify-between items-center">
      <div className="text-xs font-bold text-[#9945FF]">Logo</div>
      <div className="flex gap-2">
        <div className="text-[10px]">Link 1</div>
        <div className="text-[10px]">Link 2</div>
      </div>
    </div>
  )
};

// Helper function to get a preview by registry item name
export function getPreviewForItem(name: string): React.ReactNode {
  return previewRegistry[name] || null;
}

// Function to apply previews to registry items
export function applyPreviewsToRegistry(items: (Block | Component | UIPrimitive)[]) {
  return items.map(item => ({
    ...item,
    preview: previewRegistry[item.name] || null
  }));
}
