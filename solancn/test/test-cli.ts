#!/usr/bin/env node
/**
 * Interactive CLI Test Runner for Solancn
 * 
 * This utility provides an interactive way to test all CLI functionality
 * before publishing. It runs through a series of tests and provides visual
 * feedback on success/failure using Solana brand colors.
 */

import { execa } from 'execa';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import os from 'os';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import ora from 'ora';

// Solana brand colors
const SOLANA_PURPLE = '#9945FF';
const SOLANA_GREEN = '#14F195';
const SOLANA_BLACK = '#000000';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, '../dist/index.js');
const TEMP_TEST_DIR = path.join(os.tmpdir(), 'solancn-test-' + Date.now());

// Result tracking
const results = {
  total: 0,
  passed: 0,
  failed: 0,
};

// Helper for colored logging
const log = {
  info: (msg: string) => console.log(chalk.cyan(msg)),
  success: (msg: string) => console.log(chalk.hex(SOLANA_GREEN)(msg)),
  error: (msg: string) => console.log(chalk.hex(SOLANA_PURPLE).bgBlack(msg)),
  title: (msg: string) => console.log(chalk.bold.hex(SOLANA_PURPLE).bgBlack(`\n${msg}\n`)),
  result: (msg: string, success: boolean) => {
    if (success) {
      console.log(`${chalk.hex(SOLANA_GREEN)('✓')} ${msg}`);
    } else {
      console.log(`${chalk.hex(SOLANA_PURPLE)('✗')} ${chalk.red(msg)}`);
    }
  },
  summary: () => {
    const passRate = Math.round((results.passed / results.total) * 100);
    
    console.log('\n' + chalk.bold('Test Summary:'));
    console.log(`Total Tests: ${results.total}`);
    console.log(`${chalk.hex(SOLANA_GREEN)(`Passed: ${results.passed}`)}`);
    console.log(`${chalk.hex(SOLANA_PURPLE)(`Failed: ${results.failed}`)}`);
    console.log(`${chalk.bold(`Pass Rate: ${passRate}%`)}`);
    
    if (results.failed > 0) {
      console.log(chalk.yellow('\nSome tests failed. Review the output above for details.'));
      console.log(chalk.yellow('Fix issues before publishing the package.'));
    } else {
      console.log(chalk.hex(SOLANA_GREEN)('\n✓ All tests passed! Ready for publishing.'));
    }
  }
};

// Helper function to run CLI commands
async function runCommand(args: string[], cwd: string = TEMP_TEST_DIR) {
  try {
    const { stdout } = await execa('node', [CLI_PATH, ...args], {
      cwd,
      env: {
        NODE_ENV: 'test',
        // Use localhost for testing to avoid external network dependencies
        COMPONENTS_REGISTRY_URL: 'http://localhost:3000',
        // Auto-accept prompts for testing
        CI: 'true',
        // Mock registry mode for testing without actual server
        TEST_MODE: 'true',
      },
    });
    return { success: true, stdout };
  } catch (error: any) {
    return { 
      success: false, 
      stdout: error.stdout || '',
      stderr: error.stderr || '',
      message: error.message
    };
  }
}

// Create test project directory structure
async function createTestProject() {
  const spinner = ora('Setting up test environment').start();
  
  try {
    // Create test directory with minimal project structure
    await fs.mkdir(TEMP_TEST_DIR, { recursive: true });
    
    // Create package.json
    await fs.writeFile(
      path.join(TEMP_TEST_DIR, 'package.json'),
      JSON.stringify({
        name: 'solancn-test-project',
        version: '0.0.1',
        type: 'module',
        dependencies: {
          'react': '^18.0.0',
          'react-dom': '^18.0.0',
          'next': '^14.0.0',
          'tailwindcss': '^3.3.0'
        }
      }, null, 2)
    );
    
    // Create basic project structure
    await fs.mkdir(path.join(TEMP_TEST_DIR, 'src'), { recursive: true });
    await fs.mkdir(path.join(TEMP_TEST_DIR, 'src/app'), { recursive: true });
    await fs.mkdir(path.join(TEMP_TEST_DIR, 'public'), { recursive: true });
    
    // Create mock tsconfig.json
    await fs.writeFile(
      path.join(TEMP_TEST_DIR, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: "es5",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
          plugins: [{ name: "next" }],
          paths: { "@/*": ["./src/*"] }
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"]
      }, null, 2)
    );
    
    // Create tailwind.config.js
    await fs.writeFile(
      path.join(TEMP_TEST_DIR, 'tailwind.config.js'),
      `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`
    );
    
    // Create mock app layout file
    await fs.mkdir(path.join(TEMP_TEST_DIR, 'src/app'), { recursive: true });
    await fs.writeFile(
      path.join(TEMP_TEST_DIR, 'src/app/layout.tsx'),
      `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`
    );

    spinner.succeed('Test environment setup complete');
    return true;
  } catch (error) {
    spinner.fail('Failed to set up test environment');
    console.error(error);
    return false;
  }
}

// Clean up test directory
async function cleanupTestProject() {
  try {
    await fs.rm(TEMP_TEST_DIR, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.error('Failed to clean up test directory:', error);
    return false;
  }
}

async function runTest(name: string, testFn: () => Promise<boolean>) {
  const spinner = ora(name).start();
  results.total++;
  
  try {
    const success = await testFn();
    if (success) {
      spinner.succeed();
      results.passed++;
    } else {
      spinner.fail();
      results.failed++;
    }
    return success;
  } catch (error) {
    spinner.fail();
    console.error(error);
    results.failed++;
    return false;
  }
}

async function runTests() {
  log.title('🧪 SOLANCN CLI TEST SUITE');
  log.info('Running pre-publish interactive tests...');
  log.info(`Test directory: ${TEMP_TEST_DIR}`);
  
  // Test CLI info commands
  await runTest('CLI shows version information', async () => {
    const result = await runCommand(['-v']);
    if (!result.success || !result.stdout.match(/\d+\.\d+\.\d+/)) {
      log.error('Failed to get version information');
      log.error(`Output: ${result.stdout}`);
      return false;
    }
    return true;
  });

  await runTest('CLI shows help information', async () => {
    const result = await runCommand(['--help']);
    return result.success && 
           result.stdout.includes('Usage:') && 
           result.stdout.includes('Commands:');
  });

  // Test init command
  await runTest('init command creates components.json', async () => {
    const result = await runCommand(['init', '--yes']);
    if (!result.success) {
      log.error(`Init command failed: ${result.stderr || result.stdout}`);
      return false;
    }
    
    const configExists = existsSync(path.join(TEMP_TEST_DIR, 'components.json'));
    return configExists;
  });

  // Test add command with various components
  await runTest('add button component', async () => {
    const result = await runCommand(['add', 'button', '--yes']);
    if (!result.success) {
      log.error(`Add command failed: ${result.stderr || result.stdout}`);
      return false;
    }
    
    // Check several possible component locations based on config
    const possiblePaths = [
      path.join(TEMP_TEST_DIR, 'src/components/ui/button.tsx'),
      path.join(TEMP_TEST_DIR, 'components/ui/button.tsx'),
      path.join(TEMP_TEST_DIR, 'src/components/button.tsx'),
    ];
    
    const componentExists = possiblePaths.some(p => existsSync(p));
    return componentExists;
  });

  await runTest('add command can access registry', async () => {
    const result = await runCommand(['add', '--all', '--yes']);
    return result.success && result.stdout.includes('components');
  });

  // Test error handling
  await runTest('CLI fails gracefully with invalid command', async () => {
    const result = await runCommand(['invalid-command']);
    return !result.success; // Should fail, which is actually a success for this test
  });

  // Test template handling
  await runTest('add command with templates flag', async () => {
    const result = await runCommand(['add', '--templates', '--yes']);
    return result.success;
  });

  // Display test summary
  log.summary();
}

// Main function to run the test suite
async function main() {
  try {
    const setupSuccess = await createTestProject();
    if (!setupSuccess) {
      log.error('Failed to set up test environment. Exiting...');
      process.exit(1);
    }

    await runTests();
    
    // Clean up
    await cleanupTestProject();
    
    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error('Unexpected error running tests:', error);
    await cleanupTestProject();
    process.exit(1);
  }
}

// Run the main function
main();
