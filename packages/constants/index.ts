// Constants package for Solana UI components
// Export all constants from this file

// Export constants from individual files
export * from './colors';

// Export network constants but not duplicate types (now in types.ts)
import {
  NETWORK_ENDPOINTS,
  NETWORK_NAMES,
  EXPLORER_URLS,
  CONFIRMATION_LEVELS,
  DEFAULT_NETWORK_CONFIG
} from './network';

export {
  NETWORK_ENDPOINTS,
  NETWORK_NAMES,
  EXPLORER_URLS,
  CONFIRMATION_LEVELS,
  DEFAULT_NETWORK_CONFIG
};

// Export all types from types.ts (centralized type definitions)
export * from './types';

// Export UI constants but not duplicate types (now in types.ts)
import {
  TABS,
  STAKING_TABS,
  ANIMATIONS,
  LAYOUT,
  MODALS,
  VIEW_MODES,
  LOADING,
  WALLET_DISPLAY
} from './ui';

export {
  TABS,
  STAKING_TABS,
  ANIMATIONS,
  LAYOUT,
  MODALS,
  VIEW_MODES,
  LOADING,
  WALLET_DISPLAY
};

// Export validator constants but not duplicate types (now in types.ts)
import {
  STAKING_TYPES,
  STAKE_STATUS,
  DEFAULT_VALIDATOR_VALUES,
  DUMMY_VALIDATORS,
  DUMMY_STAKE_HISTORY,
  NETWORK_STATS
} from './validators';

export {
  STAKING_TYPES,
  STAKE_STATUS,
  DEFAULT_VALIDATOR_VALUES,
  DUMMY_VALIDATORS,
  DUMMY_STAKE_HISTORY,
  NETWORK_STATS
};
