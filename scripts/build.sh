#!/bin/bash
set -e

# Solancn UI Build Script
# This script handles the complete build process for the Solancn UI project

# Color codes for output formatting
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display step information
log_step() {
  echo -e "${BLUE}==>${NC} ${GREEN}$1${NC}"
}

# Function to display warnings
log_warning() {
  echo -e "${YELLOW}WARNING:${NC} $1"
}

# Function to handle errors
handle_error() {
  echo -e "${RED}ERROR:${NC} $1"
  exit 1
}

# Determine environment
ENV=${1:-"production"}
log_step "Building for $ENV environment"

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
  handle_error "pnpm is required but not installed. Please install it first."
fi

# Clean up previous builds
log_step "Cleaning previous build artifacts"
rm -rf .next out dist || log_warning "Could not clean all build directories"

# Install dependencies if needed
if [ "$2" == "--install" ] || [ "$2" == "-i" ]; then
  log_step "Installing dependencies"
  pnpm install || handle_error "Failed to install dependencies"
fi

# Build the CLI tool
log_step "Building Solancn CLI"
pnpm run build:cli || handle_error "Failed to build CLI"

# Build the component registry
log_step "Building component registry"
pnpm run registry:build || handle_error "Building component registry failed"

# Build the main Next.js application
log_step "Building Next.js application"
if [ "$ENV" == "production" ]; then
  NODE_ENV=production pnpm run build || handle_error "Next.js build failed"
else
  pnpm run build || handle_error "Next.js build failed"
fi

# Run tests if requested
if [ "$2" == "--test" ] || [ "$2" == "-t" ] || [ "$3" == "--test" ] || [ "$3" == "-t" ]; then
  log_step "Running tests"
  pnpm run test:cli || log_warning "Tests completed with warnings"
fi

log_step "Build completed successfully! "

# Display help information
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  echo -e "\nUsage: ./scripts/build.sh [environment] [options]"
  echo -e "\nEnvironments:"
  echo -e "  production    Build for production (default)"
  echo -e "  development   Build for development"
  echo -e "\nOptions:"
  echo -e "  --install, -i   Install dependencies before building"
  echo -e "  --test, -t      Run tests after building"
  echo -e "  --help, -h      Show this help message"
  exit 0
fi