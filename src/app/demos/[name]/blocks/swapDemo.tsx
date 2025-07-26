"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import SwapPage from "@/app/demos/[name]/blocks/swap-page";

export const swapDemo = {
  name: "swapDemo",
  components: {
    Default: (
      <MinimalLayout>
        <SwapPage />
      </MinimalLayout>
    ),
  },
};
