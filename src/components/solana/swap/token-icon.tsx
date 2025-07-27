import { cn } from "@/lib/utils";
import { mockSwapTokens } from "@/app/demos/[name]/blocks/swap-page";

export default function SwapTokenIcon({ symbol, size = "md" }: { symbol: string; size?: "sm" | "md" | "lg" }) {
    const token = mockSwapTokens.find(t => t.symbol === symbol);
    const sizeClass = {
      sm: "w-5 h-5",
      md: "w-7 h-7",
      lg: "w-10 h-10"
    };
    
    if (!token) {
      return <div className={cn("rounded-full bg-gray-200", sizeClass[size])} />;
    }
    
    return (
      <div className={cn("rounded-full bg-white flex items-center justify-center", sizeClass[size])}>
        {/* Fallback to initials if image fails */}
        <span className="font-bold text-xs">{token.symbol.substring(0, 2)}</span>
      </div>
    );
}
  