'use strict';

/**
 * UI Tabs Configuration
 * Defines the tabs used in the main navigation
 */
const TABS = {
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
const STAKING_TABS = {
  STAKE: 'stake',
  UNSTAKE: 'unstake',
  HISTORY: 'history',
};

/**
 * Animation durations and timings
 */
const ANIMATIONS = {
  DEFAULT_TRANSITION: '0.3s ease',
  FAST_TRANSITION: '0.15s ease',
  TOAST_DURATION: 4000, // ms
};

/**
 * Layout Constants
 */
const LAYOUT = {
  SIDEBAR_WIDTH: '260px',
  HEADER_HEIGHT: '64px',
  CONTENT_MAX_WIDTH: '1200px',
  FOOTER_HEIGHT: '60px',
  MOBILE_BREAKPOINT: '768px',
};

/**
 * Dialog and Modal Constants
 */
const MODALS = {
  DEFAULT_WIDTH: '500px',
  SMALL_WIDTH: '360px',
  LARGE_WIDTH: '680px',
};

/**
 * View Mode Options
 */
const VIEW_MODES = {
  GRID: 'grid',
  ROW: 'row',
};

/**
 * Loading and Timing Constants
 */
const LOADING = {
  DEFAULT_TIMEOUT: 30000, // 30 seconds
  FAST_LOADING_THRESHOLD: 300, // ms
  MIN_DISPLAY_TIME: 500, // ms - minimum time to show loading states
};

/**
 * Wallet display options
 */
const WALLET_DISPLAY = {
  SHORT_ADDRESS_CHARS: 4, // Number of characters to display for shortened wallet addresses
  DEFAULT_DECIMALS: 4, // Default decimal places for SOL amount display
};

module.exports = {
  TABS,
  STAKING_TABS,
  ANIMATIONS,
  LAYOUT,
  MODALS,
  VIEW_MODES,
  LOADING,
  WALLET_DISPLAY,
};
