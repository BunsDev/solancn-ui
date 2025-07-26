"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import WalletPage from "@/app/demos/[name]/blocks/wallet-page";

export const walletDemo = {
  name: "walletDemo",
  components: {
    Default: (
      <MinimalLayout>
        <WalletPage />
      </MinimalLayout>
    ),
  },
};
