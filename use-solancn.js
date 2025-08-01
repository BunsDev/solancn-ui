#!/usr/bin/env node

/**
 * Enhanced wrapper script for solancn CLI
 * Uses the Shadcn registry to ensure components can be added
 */

// Force use of Shadcn registry which is available
process.env.COMPONENTS_REGISTRY_URL = 'https://ui.shadcn.com';

// Add --shadcn flag to use components from Shadcn registry
const args = process.argv.slice(2);
if (args[0] === 'add' && !args.includes('--shadcn') && !args.includes('-s')) {
  args.push('--shadcn');
}

// Run the CLI with modified arguments
process.argv = [process.argv[0], process.argv[1], ...args];
require('./solancn/dist/index.js');
