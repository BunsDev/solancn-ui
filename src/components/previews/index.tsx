import { Button } from "@/components/ui/button";
import type { Block, Component, UIPrimitive } from "@/lib/types";
import type React from "react";

// Solana brand colors
const SOLANA_PURPLE = "#9945FF";
const SOLANA_GREEN = "#14F195";
const SOLANA_BLACK = "#000000";

// These will be implemented in separate files
const SwapPreview = () => (
  <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Swap</div>
    <div className="flex flex-col w-full gap-2">
      <div className="bg-white/20 rounded-md p-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-white mr-1.5" />
          <span className="text-xs">SOL</span>
        </div>
        <span className="text-xs">1.45</span>
      </div>
      <div className="flex justify-center -my-0.5">
        <div className="bg-white/30 rounded-full p-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Swap</title>
            <path
              d="M17 10L12 15L7 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="bg-white/20 rounded-md p-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-4 h-4 rounded-full bg-green-400 mr-1.5" />
          <span className="text-xs">USDC</span>
        </div>
        <span className="text-xs">24.53</span>
      </div>
    </div>
    <div className="mt-3 bg-white/30 rounded-md py-1.5 px-4 text-xs font-medium w-full text-center">
      Swap
    </div>
  </div>
);

const PortfolioPreview = () => (
  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Portfolio</div>
    <div className="grid grid-cols-2 gap-2 w-full mb-2">
      <div className="bg-white/20 rounded-md p-1.5 text-xs text-center">
        SOL
      </div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs text-center">
        USDC
      </div>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">
      View Assets
    </div>
  </div>
);

const NFTPreview = () => (
  <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>NFT</title>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="white"
          strokeWidth="2"
        />
        <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" fill="white" />
        <path
          d="M6 14l2-2 3 3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 10l4 4v3H6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      NFT Gallery
    </div>
    <div className="grid grid-cols-2 gap-1.5 w-full mb-2">
      <div className="aspect-square rounded-md overflow-hidden bg-white/20 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400" />
      </div>
      <div className="aspect-square rounded-md overflow-hidden bg-white/20 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-blue-300 to-indigo-400" />
      </div>
      <div className="aspect-square rounded-md overflow-hidden bg-white/20 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-yellow-300 to-orange-400" />
      </div>
      <div className="aspect-square rounded-md overflow-hidden bg-white/20 flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-green-300 to-teal-400" />
      </div>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium w-full text-center">
      View Collection
    </div>
  </div>
);

const BridgePreview = () => (
  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Bridge</div>
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-purple-400" />
          <span className="text-xs">Solana</span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Exchange</title>
          <path
            d="M12 5L12 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 12L5 12"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-yellow-400" />
          <span className="text-xs">Ethereum</span>
        </div>
      </div>

      <div className="bg-white/20 rounded-md p-2 flex justify-between items-center">
        <span className="text-xs">Amount</span>
        <span className="text-xs">1.25 SOL</span>
      </div>
    </div>
    <div className="mt-3 bg-white/30 rounded-md py-1.5 px-4 text-xs font-medium w-full text-center">
      Bridge Assets
    </div>
  </div>
);

const SolanaPreview = () => (
  <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Solana</title>
        <path d="M5 8.5L16 8.5L19 11.5L5 11.5L5 8.5Z" fill="white" />
        <path d="M5 15.5L16 15.5L19 12.5L5 12.5L5 15.5Z" fill="white" />
        <path d="M5 5.5L16 5.5L19 2.5L5 2.5L5 5.5Z" fill="white" />
      </svg>
      Solana
    </div>
    <div className="w-full bg-white/10 rounded-md p-2 mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white/80">Network</span>
        <span className="text-xs font-medium">Mainnet</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/80">TPS</span>
        <span className="text-xs font-medium">3,400</span>
      </div>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium w-full text-center">
      Connect to Solana
    </div>
  </div>
);

const DashboardPreview = () => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Dashboard</div>
    <div className="grid grid-cols-2 gap-1.5 w-full mb-2">
      <div className="bg-white/10 rounded-md p-1.5 text-[10px] flex flex-col">
        <span className="text-gray-300">Assets</span>
        <span>2.45 SOL</span>
      </div>
      <div className="bg-white/10 rounded-md p-1.5 text-[10px] flex flex-col">
        <span className="text-gray-300">Value</span>
        <span>$223.80</span>
      </div>
      <div className="bg-white/10 rounded-md p-1.5 text-[10px] flex flex-col">
        <span className="text-gray-300">Yield</span>
        <span>+5.2%</span>
      </div>
      <div className="bg-white/10 rounded-md p-1.5 text-[10px] flex flex-col">
        <span className="text-gray-300">NFTs</span>
        <span>3</span>
      </div>
    </div>
    <div className="bg-white/20 rounded-md py-1 px-3 text-xs font-medium w-full text-center">
      View Dashboard
    </div>
  </div>
);

const ReceivePreview = () => (
  <div className="bg-gradient-to-br from-green-600 to-emerald-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Receive</div>
    <div className="bg-white/30 p-2 rounded-md mb-2 flex items-center justify-center w-full aspect-square">
      <div className="w-3/4 h-3/4 bg-white grid grid-cols-4 grid-rows-4 gap-0.5">
        {/* Simple QR code representation */}
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-white" />
        <div className="bg-white" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-white" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
        <div className="bg-black" />
      </div>
    </div>
    <div className="text-xs text-center text-white/80 mb-2 w-full overflow-hidden whitespace-nowrap">
      3Fg...k7RX
    </div>
    <div className="bg-white/20 rounded-md py-1 px-3 text-xs font-medium w-full text-center">
      Copy Address
    </div>
  </div>
);

const FramePreview = () => (
  <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Frame</div>
    <div className="bg-white/20 rounded-md p-2 w-full mb-2 flex flex-col items-center gap-1">
      <div className="w-full h-3 bg-white/20 rounded" />
      <div className="w-3/4 h-2 bg-white/20 rounded" />
    </div>
    <div className="flex w-full gap-1.5 mb-2">
      <div className="bg-white/30 rounded-md py-1 px-2 text-xs font-medium flex-1 text-center" />
      ❤️
      <div className="bg-white/30 rounded-md py-1 px-2 text-xs font-medium flex-1 text-center" />
      🔄
      <div className="bg-white/30 rounded-md py-1 px-2 text-xs font-medium flex-1 text-center" />
      💬
    </div>
    <div className="bg-white/20 rounded-md py-1 px-3 text-xs font-medium w-full text-center">
      Create Frame
    </div>
  </div>
);

const BlankPreview = () => (
  <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2">Empty Block</div>
    <div className="bg-white/10 rounded-md p-4 w-full mb-2 flex flex-col items-center">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Add Content</title>
        <path
          d="M12 5V19M5 12H19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div className="bg-white/20 rounded-md py-1 px-3 text-xs font-medium w-full text-center">
      Add Content
    </div>
  </div>
);

const ButtonPreview = () => (
  <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
    <Button className="bg-[#9945FF] text-white rounded-md py-1.5 px-3 text-sm">
      Primary
    </Button>
    <Button className="border border-gray-200 rounded-md py-1.5 px-3 text-sm dark:border-gray-700">
      Secondary
    </Button>
  </div>
);

const WalletPreview = () => (
  <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Wallet</title>
        <rect
          x="3"
          y="6"
          width="18"
          height="15"
          rx="2"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M16 14C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12C15.4477 12 15 12.4477 15 13C15 13.5523 15.4477 14 16 14Z"
          fill="white"
        />
        <path
          d="M3 10L7 6M7 6L11 3M7 6L11 9"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Wallet
    </div>
    <div className="w-full bg-white/10 rounded-md p-2 mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-white/80">Balance</span>
        <span className="text-xs font-medium">1.45 SOL</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/80">Address</span>
        <span className="text-xs font-mono tracking-tighter">3Fg...k7RX</span>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-1 w-full mb-1">
      <div className="bg-white/20 rounded-md p-1 flex flex-col items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Send</title>
          <path
            d="M12 5V19M5 12H19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[10px] mt-0.5">Send</span>
      </div>
      <div className="bg-white/20 rounded-md p-1 flex flex-col items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Receive</title>
          <path
            d="M12 5V19M5 12H19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="rotate(45 12 12)"
          />
        </svg>
        <span className="text-[10px] mt-0.5">Receive</span>
      </div>
      <div className="bg-white/20 rounded-md p-1 flex flex-col items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>More</title>
          <path
            d="M7 10L12 15L17 10"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[10px] mt-0.5">More</span>
      </div>
    </div>
  </div>
);

const StakePreview = () => (
  <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-bold mb-2">Stake</div>
    <div className="bg-white/20 rounded-md p-1.5 text-xs w-full mb-2 flex justify-between">
      <span>APY:</span>
      <span>5.2%</span>
    </div>
    <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-bold">
      Stake SOL
    </div>
  </div>
);

const AccordionPreview = () => (
  <div className="flex flex-col w-full gap-1">
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2 flex justify-between items-center bg-gray-50 dark:bg-gray-900 text-white">
      <span className="text-xs font-medium">Section 1</span>
      <span>▼</span>
    </div>
    <div className="border border-gray-200 dark:border-gray-700 rounded-md p-2 flex justify-between items-center text-white">
      <span className="text-xs font-medium">Section 2</span>
      <span>▶</span>
    </div>
  </div>
);

const CardPreview = () => (
  <div className="border border-gray-200 dark:border-gray-800 rounded-md overflow-hidden w-32 scale-90">
    <div className="bg-gray-100 dark:bg-gray-800 p-2 text-xs font-medium">
      Card Header
    </div>
    <div className="p-2 text-xs">Card content...</div>
  </div>
);

const HeroPreview = () => (
  <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-bold mb-1">Hero Title</div>
    <div className="text-xs mb-2 text-center">Subtitle text goes here</div>
    <div className="flex gap-1">
      <div className="bg-white/30 rounded-md py-0.5 px-2 text-xs font-medium">
        Button 1
      </div>
      <div className="bg-white rounded-md py-0.5 px-2 text-xs font-medium text-[#9945FF]">
        Button 2
      </div>
    </div>
  </div>
);

const LendPreview = () => (
  <div className="bg-gradient-to-br from-teal-600 to-emerald-400 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
    <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Lend</title>
        <path
          d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Lend
    </div>
    <div className="w-full bg-white/20 rounded-md p-2 mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-white mr-1.5" />
          <span className="text-xs">SOL</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-medium">2.0 SOL</span>
          <span className="text-[10px] text-white/70">≈ $41.20</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/80">APY</span>
        <span className="text-xs font-medium text-green-300">5.2%</span>
      </div>
    </div>
    <div className="mt-auto flex gap-1 w-full">
      <div className="bg-white/30 rounded-md py-1 flex-1 flex items-center justify-center">
        <span className="text-xs font-medium">Supply</span>
      </div>
      <div className="bg-white/10 rounded-md py-1 flex-1 flex items-center justify-center">
        <span className="text-xs font-medium">Withdraw</span>
      </div>
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
  lendDemo: <LendPreview />,
  nftDemo: <NFTPreview />,
  bridgeDemo: <BridgePreview />,
  solanaDemo: <SolanaPreview />,
  receiveDemo: <ReceivePreview />,
  frameDemo: <FramePreview />,
  blankDemo: <BlankPreview />,
  transferDemo: (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
      <div className="text-sm font-medium mb-2">Transfer</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-full text-center mb-2">
        SOL
      </div>
      <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">
        Send
      </div>
    </div>
  ),
  borrowDemo: (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-md flex flex-col items-center justify-center w-full h-full text-white">
      <div className="text-sm font-medium mb-2">Borrow</div>
      <div className="bg-white/20 rounded-md p-1.5 text-xs w-full text-center mb-2">
        1.5 SOL
      </div>
      <div className="bg-white/30 rounded-md py-1 px-3 text-xs font-medium">
        Borrow
      </div>
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
        <div className="bg-gray-200 dark:bg-gray-800 rounded-sm py-0.5 px-1 text-[8px]">
          Cancel
        </div>
        <div className="bg-[#9945FF] rounded-sm py-0.5 px-1 text-[8px] text-white">
          OK
        </div>
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
  ),
};

// Helper function to get a preview by registry item name
export function getPreviewForItem(name: string): React.ReactNode {
  return previewRegistry[name] || null;
}

// Function to apply previews to registry items
export function applyPreviewsToRegistry(
  items: (Block | Component | UIPrimitive)[],
) {
  return items.map((item) => ({
    ...item,
    preview: previewRegistry[item.name] || null,
  }));
}
