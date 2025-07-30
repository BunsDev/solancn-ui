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

/**
 * Validator Staking Types
 * Different staking methods available in the UI
 */
export const STAKING_TYPES: Record<string, StakingType> = {
  NATIVE: 'native',
  LIQUID: 'liquid',
};

/**
 * Staking Status Types
 * Different statuses for staking transactions
 */
export const STAKE_STATUS: Record<string, StakeStatusType> = {
  ACTIVE: 'active',
  ACTIVATING: 'activating',
  DEACTIVATING: 'deactivating',
  INACTIVE: 'inactive',
};

/**
 * Default values for validator display
 */
export const DEFAULT_VALIDATOR_VALUES = {
  MIN_COMMISSION: 0,
  MAX_COMMISSION: 100,
  DEFAULT_MIN_STAKE_AMOUNT: 0.001, // SOL
  DEFAULT_MAX_STAKE_AMOUNT: 1000000, // SOL
};

/**
 * Dummy validators data for development
 */
export const DUMMY_VALIDATORS: Validator[] = [
  {
    id: 'validator-1',
    name: 'Mainnet Validator 1',
    imageUrl: 'https://example.com/validator1.png',
    commission: 5, // %
    apy: 7.2, // %
    identity: 'Va1idator1dentity1111111111111111111111111',
    voteAccount: 'Vote1111111111111111111111111111111111111111',
    totalStake: 1250000, // SOL
    activatedStake: 1230000, // SOL
  },
  {
    id: 'validator-2',
    name: 'Solana Foundation',
    imageUrl: 'https://example.com/validator2.png',
    commission: 0, // %
    apy: 6.8, // %
    identity: 'Va1idator1dentity2222222222222222222222222',
    voteAccount: 'Vote2222222222222222222222222222222222222222',
    totalStake: 2450000, // SOL
    activatedStake: 2450000, // SOL
  },
  {
    id: 'validator-3',
    name: 'Chorus One',
    imageUrl: 'https://example.com/validator3.png',
    commission: 7, // %
    apy: 7.1, // %
    identity: 'Va1idator1dentity3333333333333333333333333',
    voteAccount: 'Vote3333333333333333333333333333333333333333',
    totalStake: 1850000, // SOL
    activatedStake: 1845000, // SOL
  },
];

/**
 * Dummy staking history for development
 */
export const DUMMY_STAKE_HISTORY: StakeHistoryItem[] = [
  {
    id: 'tx-1',
    type: 'stake',
    amount: 10.5,
    validatorName: 'Mainnet Validator 1',
    validatorId: 'validator-1',
    timestamp: '2025-07-20T12:30:45Z',
    status: STAKE_STATUS.ACTIVE,
    rewards: 0.023,
    txHash: 'tx11111111111111111111111111111111111111111111',
  },
  {
    id: 'tx-2',
    type: 'unstake',
    amount: 5.2,
    validatorName: 'Solana Foundation',
    validatorId: 'validator-2',
    timestamp: '2025-07-15T09:22:15Z',
    status: STAKE_STATUS.INACTIVE,
    rewards: 0.31,
    txHash: 'tx22222222222222222222222222222222222222222222',
  },
  {
    id: 'tx-3',
    type: 'stake',
    amount: 15.75,
    validatorName: 'Chorus One',
    validatorId: 'validator-3',
    timestamp: '2025-06-28T18:45:33Z',
    status: STAKE_STATUS.ACTIVE,
    rewards: 0.45,
    txHash: 'tx33333333333333333333333333333333333333333333',
  },
];

/**
 * Network statistics for staking page display
 */
export const NETWORK_STATS: NetworkStats = {
  AVERAGE_APY: 6.9, // %
  TOTAL_STAKED: 372850000, // SOL
  ACTIVE_VALIDATORS: 1780,
  AVERAGE_COMMISSION: 7.2, // %
};
