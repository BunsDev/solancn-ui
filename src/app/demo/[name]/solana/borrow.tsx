import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const borrow = {
  name: "borrow",
  components: {
    Default: (
      <Card className="w-[600px] bg-black text-white border border-[#9945FF]/20">
        <CardHeader className="border-b border-[#9945FF]/20">
          <CardTitle className="text-[#14F195]">Borrow Assets</CardTitle>
          <CardDescription className="text-gray-400">
            Borrow assets using your supplied collateral
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#9945FF]/20">
                  <TableHead className="text-gray-400">Asset</TableHead>
                  <TableHead className="text-gray-400 text-right">
                    APR
                  </TableHead>
                  <TableHead className="text-gray-400 text-right">
                    Available
                  </TableHead>
                  <TableHead className="text-gray-400 text-right">
                    Your Borrows
                  </TableHead>
                  <TableHead>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                    >
                      Borrow
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-[#9945FF]/10">
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#9945FF]/30 flex items-center justify-center">
                      S
                    </div>
                    SOL
                  </TableCell>
                  <TableCell className="text-right">6.85%</TableCell>
                  <TableCell className="text-right">650K SOL</TableCell>
                  <TableCell className="text-right">0.00</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                    >
                      Borrow
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-[#9945FF]/10">
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-800/30 flex items-center justify-center">
                      U
                    </div>
                    USDC
                  </TableCell>
                  <TableCell className="text-right">7.62%</TableCell>
                  <TableCell className="text-right">3.2M USDC</TableCell>
                  <TableCell className="text-right">0.00</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                    >
                      Borrow
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600/30 flex items-center justify-center">
                      R
                    </div>
                    RNDR
                  </TableCell>
                  <TableCell className="text-right">8.34%</TableCell>
                  <TableCell className="text-right">45K RNDR</TableCell>
                  <TableCell className="text-right">0.00</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
                    >
                      Borrow
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="bg-[#9945FF]/10 p-4 rounded-md">
            <h3 className="text-lg font-medium mb-2">Borrow Asset</h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Select>
                  <SelectTrigger className="bg-black border-[#9945FF]/30">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#9945FF]/30">
                    <SelectItem value="sol">SOL</SelectItem>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="rndr">RNDR</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]"
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Borrow Limit:</span>
                <span>0.00 ($0.00)</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Borrow Limit Used:</span>
                <span>0.00%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Health Factor:</span>
                <span className="text-[#14F195]">N/A</span>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 mt-2">
                Connect Wallet to Borrow
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between text-sm border-t border-[#9945FF]/20 pt-4">
          <div className="text-gray-400">Total Borrowed Value</div>
          <div className="font-medium">$0.00</div>
        </CardFooter>
      </Card>
    ),
  },
};
