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
 * UI Tabs Configuration
 * Defines the tabs used in the main navigation
 */
export const TABS: Record<string, TabType> = {
  SWAP: 'swap',
  STAKE: 'stake',
  PORTFOLIO: 'portfolio',
  TRANSFER: 'transfer',
  RECEIVE: 'receive',
};

/**
 * Staking Tab Types
 * Different tab views in the staking page
 */
export const STAKING_TABS: Record<string, StakingTabType> = {
  STAKE: 'stake',
  UNSTAKE: 'unstake',
  HISTORY: 'history',
};

/**
 * Animation durations and timings
 */
export const ANIMATIONS = {
  DEFAULT_TRANSITION: '0.3s ease',
  FAST_TRANSITION: '0.15s ease',
  TOAST_DURATION: 4000, // ms
} as const;

/**
 * Layout Constants
 */
export const LAYOUT = {
  SIDEBAR_WIDTH: '260px',
  HEADER_HEIGHT: '64px',
  CONTENT_MAX_WIDTH: '1200px',
  FOOTER_HEIGHT: '60px',
  MOBILE_BREAKPOINT: '768px',
} as const;

/**
 * Dialog and Modal Constants
 */
export const MODALS = {
  DEFAULT_WIDTH: '500px',
  SMALL_WIDTH: '360px',
  LARGE_WIDTH: '680px',
} as const;

/**
 * View Mode Options
 */
export const VIEW_MODES: Record<string, ViewModeType> = {
  GRID: 'grid',
  ROW: 'row',
};

/**
 * Loading and Timing Constants
 */
export const LOADING = {
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  FAST_LOADING_THRESHOLD: 300, // ms
  MIN_DISPLAY_TIME: 500, // ms - minimum time to show loading states
} as const;

/**
 * Wallet display options
 */
export const WALLET_DISPLAY = {
  SHORT_ADDRESS_CHARS: 4, // Number of characters to display for shortened wallet addresses
  DEFAULT_DECIMALS: 4, // Default decimal places for SOL amount display
} as const;

/**
 * Type for Animation constants
 */
export type AnimationType = keyof typeof ANIMATIONS;

/**
 * Type for Layout constants
 */
export type LayoutType = keyof typeof LAYOUT;

/**
 * Type for Modal constants
 */
export type ModalType = keyof typeof MODALS;

/**
 * Type for Loading constants
 */
export type LoadingType = keyof typeof LOADING;

/**
 * Type for Wallet Display constants
 */
export type WalletDisplayType = keyof typeof WALLET_DISPLAY;
