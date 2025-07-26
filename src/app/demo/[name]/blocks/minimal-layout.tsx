import React, { type ReactNode } from "react";

export default function MinimalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex w-full justify-center bg-black">
      <div className="w-full">{children}</div>
    </main>
  );
}
