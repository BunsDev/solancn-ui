import type { ReactNode } from "react";

export default function DemoLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
