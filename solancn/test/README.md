# Solancn CLI Test Suite

This directory contains interactive testing utilities for the Solancn CLI, designed to verify functionality before publishing releases.

## Features

- Comprehensive pre-publish CLI functionality verification
- Visual feedback with Solana brand colors (Purple: #9945FF, Green: #14F195)
- Automated test environment setup and teardown
- Integration with publish workflow

## Test Files

- `cli.test.ts`: Unit tests for CLI functionality using Vitest
- `test-cli.ts`: Interactive CLI test runner with visual feedback

## Usage

### Running Tests Before Publishing

The test suite is automatically integrated with the publish commands:

```bash
# Tests will run automatically before these commands
pnpm release      # Build, test, and publish
pnpm pub:beta     # Publish beta version with tests
pnpm pub:next     # Publish next version with tests
```

### Running Tests Manually

```bash
# Run CLI tests with visual feedback
pnpm test:cli

# Run CLI tests interactively
pnpm test:cli:interactive

# Run unit tests
pnpm test
```

## What's Being Tested

The test suite verifies:

1. **CLI information commands** (`--help`, `--version`)
2. **Project initialization** (`init` command)
3. **Component addition** (`add` command)
4. **Registry connectivity** (fetching from registry)
5. **Template handling** (adding templates)
6. **Error handling** (graceful failures)

## Test Environment

Tests are run in a temporary directory with a minimal project structure:
- Standard Next.js file structure
- Tailwind CSS configuration
- TypeScript configuration
- Mock app layout

The environment is automatically created and cleaned up during testing.

## Extending Tests

To add new tests:

1. Add test cases to `cli.test.ts` for unit testing
2. Add interactive test steps to `test-cli.ts` using the `runTest()` function

## Troubleshooting

If tests fail:
1. Check that the registry server is accessible
2. Verify the CLI build is up-to-date (`pnpm build`)
3. Review console output for specific errors
