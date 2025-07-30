import { type Registry } from "solancn/registry"

export const blocks: Registry["items"] = [
  {
    name: "wallet-connect",
    type: "registry:block",
    description: "Solana wallet connection component with wallet adapter integration.",
    registryDependencies: [
      "button",
      "dropdown-menu",
      "card",
    ],
    files: [
      {
        path: "blocks/wallet-connect/wallet-button.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/wallet-connect/wallet-modal.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/wallet-connect/wallet-provider.tsx",
        type: "registry:component",
      }
    ],
    categories: ["wallet", "authentication"],
  },
  {
    name: "navigation-tabs",
    type: "registry:block",
    description: "Solana UI tabbed navigation interface for main application features.",
    registryDependencies: [
      "tabs",
      "button",
      "separator",
    ],
    files: [
      {
        path: "blocks/navigation-tabs/main-tabs.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/navigation-tabs/tab-content.tsx",
        type: "registry:component",
      }
    ],
    categories: ["navigation", "tabs"],
  },
  {
    name: "staking-interface",
    type: "registry:block",
    description: "Complete staking interface with validator selection and staking options.",
    registryDependencies: [
      "tabs",
      "card",
      "input",
      "label",
      "button",
      "separator",
      "select",
      "toggle-group",
    ],
    files: [
      {
        path: "blocks/staking-interface/staking-page.tsx",
        type: "registry:page",
        target: "app/stake/page.tsx",
      },
      {
        path: "blocks/staking-interface/components/stake-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/staking-interface/components/unstake-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/staking-interface/components/history-table.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/staking-interface/components/validator-selector.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/staking-interface/components/stake-summary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/staking-interface/components/network-stats.tsx",
        type: "registry:component",
      }
    ],
    categories: ["staking", "form"],
  },
  {
    name: "portfolio-view",
    type: "registry:block",
    description: "Portfolio view showing asset balances and performance metrics.",
    registryDependencies: [
      "card",
      "tabs",
      "table",
      "separator",
    ],
    files: [
      {
        path: "blocks/portfolio-view/portfolio-page.tsx",
        type: "registry:page",
        target: "app/portfolio/page.tsx",
      },
      {
        path: "blocks/portfolio-view/components/asset-list.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/portfolio-view/components/balance-summary.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/portfolio-view/components/performance-chart.tsx",
        type: "registry:component",
      }
    ],
    categories: ["portfolio", "dashboard"],
  },
  {
    name: "swap-interface",
    type: "registry:block",
    description: "Token swap interface with price information and slippage controls.",
    registryDependencies: [
      "card",
      "input",
      "button",
      "select",
      "slider",
    ],
    files: [
      {
        path: "blocks/swap-interface/swap-page.tsx",
        type: "registry:page",
        target: "app/swap/page.tsx",
      },
      {
        path: "blocks/swap-interface/components/swap-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/swap-interface/components/token-selector.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/swap-interface/components/price-info.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/swap-interface/components/slippage-settings.tsx",
        type: "registry:component",
      }
    ],
    categories: ["swap", "form"],
  },
  {
    name: "transfer-interface",
    type: "registry:block",
    description: "Token transfer interface with address book and recent transactions.",
    registryDependencies: [
      "card",
      "input",
      "button",
      "select",
      "toast",
    ],
    files: [
      {
        path: "blocks/transfer-interface/transfer-page.tsx",
        type: "registry:page",
        target: "app/transfer/page.tsx",
      },
      {
        path: "blocks/transfer-interface/components/transfer-form.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/transfer-interface/components/address-book.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/transfer-interface/components/recent-transfers.tsx",
        type: "registry:component",
      }
    ],
    categories: ["transfer", "form"],
  },
  {
    name: "receive-interface",
    type: "registry:block",
    description: "Interface for receiving tokens with QR code and address display.",
    registryDependencies: [
      "card",
      "button",
      "separator",
      "toast",
    ],
    files: [
      {
        path: "blocks/receive-interface/receive-page.tsx",
        type: "registry:page",
        target: "app/receive/page.tsx",
      },
      {
        path: "blocks/receive-interface/components/address-display.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/receive-interface/components/qr-code.tsx",
        type: "registry:component",
      }
    ],
    categories: ["receive", "display"],
  },
  {
    name: "solana-theme",
    type: "registry:block",
    description: "Solana UI theme components with brand colors and styling.",
    registryDependencies: [
      "button",
      "card",
      "separator",
    ],
    files: [
      {
        path: "blocks/solana-theme/theme-provider.tsx",
        type: "registry:component",
      },
      {
        path: "blocks/solana-theme/solana-colors.tsx",
        type: "registry:component",
      }
    ],
    categories: ["theme", "styling"],
  }
]
