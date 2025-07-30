import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// Default to devnet for development
export const network = WalletAdapterNetwork.Devnet;

// Create a Solana connection
export const connection = new Connection(clusterApiUrl(network), 'confirmed');

// Format a wallet address for display (e.g. "7YWW...XrYZ")
export function formatWalletAddress(address: string | undefined | null): string {
  if (!address) return '';
  
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

// Format SOL amount with proper decimals
export function formatSolAmount(lamports: number): string {
  return (lamports / LAMPORTS_PER_SOL).toFixed(2);
}

// Get SOL balance for a wallet address
export async function getSolBalance(walletAddress: string | undefined): Promise<number> {
  if (!walletAddress) return 0;
  
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting SOL balance:', error);
    return 0;
  }
}

// Convert SOL to lamports
export function solToLamports(sol: number): number {
  return sol * LAMPORTS_PER_SOL;
}

// Check if an address is a valid Solana address
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
}
