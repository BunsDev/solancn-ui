#!/usr/bin/env node

/**
 * Wrapper script for solancn CLI that enables TEST_MODE
 * This forces the CLI to use mock data instead of trying to access an external registry
 */

// Set TEST_MODE environment variable to true
process.env.TEST_MODE = 'true';

// Import and run the actual CLI
require('./solancn/dist/index.js');
