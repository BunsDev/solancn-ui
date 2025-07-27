import type { SwapToken } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import TokenIcon from "./token-icon";

const SwapTokenSelectButton = ({
  token,
  onClick,
}: { token: SwapToken; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 bg-background hover:bg-muted/50 rounded-lg p-2 transition-colors"
  >
    <TokenIcon symbol={token.symbol} />
    <span className="font-medium">{token.symbol}</span>
    <ChevronDown size={16} />
  </button>
);

export default SwapTokenSelectButton;
