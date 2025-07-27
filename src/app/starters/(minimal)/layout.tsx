import React, { type ReactNode } from "react";

export default function MinimalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="mt-6 flex w-full justify-center">
      <div className="flex w-full justify-center">{children}</div>
    </main>
  );
}
