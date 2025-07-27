// Token interface
export interface BridgeToken {
    symbol: string;
    name: string;
    logo: string;
    balance: number;
    decimals: number;
    address: string;
    network: "solana" | "ethereum" | "bitcoin" | "polygon" | "avalanche" | "optimism";
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
        logo: "https://phantom.app/img/chains/solana.png",
        nativeCurrency: "SOL",
        isTestnet: false,
        blockExplorerUrl: "https://explorer.solana.com",
    },
    ethereum: {
        name: "Ethereum",
        chainId: "1",
        logo: "https://phantom.app/img/chains/ethereum.png",
        nativeCurrency: "ETH",
        isTestnet: false,
        blockExplorerUrl: "https://etherscan.io",
    },
    polygon: {
        name: "Polygon",
        chainId: "137",
        logo: "https://phantom.app/img/chains/polygon.png",
        nativeCurrency: "MATIC",
        isTestnet: false,
        blockExplorerUrl: "https://polygonscan.com",
    },
};

// Sample tokens
export const BRIDGE_SAMPLE_TOKENS: BridgeToken[] = [
    {
        symbol: "SOL",
        name: "Solana",
        logo: "https://phantom.app/img/chains/solana.png",
        balance: 10.5,
        decimals: 9,
        address: "native",
        network: "solana",
    },
    {
        symbol: "USDC",
        name: "USD Coin",
        logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        balance: 250.75,
        decimals: 6,
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        network: "solana",
    },
    {
        symbol: "ETH",
        name: "Ethereum",
        logo: "https://phantom.app/img/chains/ethereum.png",
        balance: 1.2,
        decimals: 18,
        address: "native",
        network: "ethereum",
    },
    {
        symbol: "MATIC",
        name: "Polygon",
        logo: "https://phantom.app/img/chains/polygon.png",
        balance: 100,
        decimals: 18,
        address: "native",
        network: "polygon",
    },
];
