/**
 * Solana Brand Colors
 * Main color palette used across the Solana UI components
 */
export const SOLANA_COLORS = {
  // Main brand colors
  PURPLE: '#9945FF',
  GREEN: '#14F195',
  BLACK: '#000000',
  
  // Opacity variants
  PURPLE_10: 'rgba(153, 69, 255, 0.1)',
  PURPLE_20: 'rgba(153, 69, 255, 0.2)',
  PURPLE_40: 'rgba(153, 69, 255, 0.4)',
  PURPLE_80: 'rgba(153, 69, 255, 0.8)',
  
  GREEN_10: 'rgba(20, 241, 149, 0.1)',
  GREEN_20: 'rgba(20, 241, 149, 0.2)',
} as const;

// Type definition for Solana colors
export type SolanaColorType = keyof typeof SOLANA_COLORS;

/**
 * UI State Colors
 * Colors for different UI states across the application
 */
export const UI_STATE_COLORS = {
  SUCCESS: '#14F195', // Same as Solana Green
  WARNING: '#FF9F1C',
  ERROR: '#FF4A4A',
  INFO: '#9945FF', // Same as Solana Purple
} as const;

// Type definition for UI state colors
export type UiStateColorType = keyof typeof UI_STATE_COLORS;

/**
 * Semantic Color Mapping
 * Maps functionality to specific colors
 */
export const SEMANTIC_COLORS = {
  // Button colors
  PRIMARY_BUTTON: SOLANA_COLORS.PURPLE,
  PRIMARY_BUTTON_HOVER: SOLANA_COLORS.PURPLE_80,
  
  // Status indicators
  INSTALLED: SOLANA_COLORS.GREEN,
  PENDING: '#FFC107', // Amber
  
  // Text colors
  LINK_TEXT: SOLANA_COLORS.PURPLE,
  SUCCESS_TEXT: SOLANA_COLORS.GREEN,
} as const;

// Type definition for semantic colors
export type SemanticColorType = keyof typeof SEMANTIC_COLORS;

/**
 * Theme Gradients
 * Gradient color definitions for UI components
 */
export const GRADIENTS = {
  PRIMARY_GRADIENT: `linear-gradient(to bottom right, ${SOLANA_COLORS.PURPLE_10}, ${SOLANA_COLORS.GREEN_10})`,
  PRIMARY_GRADIENT_DARK: `linear-gradient(to bottom right, ${SOLANA_COLORS.PURPLE_20}, ${SOLANA_COLORS.GREEN_20})`,
} as const;

// Type definition for gradients
export type GradientType = keyof typeof GRADIENTS;
