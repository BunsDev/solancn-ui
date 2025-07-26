import type { ReactNode } from "react";

export default function DemoLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="flex h-[100vh] w-full flex-col gap-4 bg-background">{children}</div>;
}
