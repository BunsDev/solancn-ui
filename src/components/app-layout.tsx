"use client";

import type { ReactNode } from "react";
import { Toaster } from "./ui/sonner";
// import { ClusterChecker } from "@/components/cluster/cluster-ui";
// import { AccountChecker } from "@/components/account/account-ui";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-dvh w-dvw bg-background min-h-dvh min-w-dvw overflow-hidden justify-between items-center mx-auto overflow-y-auto">
      {/* 
		<ClusterChecker>
			<AccountChecker />
		</ClusterChecker>
	*/}
      {children}
      <Toaster />
    </div>
  );
}
