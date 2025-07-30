/**
 * Solancn UI - Shared Types
 * This file contains all shared type definitions used across the Solancn UI project
 */

// ==========================================
// Network & Connection Types
// ==========================================

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
 * Network Configuration Interface
 */
export interface NetworkConfig {
  ENDPOINT: string;
  CONFIRMATION: ConfirmationLevelType;
  NAME: string;
  COMMITMENT: ConfirmationLevelType;
}

// ==========================================
// Validator & Staking Types
// ==========================================

/**
 * Staking Type Definition
 */
export type StakingType = 'native' | 'liquid';

/**
 * Stake Status Type Definition
 */
export type StakeStatusType = 'active' | 'activating' | 'deactivating' | 'inactive';

/**
 * Validator Interface Definition
 */
export interface Validator {
  id: string;
  name: string;
  imageUrl: string;
  commission: number;
  apy: number;
  identity: string;
  voteAccount: string;
  totalStake: number;
  activatedStake: number;
}

/**
 * Stake History Item Interface Definition
 */
export interface StakeHistoryItem {
  id: string;
  type: 'stake' | 'unstake';
  amount: number;
  validatorName: string;
  validatorId: string;
  timestamp: string;
  status: StakeStatusType;
  rewards: number;
  txHash: string;
}

/**
 * Network Stats Interface Definition
 */
export interface NetworkStats {
  AVERAGE_APY: number;
  TOTAL_STAKED: number;
  ACTIVE_VALIDATORS: number;
  AVERAGE_COMMISSION: number;
}

// ==========================================
// UI Component Types
// ==========================================

/**
 * Main Tab Type Definition
 */
export type TabType = 'swap' | 'stake' | 'portfolio' | 'transfer' | 'receive';

/**
 * Staking Tab Type Definition
 */
export type StakingTabType = 'stake' | 'unstake' | 'history';

/**
 * View Mode Type Definition
 */
export type ViewModeType = 'grid' | 'row';

/**
 * Animation constants type
 */
export type AnimationType = 'DEFAULT_TRANSITION' | 'FAST_TRANSITION' | 'TOAST_DURATION';

/**
 * Layout constants type
 */
export type LayoutType = 'SIDEBAR_WIDTH' | 'HEADER_HEIGHT' | 'CONTENT_MAX_WIDTH' | 'FOOTER_HEIGHT' | 'MOBILE_BREAKPOINT';

/**
 * Modal constants type
 */
export type ModalType = 'DEFAULT_WIDTH' | 'SMALL_WIDTH' | 'LARGE_WIDTH';

/**
 * Loading constants type
 */
export type LoadingType = 'DEFAULT_TIMEOUT' | 'FAST_LOADING_THRESHOLD' | 'MIN_DISPLAY_TIME';

/**
 * Wallet Display constants type
 */
export type WalletDisplayType = 'SHORT_ADDRESS_CHARS' | 'DEFAULT_DECIMALS';

// ==========================================
// Wallet & Transaction Types
// ==========================================

/**
 * Wallet Status Type
 */
export type WalletStatusType = 'connected' | 'disconnected' | 'connecting' | 'error';

/**
 * User Balance Interface
 */
export interface UserBalance {
  sol: number;
  tokens: TokenInfo[];
  stakedSol: number;
  totalValueUsd: number;
}

/**
 * Token Information Interface
 */
export interface TokenInfo {
  mint: string;
  symbol: string;
  name: string;
  amount: number;
  decimals: number;
  usdValue: number;
  iconUrl?: string;
}

/**
 * Transaction Type Definition
 */
export type TransactionType = 'send' | 'receive' | 'swap' | 'stake' | 'unstake' | 'other';

/**
 * Transaction Status Type
 */
export type TransactionStatus = 'confirmed' | 'processing' | 'failed';

/**
 * Transaction Information Interface
 */
export interface TransactionInfo {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  signature: string;
  fromAddress?: string;
  toAddress?: string;
  amount: number;
  fee: number;
  timestamp: string;
  tokenInfo?: TokenInfo;
}

/**
 * Portfolio Asset Interface
 */
export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  usdValue: number;
  percentChange24h: number;
  iconUrl?: string;
}

/**
 * Swap Information Interface
 */
export interface SwapInfo {
  fromToken: TokenInfo;
  toToken: TokenInfo;
  fromAmount: number;
  toAmount: number;
  slippage: number;
  fee: number;
  priceImpact: number;
  route?: string[];
}

/**
 * Theme Mode Type
 */
export type ThemeMode = 'light' | 'dark' | 'system';