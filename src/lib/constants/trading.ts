
// Mock trading data
export const mockTradingMarketPairs = [
  { name: "SOL/USDC", price: 57.24, change: 3.2 },
  { name: "BONK/USDC", price: 0.00002341, change: -1.4 },
  { name: "JTO/USDC", price: 2.68, change: 0.5 },
  { name: "RNDR/USDC", price: 7.12, change: -0.8 },
  { name: "JUP/USDC", price: 1.43, change: 5.2 },
];

export const mockTradingOrderbook = {
  asks: [
    { price: 57.30, size: 42.5, total: 42.5 },
    { price: 57.28, size: 15.2, total: 57.7 },
    { price: 57.27, size: 8.4, total: 66.1 },
    { price: 57.26, size: 5.3, total: 71.4 },
    { price: 57.25, size: 3.1, total: 74.5 },
  ],
  bids: [
    { price: 57.23, size: 6.2, total: 6.2 },
    { price: 57.22, size: 18.7, total: 24.9 },
    { price: 57.21, size: 12.9, total: 37.8 },
    { price: 57.20, size: 25.4, total: 63.2 },
    { price: 57.19, size: 10.8, total: 74.0 },
  ],
};

export const mockTradingRecentTrades = [
  { price: 57.24, size: 1.2, time: "12:45:32", side: "buy" },
  { price: 57.23, size: 0.5, time: "12:45:30", side: "sell" },
  { price: 57.24, size: 2.0, time: "12:45:25", side: "buy" },
  { price: 57.22, size: 1.5, time: "12:45:20", side: "sell" },
  { price: 57.24, size: 0.8, time: "12:45:15", side: "buy" },
];