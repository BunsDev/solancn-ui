# Changelog

All notable changes to the Solancn UI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2025-07-30

### Added
- Comprehensive staking page with the following features:
  - Modern, responsive design using Shadcn UI
  - Tabbed interface (Stake, Unstake, History)
  - Validator selection with details (commission rates, APY)
  - Staking method options (Native vs Liquid staking)
  - Amount input with validation
  - Transaction history display
  - Rewards estimation calculator
  - Network statistics panel
  - Staking tips and educational content
- Solana wallet connection functionality:
  - Integration with @solana/wallet-adapter-react
  - Wallet status display showing address and SOL balance
  - WalletMultiButton from @solana/wallet-adapter-react-ui
  - Devnet connection setup
- Tabbed interface for main application features:
  - Swap
  - Stake
  - Portfolio
  - Transfer
  - Receive

### Changed
- Enhanced UI with Solana brand colors:
  - Purple (#9945FF)
  - Green (#14F195)
  - Black (#000000)
- Improved user experience with conditional UI elements based on wallet connection state

### Fixed
- JSX compilation error by correcting TypeScript configuration path
  - Updated apps/ui/tsconfig.json to extend from correct relative path "../../packages/config/base.json" instead of "solancn-config/base.json"

## [0.1.0] - Initial Development

### Added
- Project scaffolding with Next.js App Router
- Basic UI components with Shadcn UI and Tailwind CSS
- Initial project structure and architecture

