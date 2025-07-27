"use client";

import { BorrowComponent } from "@/components/borrow/borrow-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: Review this component
function BorrowContent() {

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">

      <main className="flex-1 p-2 flex flex-col w-full">
        <div className="container mx-auto py-8">
          <Card className="bg-background border border-[#9945FF]/20 max-w-screen">
            <CardHeader>
              <CardTitle className="text-text">Borrow Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <BorrowComponent />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function BorrowDemo() {
  return <BorrowContent />;
}

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Skeleton } from "@/components/ui/skeleton";

// // Define asset types with their relevant data
// const assets = [
//   {
//     symbol: "SOL",
//     name: "Solana",
//     icon: "S",
//     iconBg: "bg-[#9945FF]/30",
//     apr: 6.85,
//     available: "650K",
//     price: 134.26,
//     ltv: 80,
//   },
//   {
//     symbol: "USDC",
//     name: "USD Coin",
//     icon: "U",
//     iconBg: "bg-green-800/30",
//     apr: 7.62,
//     available: "3.2M",
//     price: 1.0,
//     ltv: 90,
//   },
//   {
//     symbol: "RNDR",
//     name: "Render Network",
//     icon: "R",
//     iconBg: "bg-blue-600/30",
//     apr: 8.34,
//     available: "45K",
//     price: 5.78,
//     ltv: 65,
//   },
//   {
//     symbol: "JTO",
//     name: "Jito",
//     icon: "J",
//     iconBg: "bg-yellow-600/30",
//     apr: 9.12,
//     available: "120K",
//     price: 2.34,
//     ltv: 70,
//   },
// ];

// // Export the component
// export default function BorrowPage() {
//   const { publicKey, connected } = useWallet();
//   const [selectedAsset, setSelectedAsset] = useState("");
//   const [borrowAmount, setBorrowAmount] = useState("");
//   const [collateralValue, setCollateralValue] = useState(5000);
//   const [borrowTab, setBorrowTab] = useState("available");
//   const [isLoading, setIsLoading] = useState(true);
//   const [borrowedAssets, setBorrowedAssets] = useState<{
//     [key: string]: number;
//   }>({
//     USDC: 250,
//     SOL: 0.5,
//   });
//   const [ltv, setLtv] = useState(0); // Loan-to-value ratio

//   // Simulate loading state
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   // Calculate borrow value in USD
//   const borrowValue = useMemo(() => {
//     if (!selectedAsset || !borrowAmount) return 0;
//     const asset = assets.find((a) => a.symbol === selectedAsset);
//     if (!asset) return 0;
//     return Number.parseFloat(borrowAmount) * asset.price;
//   }, [selectedAsset, borrowAmount, assets]);

//   // Calculate LTV ratio
//   useEffect(() => {
//     if (collateralValue > 0) {
//       const totalBorrowed = Object.entries(borrowedAssets).reduce(
//         (acc, [symbol, amount]) => {
//           const asset = assets.find((a) => a.symbol === symbol);
//           return acc + (asset ? amount * asset.price : 0);
//         },
//         0,
//       );

//       const newLtv = (totalBorrowed / collateralValue) * 100;
//       setLtv(newLtv);
//     } else {
//       setLtv(0);
//     }
//   }, [borrowedAssets, collateralValue]);

//   const handleBorrowAction = () => {
//     if (!selectedAsset || !borrowAmount || Number.parseFloat(borrowAmount) <= 0)
//       return;

//     setBorrowedAssets((prev) => ({
//       ...prev,
//       [selectedAsset]:
//         (prev[selectedAsset] || 0) + Number.parseFloat(borrowAmount),
//     }));

//     setBorrowAmount("");
//     setSelectedAsset("");
//   };

//   const totalBorrowedValue = Object.entries(borrowedAssets).reduce(
//     (acc, [symbol, amount]) => {
//       const asset = assets.find((a) => a.symbol === symbol);
//       return acc + (asset ? amount * asset.price : 0);
//     },
//     0,
//   );

//   return (
//     <Card className="w-full bg-background text-text border border-[#9945FF]/20">
//       <CardHeader className="border-b border-[#9945FF]/20">
//         <CardTitle className="text-[#14F195]">Borrow Assets</CardTitle>
//         <CardDescription className="text-gray-400">
//           Borrow assets using your supplied collateral
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-6 space-y-6">
//         <Tabs value={borrowTab} className="w-full" onValueChange={setBorrowTab}>
//           <TabsList className="grid grid-cols-2 mb-4 bg-background border border-[#9945FF]/30">
//             <TabsTrigger
//               value="available"
//               className="data-[state=active]:bg-[#9945FF]/20"
//             >
//               Available Assets
//             </TabsTrigger>
//             <TabsTrigger
//               value="your"
//               className="data-[state=active]:bg-[#9945FF]/20"
//             >
//               Your Borrows
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="available" className="space-y-4">
//             <div className="space-y-4">
//               {isLoading ? (
//                 <div className="space-y-2">
//                   {[1, 2, 3].map((i) => (
//                     <Skeleton key={i} className="h-12 w-full bg-[#9945FF]/5" />
//                   ))}
//                 </div>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="border-b border-[#9945FF]/20">
//                       <TableHead className="text-gray-400">Asset</TableHead>
//                       <TableHead className="text-gray-400 text-right">
//                         APR
//                       </TableHead>
//                       <TableHead className="text-gray-400 text-right">
//                         Available
//                       </TableHead>
//                       <TableHead className="text-gray-400 text-right">
//                         Limit
//                       </TableHead>
//                       <TableHead />
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {assets.map((asset) => {
//                       const borrowed = borrowedAssets[asset.symbol] || 0;
//                       return (
//                         <TableRow
//                           key={asset.symbol}
//                           className="border-b border-[#9945FF]/10"
//                         >
//                           <TableCell className="font-medium flex items-center gap-2">
//                             <div
//                               className={`w-6 h-6 rounded-full ${asset.iconBg} flex items-center justify-center`}
//                             >
//                               {asset.icon}
//                             </div>
//                             {asset.symbol}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             {asset.apr}%
//                           </TableCell>
//                           <TableCell className="text-right">
//                             {asset.available} {asset.symbol}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             $
//                             {(
//                               (asset.ltv * collateralValue) /
//                               100
//                             ).toLocaleString(undefined, {
//                               maximumFractionDigits: 0,
//                             })}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
//                               onClick={() => {
//                                 setSelectedAsset(asset.symbol);
//                                 const element =
//                                   document.getElementById("borrow-form");
//                                 element?.scrollIntoView({ behavior: "smooth" });
//                               }}
//                               disabled={!connected}
//                             >
//                               Borrow
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               )}
//             </div>
//           </TabsContent>

//           <TabsContent value="your" className="space-y-4">
//             <div className="space-y-4">
//               {isLoading ? (
//                 <div className="space-y-2">
//                   {[1, 2].map((i) => (
//                     <Skeleton key={i} className="h-12 w-full bg-[#9945FF]/5" />
//                   ))}
//                 </div>
//               ) : Object.keys(borrowedAssets).length > 0 ? (
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="border-b border-[#9945FF]/20">
//                       <TableHead className="text-gray-400">Asset</TableHead>
//                       <TableHead className="text-gray-400 text-right">
//                         Amount
//                       </TableHead>
//                       <TableHead className="text-gray-400 text-right">
//                         Value
//                       </TableHead>
//                       <TableHead className="text-gray-400 text-right">
//                         APR
//                       </TableHead>
//                       <TableHead />
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {Object.entries(borrowedAssets).map(([symbol, amount]) => {
//                       if (amount <= 0) return null;
//                       const asset = assets.find((a) => a.symbol === symbol);
//                       if (!asset) return null;

//                       return (
//                         <TableRow
//                           key={symbol}
//                           className="border-b border-[#9945FF]/10"
//                         >
//                           <TableCell className="font-medium flex items-center gap-2">
//                             <div
//                               className={`w-6 h-6 rounded-full ${asset.iconBg} flex items-center justify-center`}
//                             >
//                               {asset.icon}
//                             </div>
//                             {symbol}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             {amount.toLocaleString(undefined, {
//                               maximumFractionDigits: 4,
//                             })}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             $
//                             {(amount * asset.price).toLocaleString(undefined, {
//                               maximumFractionDigits: 2,
//                             })}
//                           </TableCell>
//                           <TableCell className="text-right">
//                             {asset.apr}%
//                           </TableCell>
//                           <TableCell className="text-right">
//                             <Button
//                               size="sm"
//                               variant="outline"
//                               className="border-red-500 text-red-500 hover:bg-red-500/10"
//                               disabled={!connected}
//                             >
//                               Repay
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-8 text-center">
//                   <p className="text-gray-400 mb-2">
//                     You have no borrowed assets
//                   </p>
//                   <Button
//                     variant="outline"
//                     className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10"
//                     onClick={() => setBorrowTab("available")}
//                   >
//                     Browse Assets
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div id="borrow-form" className="bg-[#9945FF]/10 p-4 rounded-md mt-6">
//           <h3 className="text-lg font-medium mb-3">Borrow Asset</h3>
//           <div className="space-y-4">
//             <div className="flex space-x-2">
//               <Select value={selectedAsset} onValueChange={setSelectedAsset}>
//                 <SelectTrigger className="bg-background border-[#9945FF]/30 w-1/3">
//                   <SelectValue placeholder="Asset" />
//                 </SelectTrigger>
//                 <SelectContent className="bg-background border-[#9945FF]/30">
//                   {assets.map((asset) => (
//                     <SelectItem key={asset.symbol} value={asset.symbol}>
//                       {asset.symbol}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               <Input
//                 type="number"
//                 value={borrowAmount}
//                 onChange={(e) => setBorrowAmount(e.target.value)}
//                 placeholder="0.00"
//                 className="flex-1 bg-background border-[#9945FF]/30 focus:border-[#9945FF]"
//               />
//             </div>

//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-400">Amount in USD</span>
//               <span className="text-sm">
//                 $
//                 {borrowValue.toLocaleString(undefined, {
//                   maximumFractionDigits: 2,
//                 })}
//               </span>
//             </div>

//             <div className="space-y-1">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-400">Collateral Value:</span>
//                 <span>${collateralValue.toLocaleString()}</span>
//               </div>

//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-400">Borrow Limit Used:</span>
//                 <span
//                   className={
//                     ltv > 80
//                       ? "text-red-500"
//                       : ltv > 65
//                         ? "text-yellow-500"
//                         : "text-[#14F195]"
//                   }
//                 >
//                   {ltv.toFixed(2)}%
//                 </span>
//               </div>

//               <div className="py-2">
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="text-gray-400">Health Factor:</span>
//                   <span
//                     className={
//                       ltv > 80
//                         ? "text-red-500"
//                         : ltv > 65
//                           ? "text-yellow-500"
//                           : "text-[#14F195]"
//                     }
//                   >
//                     {ltv > 0 ? (100 - ltv).toFixed(2) : "N/A"}
//                   </span>
//                 </div>
//                 <div className="h-2 bg-[#9945FF]/20 rounded-full overflow-hidden">
//                   <div
//                     className={`h-full ${ltv > 80 ? "bg-red-500" : ltv > 65 ? "bg-yellow-500" : "bg-[#14F195]"}`}
//                     style={{ width: `${Math.min(ltv, 100)}%` }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <Button
//               className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
//               disabled={
//                 !connected ||
//                 !selectedAsset ||
//                 !borrowAmount ||
//                 Number.parseFloat(borrowAmount) <= 0 ||
//                 ltv >= 90
//               }
//               onClick={handleBorrowAction}
//             >
//               {!connected
//                 ? "Connect Wallet to Borrow"
//                 : ltv >= 90
//                   ? "Borrow Limit Exceeded"
//                   : `Borrow ${selectedAsset}`}
//             </Button>
//           </div>
//         </div>
//       </CardContent>

//       <CardFooter className="flex justify-between text-sm border-t border-[#9945FF]/20 pt-4">
//         <div className="text-gray-400">Total Borrowed Value</div>
//         <div className="font-medium">
//           $
//           {totalBorrowedValue.toLocaleString(undefined, {
//             maximumFractionDigits: 2,
//           })}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };