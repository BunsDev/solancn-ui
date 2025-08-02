"use client";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const LendingHero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const Dropdown = ({
    title,
    children,
    isOpen,
    onToggle,
  }: {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    return (
      <div className="relative">
        <div onClick={onToggle} className="cursor-pointer">
          <div className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors">
            <span>{title}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 origin-top-right rounded-md bg-slate-800 dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none z-30">
            <div className="py-1">{children}</div>
          </div>
        )}
      </div>
    );
  };

  const DropdownItem = ({
    children,
    href = "#",
  }: {
    children: React.ReactNode;
    href?: string;
  }) => (
    <a
      href={href}
      className="text-slate-200 dark:text-slate-200 block px-4 py-2 text-sm hover:bg-slate-700 dark:hover:bg-slate-700"
    >
      {children}
    </a>
  );

  const handleDropdownToggle = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [activeTab, setActiveTab] = useState("supply");

  // Mock data for lending markets
  const markets = [
    {
      name: "SOL",
      icon: "S",
      supplyAPY: "4.21%",
      borrowAPY: "5.98%",
      liquidity: "$120,450,890",
      totalSupplied: "$82,456,123",
      totalBorrowed: "$48,756,432",
    },
    {
      name: "USDC",
      icon: "U",
      supplyAPY: "5.62%",
      borrowAPY: "7.18%",
      liquidity: "$205,780,450",
      totalSupplied: "$147,852,963",
      totalBorrowed: "$96,352,417",
    },
    {
      name: "ETH",
      icon: "E",
      supplyAPY: "3.89%",
      borrowAPY: "5.12%",
      liquidity: "$78,956,234",
      totalSupplied: "$42,781,596",
      totalBorrowed: "$31,245,678",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-[#0E1523] via-[#0E1523] to-[#0F1218] text-white min-h-screen">
      <nav
        ref={navRef}
        className="z-20 bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50 dark:border-slate-800/50 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">
                <span className="text-[#9945FF]">Sol</span>
                <span className="text-[#14F195]">Lend</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-[#14F195] hover:text-[#11D688] dark:text-[#14F195] dark:hover:text-[#11D688] transition-colors"
              >
                Markets
              </a>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Dashboard
              </a>
              <Dropdown
                title="Stake"
                isOpen={openDropdown === "Stake"}
                onToggle={() => handleDropdownToggle("Stake")}
              >
                <DropdownItem>Staking Pools</DropdownItem>
                <DropdownItem>My Stakes</DropdownItem>
                <DropdownItem>Rewards</DropdownItem>
              </Dropdown>
              <Dropdown
                title="Resources"
                isOpen={openDropdown === "Resources"}
                onToggle={() => handleDropdownToggle("Resources")}
              >
                <DropdownItem>Docs</DropdownItem>
                <DropdownItem>Risk Framework</DropdownItem>
                <DropdownItem>FAQ</DropdownItem>
              </Dropdown>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Analytics
              </a>
              <button className="h-9 px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#9945FF]"
                aria-controls="mobile-menu"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className="lg:hidden bg-slate-900 dark:bg-slate-900 border-t border-slate-800 dark:border-slate-800"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-[#14F195] hover:text-[#11D688] dark:text-[#14F195] dark:hover:text-[#11D688]"
              >
                Markets
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Stake
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Resources
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Analytics
              </a>
              <button className="mt-4 w-full h-10 px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-[#9945FF]">Lend</span> & <span className="text-[#14F195]">Borrow</span>
              <br />
              on Solana
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl md:max-w-2xl mx-auto mb-8">
              Earn interest on your assets or obtain a crypto-backed loan with
              the most secure lending protocol on Solana.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <button className="px-6 py-3 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white rounded-lg hover:opacity-90 transition-opacity">
                Start Supplying
              </button>
              <button className="px-6 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors">
                View Markets
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "supply" 
                      ? "bg-[#9945FF]/20 text-[#9945FF] border border-[#9945FF]/30" 
                      : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("supply")}
                >
                  Supply Markets
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "borrow" 
                      ? "bg-[#14F195]/10 text-[#14F195] border border-[#14F195]/20" 
                      : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white"
                  }`}
                  onClick={() => setActiveTab("borrow")}
                >
                  Borrow Markets
                </button>
              </div>
              <div className="text-sm text-slate-400">
                Total Value Locked: <span className="text-white font-medium">$895,621,789</span>
              </div>
            </div>
            
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/60">
                      <th className="py-4 px-6 text-left text-sm font-medium text-slate-300">Asset</th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-slate-300">
                        {activeTab === "supply" ? "Supply APY" : "Borrow APY"}
                      </th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-slate-300">Total Liquidity</th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-slate-300">
                        {activeTab === "supply" ? "Total Supplied" : "Total Borrowed"}
                      </th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-slate-300"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((market, index) => (
                      <tr key={index} className={index !== markets.length - 1 ? "border-b border-slate-700/40" : ""}>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              market.name === "SOL" 
                                ? "bg-[#9945FF]" 
                                : market.name === "USDC" 
                                ? "bg-[#2775CA]" 
                                : "bg-[#627EEA]"
                            }`}>
                              <span className="text-xs font-bold text-white">{market.icon}</span>
                            </div>
                            <span className="font-medium text-white">{market.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className={`font-medium ${activeTab === "supply" ? "text-[#14F195]" : "text-[#9945FF]"}`}>
                            {activeTab === "supply" ? market.supplyAPY : market.borrowAPY}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right text-white">
                          {market.liquidity}
                        </td>
                        <td className="py-4 px-6 text-right text-white">
                          {activeTab === "supply" ? market.totalSupplied : market.totalBorrowed}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === "supply"
                              ? "bg-[#14F195] text-slate-900 hover:bg-[#11D688]"
                              : "bg-[#9945FF] text-white hover:bg-[#8A3DE0]"
                          }`}>
                            {activeTab === "supply" ? "Supply" : "Borrow"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-xl">
              <div className="text-2xl font-bold text-white mb-2">$895M+</div>
              <div className="text-slate-400">Total Value Locked</div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-xl">
              <div className="text-2xl font-bold text-white mb-2">$3.9B+</div>
              <div className="text-slate-400">Lifetime Volume</div>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/40 p-6 rounded-xl">
              <div className="text-2xl font-bold text-white mb-2">78K+</div>
              <div className="text-slate-400">Active Users</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LendingHero;
