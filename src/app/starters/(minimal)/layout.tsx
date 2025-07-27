import React, { type ReactNode } from "react";
import SolanaWalletProvider from "@/app/demos/[name]/context/wallet-provider";

export default function MinimalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="mt-16 flex w-full justify-center">
      <SolanaWalletProvider>
        <div className="container">{children}</div>
      </SolanaWalletProvider>
    </main>
  );
}