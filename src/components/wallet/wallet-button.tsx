import { cn } from "@/lib/utils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// Custom styled WalletButton component with enhanced styling
export default function StyledWalletButton() {
  return (
    <div
      className={cn(
        "wallet-adapter-button-container",
        "dark:bg-[#9945FF] text-text rounded-md border-none hover:opacity-90 ",
      )}
    >
      <WalletMultiButton
        className={cn(
          "bg-gradient-to-r from-[#9945FF] to-[#14F195] dark:bg-[#9945FF] dark:text-text",
          "hover:opacity-90 transition-all duration-200",
          "shadow-md hover:shadow-lg",
          "border border-[#9945FF]/20 dark:border-[#9945FF]/20",
          "font-medium text-white dark:text-text",
          "flex items-center gap-2",
        )}
      />
    </div>
  );
}
