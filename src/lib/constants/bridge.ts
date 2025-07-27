// Token interface
export interface BridgeToken {
  symbol: string;
  name: string;
  logo: string;
  balance: number;
  decimals: number;
  address: string;
  network:
    | "solana"
    | "ethereum"
    | "bitcoin"
    | "polygon"
    | "avalanche"
    | "optimism";
}

// Network interface
export interface BridgeNetwork {
  name: string;
  chainId: string;
  logo: string;
  nativeCurrency: string;
  isTestnet: boolean;
  blockExplorerUrl: string;
}

// Preset amounts for quick selection
export const BRIDGE_PRESET_AMOUNTS = [0.1, 1, 10, 100];

// Sample networks
export const BRIDGE_NETWORKS: Record<string, BridgeNetwork> = {
  solana: {
    name: "Solana",
    chainId: "solana",
    logo: "/logos/tokens/sol.png",
    nativeCurrency: "SOL",
    isTestnet: false,
    blockExplorerUrl: "https://explorer.solana.com",
  },
  ethereum: {
    name: "Ethereum",
    chainId: "1",
    logo: "/logos/tokens/eth.png",
    nativeCurrency: "ETH",
    isTestnet: false,
    blockExplorerUrl: "https://etherscan.io",
  },
  avalanche: {
    name: "Avalanche",
    chainId: "43114",
    logo: "/logos/tokens/avax.png",
    nativeCurrency: "AVAX",
    isTestnet: false,
    blockExplorerUrl: "https://snowtrace.io",
  },
};

// Sample tokens
export const BRIDGE_SAMPLE_TOKENS: BridgeToken[] = [
  {
    symbol: "SOL",
    name: "Solana",
    logo: "/logos/tokens/sol.png",
    balance: 10.5,
    decimals: 9,
    address: "native",
    network: "solana",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "/logos/tokens/usdc.png",
    balance: 250.75,
    decimals: 6,
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    network: "solana",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "/logos/tokens/eth.png",
    balance: 1.2,
    decimals: 18,
    address: "native",
    network: "ethereum",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    logo: "/logos/tokens/avax.png",
    balance: 100,
    decimals: 18,
    address: "native",
    network: "avalanche",
  },
];
