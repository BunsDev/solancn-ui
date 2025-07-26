import SolanaWalletProvider from "../context/wallet-provider";

export function DashboardContent() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-4 rounded-md bg-background">
      <div className="min-w-32 text-muted-foreground">
        To get started, click the open in v0 button!
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SolanaWalletProvider>
      <DashboardContent />
    </SolanaWalletProvider>
  );
}