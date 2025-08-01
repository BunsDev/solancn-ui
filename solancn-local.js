#!/usr/bin/env node

/**
 * Solancn CLI with Local Registry
 * 
 * This script starts a local registry server and configures the Solancn CLI
 * to use it for fetching components.
 */

const { spawn } = require('child_process');
const path = require('path');
// Configuration
const REGISTRY_PORT = 3333;
const REGISTRY_URL = `http://localhost:${REGISTRY_PORT}`;

// Print banner
console.log(`
┌─────────────────────────────────────────────────┐
│                                                 │
│   Solancn CLI with Local Registry                │
│                                                 │
│   Starting local registry server...                │
│                                                 │
└─────────────────────────────────────────────────┘
`);

// Start the local registry server
const serverProcess = spawn('node', [path.join(__dirname, 'local-registry-server.js')], {
  detached: true,
  stdio: 'inherit'
});

// Give the server a moment to start
setTimeout(() => {
  // Run the CLI command with the local registry URL
  const args = process.argv.slice(2);
  
  // Set environment variables for the CLI
  const env = {
    ...process.env,
    COMPONENTS_REGISTRY_URL: REGISTRY_URL
  };

  // Run the Solancn CLI with the local registry URL
  const cliProcess = spawn('node', [path.join(__dirname, 'solancn', 'dist', 'index.js'), ...args], {
    stdio: 'inherit',
    env
  });

  // Handle CLI process exit
  cliProcess.on('exit', (code) => {
    // Kill the server process when the CLI exits
    process.kill(-serverProcess.pid);
    process.exit(code);
  });
}, 1000); // Wait 1 second for server to start

// Handle script termination
process.on('SIGINT', () => {
  try {
    // Kill the server process when the script is terminated
    process.kill(-serverProcess.pid);
  } catch (err) {
    // Ignore errors when killing the process
  }
  process.exit(0);
});
