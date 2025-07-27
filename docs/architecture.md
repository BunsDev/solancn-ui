# Architecture

This document provides a comprehensive overview of the solancn architecture, explaining its core components, design patterns, and how the various parts of the system work together.

## System Overview

solancn is a design system registry built with Next.js, Shadcn/ui, and Tailwind CSS. It functions as a central repository for UI components, blocks, and design tokens that can be used across multiple Solana-related applications to ensure consistency and accelerate development.

## Core Technologies

- **Next.js 15**: App Router architecture for routing and server components
- **React 19**: Frontend component library
- **Shadcn/ui**: Component primitives and UI foundation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Static type checking
- **PNPM**: Package management

## Directory Structure

```
/
├── app/                     # Next.js App Router routes
│   ├── docs/          # Documentation application routes
│   ├── demos/                # Component demonstration routes
│   └── r/                   # API routes for registry endpoints
├── components/              # React components
│   ├── ui/                  # Shadcn/ui primitives
│   └── docs/            # Documentation-specific components
├── hooks/                   # React hooks
├── lib/                     # Utility functions and business logic
├── v0/                      # v0.dev integration files
├── public/                  # Static assets
└── docs/                    # Documentation files
```

## Registry Pattern

The core architectural pattern is the "Registry Pattern" which centralizes component definitions in a structured JSON format:

### Registry Items

Components in the registry are organized into three main categories:

1. **UI Primitives**: Basic building blocks (e.g., buttons, inputs, form elements)
2. **Components**: Higher-level components built using UI primitives
3. **Blocks**: Pre-built starter kits that combine components into application patterns

Each registry item defines:
- Metadata (name, title, description)
- Type (ui, component, block, etc.)
- Dependencies on other registry items
- File paths and their targets when installed

## Integration Points

### MCP (Model Context Protocol)

The registry integrates with AI IDEs using Model Context Protocol, allowing AI tools to access and understand the registry's components and design tokens. This enables AI-assisted development with accurate knowledge of the design system.

### v0.dev Integration

"Open in v0" buttons provide deep linking to v0.dev with component context, allowing designers and developers to quickly prototype using the design system components in an AI-assisted environment.

## Theming System

The theming system consists of:

1. **Token Definition**: Design tokens defined in `tokens.css` using CSS variables
2. **Theme Provider**: Integration with `next-themes` for light/dark mode support
3. **Registry Style Tokens**: Design tokens exposed through the registry API for AI tools

## Data Flow

1. **Component Registration**: Components are registered in `registry.json`
2. **Build Process**: The registry is built using `shadcn/ui` tooling
3. **API Endpoints**: Components are exposed via JSON endpoints at `/r/${component_name}.json`
4. **Consumption**: Components can be consumed by other projects or by AI tools

## Extensibility

The architecture is designed to be extensible in several ways:

1. **Adding Components**: New components can be added to the registry by updating `registry.json`
2. **Theming**: The design system can be themed by modifying `tokens.css`
3. **Custom Components**: Custom components can be added to extend the base shadcn/ui primitives

## Deployment Architecture

The application is designed to be deployed on Vercel, with:

- Static generation for most pages
- Server-side rendering when needed
- API routes for registry endpoints
- Integration with Vercel analytics and speed insights

## Solana Integration

### Wallet Architecture

The system integrates with Solana wallets using:

1. **Wallet Adapter**: Solana wallet adapter for connecting to browser wallets
2. **Wallet Components**: Reusable components for wallet connection and status display
   - `StyledWalletButton`: Custom-styled connect button component
   - `WalletStatus`: Component to display connected wallet information

### Solana Page Structure

The Solana dashboard uses a tab-based architecture:

1. **Dynamic Tab System**: Configurable tabs array for rendering different sections
2. **Content Pages**: Specialized pages for different Solana functionality:
   - DeFi
   - Trade
   - Stake
   - Frame
   - Portfolio
   - Bridge
   - Receive
   - Borrow
   - Lend

### DeFi Components

#### Staking Interface

The staking interface follows a modular architecture:

1. **Tabbed Interface**: Stake, Unstake, and History tabs
2. **Validator Selection**: Component for selecting validators with performance metrics
3. **Staking Options**: Components for choosing between native and liquid staking
4. **Transaction Summary**: Dynamic summary of staking actions and expected rewards
5. **Network Statistics**: Display of relevant network metrics

#### Swap Interface

The swap functionality uses:

1. **Tabbed Interface**: Swap, Limit, and TWAP tabs
2. **Token Selection**: Components for selecting input and output tokens
3. **Route Selection**: Components for choosing optimal swap routes
4. **Settings Panel**: Interface for configuring slippage tolerance and other options
5. **Price Chart**: Togglable price chart component

### Type System

The Solana components use a strong TypeScript typing system:

1. **Token Interface**: Defines structure for token data including symbol, name, logo, and price
2. **SwapRoute Interface**: Defines structure for swap routing options
3. **Validator Interface**: Defines structure for validator information
4. **Staking Types**: Interfaces for staking options, history, and actions

### Constants and Mocks

Mock data for development and testing is organized in:

1. **Token Constants**: Predefined token definitions with logos and metadata
2. **Swap Routes**: Mock swap route definitions with performance metrics
3. **Validator Data**: Mock validator information with APY and commission details

### Theming

Solana-specific theming includes:

1. **Brand Colors**: Integration of Solana brand colors (#9945FF purple and #14F195 green)
2. **Consistent UI**: Unified design language across all Solana components
3. **Dark/Light Mode**: Theme support for all Solana-specific components
