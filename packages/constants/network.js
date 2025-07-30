'use strict';

/**
 * Solana Network Endpoints
 * Various network endpoint URLs for Solana blockchain
 */
const NETWORK_ENDPOINTS = {
  MAINNET: 'https://api.mainnet-beta.solana.com',
  DEVNET: 'https://api.devnet.solana.com',
  TESTNET: 'https://api.testnet.solana.com',
  LOCALNET: 'http://localhost:8899',
};

/**
 * Network Names
 * User-friendly display names for the networks
 */
const NETWORK_NAMES = {
  MAINNET: 'Mainnet Beta',
  DEVNET: 'Devnet',
  TESTNET: 'Testnet',
  LOCALNET: 'Localhost',
};

/**
 * Network Explorer URLs
 * Base URLs for the Solana explorers
 */
const EXPLORER_URLS = {
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
const CONFIRMATION_LEVELS = {
  FINALIZED: 'finalized',
  CONFIRMED: 'confirmed',
  PROCESSED: 'processed',
};

/**
 * Default Network Configuration
 */
const DEFAULT_NETWORK_CONFIG = {
  ENDPOINT: NETWORK_ENDPOINTS.DEVNET,
  CONFIRMATION: CONFIRMATION_LEVELS.FINALIZED,
  NAME: NETWORK_NAMES.DEVNET,
  COMMITMENT: CONFIRMATION_LEVELS.FINALIZED,
};

module.exports = {
  NETWORK_ENDPOINTS,
  NETWORK_NAMES,
  EXPLORER_URLS,
  CONFIRMATION_LEVELS,
  DEFAULT_NETWORK_CONFIG,
};
