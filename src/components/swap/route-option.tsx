"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const RouteOption = ({
  route,
  selected,
  onSelect,
}: {
  route: {
    name: string;
    icon: React.ReactNode;
    value: string;
    fee: number;
    time: string;
    impact: number;
    optimizedFor: string;
  };
  selected: boolean;
  onSelect: () => void;
}) => (
  <div
    onClick={onSelect}
    className={cn(
      "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all",
      selected
        ? "bg-[#9945FF]/10 border border-[#9945FF]/30"
        : "border border-transparent hover:border-[#9945FF]/20",
    )}
  >
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "p-2 rounded-full",
          selected ? "bg-[#9945FF]/20" : "bg-muted",
        )}
      >
        {route.icon}
      </div>
      <div>
        <div className="font-medium flex items-center gap-1">
          {route.name}
          {route.optimizedFor && (
            <Badge variant="outline" className="text-xs font-normal">
              {route.optimizedFor}
            </Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground">{route.value}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-medium text-sm">{route.time}</div>
      <div className="text-xs text-muted-foreground">Fee: {route.fee}%</div>
    </div>
  </div>
);
