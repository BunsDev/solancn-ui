import { Transaction } from "./types";

// Generate a random Solana-like signature
const generateSignature = (): string => {
  const characters = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let signature = '';
  for (let i = 0; i < 88; i += 1) {
    signature += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return signature;
};

// Generate realistic Solana wallet addresses
const generateAddress = (): string => {
  const characters = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let address = '';
  for (let i = 0; i < 44; i += 1) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
};

// Random program IDs for various Solana programs
const programIds = {
  systemProgram: '11111111111111111111111111111111',
  tokenProgram: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  stakeProgram: 'Stake11111111111111111111111111111111111111',
  memoProgram: 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr',
  swapProgram: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5dA1eTsy6',
};

// Fixed Solana wallet addresses for user and common interactions
const addresses = {
  userWallet: 'EYGgx5fYCZtLN2pvnR4Bhn5KpYRtz1YL6aQXTvPZ9PbR',
  stakeValidator: 'Stake11111111111111111111111111111111111111',
  exchangeWallet: '9vdAUdX3r8sJLZhLU5K3QsLJ7fMwWhDC2QzvrLNrGJni',
  swapPool: 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5dA1eTsy6',
};

// Helper function to create a transaction with default values
const createTransaction = (partialTx: Partial<Transaction>): Transaction => ({
  id: generateSignature().substring(0, 10), // Shorter ID for convenience
  signature: generateSignature(),
  type: 'transfer',
  status: 'confirmed',
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)), // Random date within last 30 days
  description: 'SOL Transfer',
  amount: 0,
  token: 'SOL',
  fee: 0.000005,
  blockHeight: 200000000 + Math.floor(Math.random() * 5000000),
  ...partialTx,
});

// Create mock transactions with realistic data
export const mockTransactions: Transaction[] = [
  // Most recent transaction - pending SOL transfer
  createTransaction({
    type: 'transfer',
    status: 'pending',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    description: 'SOL Transfer to Wallet',
    amount: 1.5,
    token: 'SOL',
    sender: addresses.userWallet,
    recipient: generateAddress(),
    programId: programIds.systemProgram,
  }),

  // Confirmed transactions
  createTransaction({
    type: 'swap',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    description: 'Swap SOL to USDC',
    amount: 2.75,
    token: 'SOL',
    sender: addresses.userWallet,
    recipient: addresses.swapPool,
    programId: programIds.swapProgram,
  }),

  createTransaction({
    type: 'receive',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    description: 'Received SOL from Wallet',
    amount: 0.25,
    token: 'SOL',
    sender: generateAddress(),
    recipient: addresses.userWallet,
    programId: programIds.systemProgram,
  }),

  createTransaction({
    type: 'stake',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    description: 'Stake SOL with Validator',
    amount: 10,
    token: 'SOL',
    sender: addresses.userWallet,
    recipient: addresses.stakeValidator,
    programId: programIds.stakeProgram,
  }),

  // Failed transaction
  createTransaction({
    type: 'send',
    status: 'failed',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    description: 'Failed SOL Transfer',
    amount: 5.25,
    token: 'SOL',
    sender: addresses.userWallet,
    recipient: generateAddress(),
    programId: programIds.systemProgram,
  }),

  // More transactions with various types
  createTransaction({
    type: 'unstake',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    description: 'Unstake SOL from Validator',
    amount: 8.5,
    token: 'SOL',
    sender: addresses.stakeValidator,
    recipient: addresses.userWallet,
    programId: programIds.stakeProgram,
  }),

  createTransaction({
    type: 'mint',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    description: 'Mint NFT Collection Item',
    sender: addresses.userWallet,
    programId: programIds.tokenProgram,
  }),

  createTransaction({
    type: 'swap',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    description: 'Swap USDC to SOL',
    amount: 50,
    token: 'USDC',
    sender: addresses.userWallet,
    recipient: addresses.swapPool,
    programId: programIds.swapProgram,
  }),

  // Another pending transaction
  createTransaction({
    type: 'transfer',
    status: 'pending',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    description: 'SOL Transfer to Exchange',
    amount: 3.2,
    token: 'SOL',
    sender: addresses.userWallet,
    recipient: addresses.exchangeWallet,
    programId: programIds.systemProgram,
  }),

  // Another failed transaction
  createTransaction({
    type: 'vote',
    status: 'failed',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    description: 'Vote Transaction',
    sender: addresses.userWallet,
    programId: programIds.systemProgram,
  }),

  // Older transactions
  createTransaction({
    type: 'receive',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    description: 'Received SOL from Faucet',
    amount: 1,
    token: 'SOL',
    sender: generateAddress(),
    recipient: addresses.userWallet,
    programId: programIds.systemProgram,
  }),

  createTransaction({
    type: 'transfer',
    status: 'confirmed',
    timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    description: 'SOL Transfer to Wallet',
    amount: 0.5,
    token: 'SOL',
    sender: addresses.userWallet,
    recipient: generateAddress(),
    programId: programIds.systemProgram,
  }),
];
