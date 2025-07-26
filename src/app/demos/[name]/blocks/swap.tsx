import MinimalLayout from "./minimal-layout";
import SwapPage from "./swap-page";

export const swap = {
  name: "swap",
  description: "Swap block with wallet connection and UI components",
  components: {
    Default: (
      <MinimalLayout>
        <SwapPage />
      </MinimalLayout>
    ),
  },
};
