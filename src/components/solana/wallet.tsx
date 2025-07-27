import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function WalletComponentDemo() {
  return (
    <Card className="w-full bg-background text-text border border-[#9945FF]/20">
      <CardHeader className="border-b border-[#9945FF]/20">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-[#14F195]">Solana Wallet</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your SOL and tokens
            </CardDescription>
          </div>
          <div className="rounded-full bg-[#9945FF]/10 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9945FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Wallet</title>
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] p-[1px] rounded-lg">
            <div className="bg-black p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Total Balance</div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-gray-400 hover:text-text hover:bg-black/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Send</title>
                      <path d="M17 17H8a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5h9" />
                      <path d="m12 8 5 5-5 5" />
                    </svg>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-gray-400 hover:text-text hover:bg-black/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Receive</title>
                      <path d="M7.5 12h9" />
                      <path d="M7.5 12a4.5 4.5 0 1 0 0-9h-3" />
                      <path d="m7.5 3 3 3-3 3" />
                      <path d="M7.5 21a4.5 4.5 0 1 0 0-9h-3" />
                      <path d="m7.5 12 3 3-3 3" />
                    </svg>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 px-2 text-gray-400 hover:text-text hover:bg-black/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <title>Receive</title>
                      <path d="M13 8h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" />
                      <path d="M18 15v6" />
                      <path d="M15 18h6" />
                      <path d="M13 5V2" />
                      <path d="m15 4-2 1-2-1" />
                      <path d="M13 8V5.5" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="mt-2 mb-1">
                <span className="text-2xl font-bold">$0.00</span>
              </div>

              <div className="text-xs text-gray-400">
                <span>wallet: </span>
                <span className="font-mono">E1ch...9yQ3</span>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button className="flex-1 bg-[#9945FF] hover:bg-[#9945FF]/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <title>Send</title>
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Send
                </Button>
                <Button className="flex-1 bg-[#14F195] text-black hover:bg-[#14F195]/90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <title>Receive</title>
                    <path d="m12 19 7-7-7-7" />
                    <path d="M5 12h14" />
                  </svg>
                  Receive
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">Assets</div>
            <Table>
              <TableBody>
                <TableRow className="border-b border-[#9945FF]/10">
                  <TableCell className="py-3 pl-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#9945FF]/30 flex items-center justify-center">
                        S
                      </div>
                      <div>
                        <div>SOL</div>
                        <div className="text-xs text-gray-400">SOL</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right p-3 pr-0">
                    <div>0.00</div>
                    <div className="text-xs text-gray-400">$0.00</div>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-[#9945FF]/10">
                  <TableCell className="py-3 pl-0">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-800/30 flex items-center justify-center">
                        U
                      </div>
                      <div>
                        <div>USDC</div>
                        <div className="text-xs text-gray-400">USD Coin</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right p-3 pr-0">
                    <div>0.00</div>
                    <div className="text-xs text-gray-400">$0.00</div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#9945FF]/20 pt-4">
        <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
          Connect Wallet
        </Button>
      </CardFooter>
    </Card>
  );
}

export const wallet = {
  name: "wallet",
  components: {
    Default: <WalletComponentDemo />,
  },
};
