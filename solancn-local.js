#!/usr/bin/env node

/**
 * Solancn CLI with Local Registry
 * 
 * This script starts a local registry server and configures the Solancn CLI
 * to use it for fetching components. It also ensures the registry is properly
 * formatted by running the transform script before starting the server.
 */

const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const REGISTRY_PORT = 3333;
const REGISTRY_URL = `http://localhost:${REGISTRY_PORT}`;

// Print banner with Solana colors
console.log(`
┌─────────────────────────────────────────────────┐
│                                                 │
│   Solancn CLI with Local Registry                │
│                                                 │
│   Preparing registry components...               │
│                                                 │
└─────────────────────────────────────────────────┘
`);

// Ensure the registry is properly formatted by running the transform script
try {
  console.log('Transforming registry for CLI compatibility...');
  execSync('node src/utils/transform-registry.js', { stdio: 'inherit' });
  console.log('Registry transformation complete!\n');
} catch (error) {
  console.error('Failed to transform registry:', error);
  process.exit(1);
}

// Print available components
try {
  const transformedPath = path.join(__dirname, 'public/registry/transformed-index.json');
  const registryData = JSON.parse(fs.readFileSync(transformedPath, 'utf8'));
  console.log(`Available components (${registryData.length}):\n`);
  
  // Display components in a nice grid layout
  const componentsPerRow = 3;
  let componentRow = [];
  
  registryData.forEach((component, index) => {
    componentRow.push(component.name.padEnd(20));
    
    if ((index + 1) % componentsPerRow === 0 || index === registryData.length - 1) {
      console.log('  ' + componentRow.join(' '));
      componentRow = [];
    }
  });
  console.log('');
} catch (error) {
  console.error('Failed to list available components:', error);
}

console.log('Starting local registry server...');

// Start the local registry server
const serverProcess = spawn('node', [path.join(__dirname, 'local-registry-server.js')], {
  detached: true,
  stdio: 'pipe' // Capture output but don't show it to avoid clutter
});

// Wait for the server to be ready by checking for output
let serverOutput = '';
serverProcess.stdout && serverProcess.stdout.on('data', (data) => {
  serverOutput += data.toString();
  if (serverOutput.includes('Local registry running at:')) {
    startCli();
  }
});

// Give the server a moment to start, even if we don't see output
const startTimeout = setTimeout(startCli, 2000);

function startCli() {
  // Only start CLI once
  clearTimeout(startTimeout);
  startCli = () => {};
  
  console.log(`Local registry server running at ${REGISTRY_URL}\n`);
  console.log('Running Solancn CLI command...\n');
  
  // Run the CLI command with the local registry URL
  let args = process.argv.slice(2);
  
  // Automatically add --shadcn flag for add commands for better success rate
  if (args[0] === 'add' && !args.includes('--shadcn') && !args.includes('-s')) {
    console.log('Auto-adding --shadcn flag to use both local and Shadcn registries');
    args = [...args, '--shadcn'];
  }
  
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
    console.log('\nCleaning up...');
    // Kill the server process when the CLI exits
    try {
      process.kill(-serverProcess.pid);
    } catch (err) {
      // Ignore errors when killing the process
    }
    process.exit(code);
  });
}

// Handle script termination
process.on('SIGINT', () => {
  console.log('\nInterrupted. Cleaning up...');
  try {
    // Kill the server process when the script is terminated
    process.kill(-serverProcess.pid);
  } catch (err) {
    // Ignore errors when killing the process
  }
  process.exit(0);
});
