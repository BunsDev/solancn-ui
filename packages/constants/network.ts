/**
 * Network Type Definition
 * Types of Solana networks
 */
export type NetworkType = 'MAINNET' | 'DEVNET' | 'TESTNET' | 'LOCALNET';

/**
 * Confirmation Level Type Definition
 */
export type ConfirmationLevelType = 'finalized' | 'confirmed' | 'processed';

/**
 * Explorer Type Definition
 */
export type ExplorerType = 'SOLSCAN' | 'EXPLORER';

/**
 * Solana Network Endpoints
 * Various network endpoint URLs for Solana blockchain
 */
export const NETWORK_ENDPOINTS: Record<NetworkType, string> = {
  MAINNET: 'https://api.mainnet-beta.solana.com',
  DEVNET: 'https://api.devnet.solana.com',
  TESTNET: 'https://api.testnet.solana.com',
  LOCALNET: 'http://localhost:8899',
};

/**
 * Network Names
 * User-friendly display names for the networks
 */
export const NETWORK_NAMES: Record<NetworkType, string> = {
  MAINNET: 'Mainnet Beta',
  DEVNET: 'Devnet',
  TESTNET: 'Testnet',
  LOCALNET: 'Localhost',
};

/**
 * Network Explorer URLs
 * Base URLs for the Solana explorers
 */
export const EXPLORER_URLS: Record<ExplorerType, Record<Extract<NetworkType, 'MAINNET' | 'DEVNET'>, string>> = {
  SOLSCAN: {
    MAINNET: 'https://solscan.io',
    DEVNET: 'https://solscan.io/?cluster=devnet',
  },
  EXPLORER: {
    MAINNET: 'https://explorer.solana.com',
    DEVNET: 'https://explorer.solana.com/?cluster=devnet',
  },
};

/**
 * Default Transaction Confirmation Levels
 */
export const CONFIRMATION_LEVELS: Record<string, ConfirmationLevelType> = {
  FINALIZED: 'finalized',
  CONFIRMED: 'confirmed',
  PROCESSED: 'processed',
};

/**
 * Network Configuration Interface
 */
export interface NetworkConfig {
  ENDPOINT: string;
  CONFIRMATION: ConfirmationLevelType;
  NAME: string;
  COMMITMENT: ConfirmationLevelType;
}

/**
 * Default Network Configuration
 */
export const DEFAULT_NETWORK_CONFIG: NetworkConfig = {
  ENDPOINT: NETWORK_ENDPOINTS.DEVNET,
  CONFIRMATION: CONFIRMATION_LEVELS.FINALIZED,
  NAME: NETWORK_NAMES.DEVNET,
  COMMITMENT: CONFIRMATION_LEVELS.FINALIZED,
};
