// import { type Registry } from "solancn/registry"
import { type Registry } from "solancn/registry"

export const templates: Registry["items"] = [
  {
    name: "wallet-connect",
    type: "registry:template",
    description: "Solana wallet connection component with wallet adapter integration.",
    registryDependencies: [
      "button",
      "dropdown-menu",
      "card",
    ],
    files: [
      {
        path: "templates/wallet-connect/wallet-button.tsx",
        type: "registry:component",
      },
      {
        path: "templates/wallet-connect/wallet-modal.tsx",
        type: "registry:component",
      },
      {
        path: "templates/wallet-connect/wallet-provider.tsx",
        type: "registry:component",
      }
    ],
    categories: ["wallet", "authentication"],
  },
  {
    name: "navigation-tabs",
    type: "registry:template",
    description: "Solana UI tabbed navigation interface for main application features.",
    registryDependencies: [
      "tabs",
      "button",
      "separator",
    ],
    files: [
      {
        path: "templates/navigation-tabs/main-tabs.tsx",
        type: "registry:component",
      },
      {
        path: "templates/navigation-tabs/tab-content.tsx",
        type: "registry:component",
      }
    ],
    categories: ["navigation", "tabs"],
  },
  {
    name: "staking-interface",
    type: "registry:template",
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
        path: "templates/staking-interface/staking-page.tsx",
        type: "registry:page",
        target: "app/stake/page.tsx",
      },
      {
        path: "templates/staking-interface/components/stake-form.tsx",
        type: "registry:component",
      },
      {
        path: "templates/staking-interface/components/unstake-form.tsx",
        type: "registry:component",
      },
      {
        path: "templates/staking-interface/components/history-table.tsx",
        type: "registry:component",
      },
      {
        path: "templates/staking-interface/components/validator-selector.tsx",
        type: "registry:component",
      },
      {
        path: "templates/staking-interface/components/stake-summary.tsx",
        type: "registry:component",
      },
      {
        path: "templates/staking-interface/components/network-stats.tsx",
        type: "registry:component",
      }
    ],
    categories: ["staking", "form"],
  },
  {
    name: "portfolio-view",
    type: "registry:template",
    description: "Portfolio view showing asset balances and performance metrics.",
    registryDependencies: [
      "card",
      "tabs",
      "table",
      "separator",
    ],
    files: [
      {
        path: "templates/portfolio-view/portfolio-page.tsx",
        type: "registry:page",
        target: "app/portfolio/page.tsx",
      },
      {
        path: "templates/portfolio-view/components/asset-list.tsx",
        type: "registry:component",
      },
      {
        path: "templates/portfolio-view/components/balance-summary.tsx",
        type: "registry:component",
      },
      {
        path: "templates/portfolio-view/components/performance-chart.tsx",
        type: "registry:component",
      }
    ],
    categories: ["portfolio", "dashboard"],
  },
  {
    name: "swap-interface",
    type: "registry:template",
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
        path: "templates/swap-interface/swap-page.tsx",
        type: "registry:page",
        target: "app/swap/page.tsx",
      },
      {
        path: "templates/swap-interface/components/swap-form.tsx",
        type: "registry:component",
      },
      {
        path: "templates/swap-interface/components/token-selector.tsx",
        type: "registry:component",
      },
      {
        path: "templates/swap-interface/components/price-info.tsx",
        type: "registry:component",
      },
      {
        path: "templates/swap-interface/components/slippage-settings.tsx",
        type: "registry:component",
      }
    ],
    categories: ["swap", "form"],
  },
  {
    name: "transfer-interface",
    type: "registry:template",
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
        path: "templates/transfer-interface/transfer-page.tsx",
        type: "registry:page",
        target: "app/transfer/page.tsx",
      },
      {
        path: "templates/transfer-interface/components/transfer-form.tsx",
        type: "registry:component",
      },
      {
        path: "templates/transfer-interface/components/address-book.tsx",
        type: "registry:component",
      },
      {
        path: "templates/transfer-interface/components/recent-transfers.tsx",
        type: "registry:component",
      }
    ],
    categories: ["transfer", "form"],
  },
  {
    name: "receive-interface",
    type: "registry:template",
    description: "Interface for receiving tokens with QR code and address display.",
    registryDependencies: [
      "card",
      "button",
      "separator",
      "toast",
    ],
    files: [
      {
        path: "templates/receive-interface/receive-page.tsx",
        type: "registry:page",
        target: "app/receive/page.tsx",
      },
      {
        path: "templates/receive-interface/components/address-display.tsx",
        type: "registry:component",
      },
      {
        path: "templates/receive-interface/components/qr-code.tsx",
        type: "registry:component",
      }
    ],
    categories: ["receive", "display"],
  },
  {
    name: "solana-theme",
    type: "registry:template",
    description: "Solana UI theme components with brand colors and styling.",
    registryDependencies: [
      "button",
      "card",
      "separator",
    ],
    files: [
      {
        path: "templates/solana-theme/theme-provider.tsx",
        type: "registry:component",
      },
      {
        path: "templates/solana-theme/solana-colors.tsx",
        type: "registry:component",
      }
    ],
    categories: ["theme", "styling"],
  }
]
