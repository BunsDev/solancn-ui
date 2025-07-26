import MinimalLayout from "./minimal-layout";
import SolanaPage from "./solana-page";

export const solanaDemo = {
  name: "solanaDemo",
  description: "Solana block with wallet connection and UI components",
  components: {
    Default: (
      <MinimalLayout>
        <SolanaPage />
      </MinimalLayout>
    ),
  },
};
