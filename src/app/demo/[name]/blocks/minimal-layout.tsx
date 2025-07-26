import React, { type ReactNode } from "react";

export default function MinimalLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="mt-16 flex w-full justify-center">
      <div className="container">{children}</div>
    </main>
  );
}
