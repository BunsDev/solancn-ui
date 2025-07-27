
// Mock portfolio data
export const mockDeFiPortfolioValue = {
    total: 12547.89,
    change: 348.26,
    changePercent: 2.85,
    history: [
      { date: "Jan", value: 9845 },
      { date: "Feb", value: 10254 },
      { date: "Mar", value: 10897 },
      { date: "Apr", value: 11452 },
      { date: "May", value: 11021 },
      { date: "Jun", value: 12198 },
      { date: "Jul", value: 12547.89 },
    ]
  };
  
  export const mockDeFiPortfolioAssets = [
    { 
      symbol: "SOL", 
      name: "Solana",
      price: 57.24, 
      balance: 120, 
      value: 6868.8,
      allocation: 54.74,
      change24h: 3.5,
      apy: 6.2,
    },
    { 
      symbol: "BTC", 
      name: "Bitcoin (Wrapped)",
      price: 50213.87, 
      balance: 0.045, 
      value: 2259.62,
      allocation: 18.01,
      change24h: 1.2,
      apy: 0,
    },
    { 
      symbol: "USDC", 
      name: "USD Coin",
      price: 1.00, 
      balance: 1820.42, 
      value: 1820.42,
      allocation: 14.51,
      change24h: 0.01,
      apy: 5.8,
    },
    { 
      symbol: "ETH", 
      name: "Ethereum (Wrapped)",
      price: 2489.53, 
      balance: 0.24, 
      value: 597.49,
      allocation: 4.76,
      change24h: -0.8,
      apy: 4.2,
    },
    { 
      symbol: "JUP", 
      name: "Jupiter",
      price: 0.68, 
      balance: 1472.5, 
      value: 1001.3,
      allocation: 7.98,
      change24h: 12.4,
      apy: 0,
    }
  ];
  
  export const mockDeFiYieldOpportunities = [
    {
      id: 1,
      protocol: "Marinade Finance",
      asset: "SOL",
      apy: "6.2%",
      tvl: "$845M",
      risk: "Low",
      logo: "/logos/marinade-sol-logo.png",
    },
    {
      id: 2,
      protocol: "Jito",
      asset: "SOL",
      apy: "6.8%",
      tvl: "$620M",
      risk: "Low",
      logo: "/logos/jito-logo.png",
    },
    {
      id: 3,
      protocol: "Orca",
      asset: "SOL/USDC",
      apy: "12.4%",
      tvl: "$85M",
      risk: "Medium-High",
      logo: "/logos/orca-logo.png",
    },
    {
      id: 4,
      protocol: "Raydium",
      asset: "JUP/SOL",
      apy: "18.6%",
      tvl: "$42M",
      risk: "High",
      logo: "/logos/raydium-logo.png",
    }
  ];