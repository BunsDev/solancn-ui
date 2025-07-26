import MinimalLayout from "./minimal-layout";
import SolanaPage from "./solana-page";

export const solana = {
  name: "solana",
  description: "Solana block with wallet connection and UI components",
  components: {
    Default: (
      <MinimalLayout>
        <SolanaPage />
      </MinimalLayout>
    ),
  },
};
