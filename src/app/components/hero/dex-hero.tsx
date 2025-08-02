"use client";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const DexHero = () => {
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

  const [activeTab, setActiveTab] = useState("swap");

  return (
    <div className="w-full bg-gradient-to-br from-[#121216] via-[#0F0F19] to-[#121216] text-white">
      <nav
        ref={navRef}
        className="z-20 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 dark:border-slate-800 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">
                <span className="text-[#14F195]">Sol</span>
                <span className="text-[#9945FF]">Swap</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Trade
              </a>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Earn
              </a>
              <Dropdown
                title="Pools"
                isOpen={openDropdown === "Pools"}
                onToggle={() => handleDropdownToggle("Pools")}
              >
                <DropdownItem>All Pools</DropdownItem>
                <DropdownItem>My Pools</DropdownItem>
                <DropdownItem>Create Pool</DropdownItem>
              </Dropdown>
              <Dropdown
                title="Analytics"
                isOpen={openDropdown === "Analytics"}
                onToggle={() => handleDropdownToggle("Analytics")}
              >
                <DropdownItem>Overview</DropdownItem>
                <DropdownItem>Tokens</DropdownItem>
                <DropdownItem>Pairs</DropdownItem>
              </Dropdown>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Docs
              </a>
              <button className="h-9 px-4 py-2 bg-[#14F195] text-slate-900 hover:bg-[#11D688] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#14F195]"
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
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Trade
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Earn
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Pools
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Analytics
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Docs
              </a>
              <button className="mt-4 w-full h-10 px-4 py-2 bg-[#14F195] text-slate-900 hover:bg-[#11D688] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
          <div className="text-center mb-10 lg:mb-14">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] to-[#9945FF]">
                Trade Anything
              </span>
              <br />
              No Registration, No Hassle
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl md:max-w-2xl mx-auto mb-10">
              Trade tokens in seconds with the highest liquidity DEX on Solana.
              Low fees, lightning-fast transactions, and fully non-custodial.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm p-6 rounded-xl shadow-xl">
            <div className="flex mb-5 bg-slate-900/70 rounded-lg p-1">
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                  activeTab === "swap"
                    ? "bg-[#9945FF] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("swap")}
              >
                Swap
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                  activeTab === "limit"
                    ? "bg-[#9945FF] text-white"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={() => setActiveTab("limit")}
              >
                Limit
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">You Pay</span>
                  <span className="text-sm text-slate-400">
                    Balance: 0.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="0.0"
                    className="bg-transparent text-white text-2xl font-medium outline-none w-1/2"
                  />
                  <div className="flex items-center space-x-2">
                    <button className="text-xs bg-slate-600/50 hover:bg-slate-600 rounded-md px-2 py-1 text-slate-300">
                      MAX
                    </button>
                    <button className="flex items-center gap-2 bg-slate-600/50 hover:bg-slate-600 rounded-lg px-3 py-2">
                      <div className="w-6 h-6 bg-[#9945FF] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">SOL</span>
                      </div>
                      <span className="text-white font-medium">SOL</span>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center -my-2 z-10">
                <button className="bg-slate-800 border border-slate-700 rounded-full p-1">
                  <ArrowRight className="h-5 w-5 text-[#14F195] rotate-90" />
                </button>
              </div>

              <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">You Receive</span>
                  <span className="text-sm text-slate-400">
                    Balance: 0.00
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    placeholder="0.0"
                    className="bg-transparent text-white text-2xl font-medium outline-none w-1/2"
                  />
                  <button className="flex items-center gap-2 bg-slate-600/50 hover:bg-slate-600 rounded-lg px-3 py-2">
                    <div className="w-6 h-6 bg-[#14F195] rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-slate-900">USDC</span>
                    </div>
                    <span className="text-white font-medium">USDC</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Rate</span>
                <span className="text-white">1 SOL = 115.42 USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Price Impact</span>
                <span className="text-[#14F195]">0.05%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Fee</span>
                <span className="text-white">0.0005 SOL</span>
              </div>
            </div>

            <button className="h-12 w-full bg-[#14F195] hover:bg-[#11D688] text-slate-900 font-medium inline-flex items-center justify-center rounded-lg text-base transition-colors">
              Connect Wallet to Swap
            </button>
          </div>

          <div className="flex flex-wrap justify-center mt-12 gap-x-8 gap-y-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">$1.8B+</div>
              <div className="text-sm text-slate-400">24h Trading Volume</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">$580M+</div>
              <div className="text-sm text-slate-400">Total Liquidity Locked</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">2.5M+</div>
              <div className="text-sm text-slate-400">All-Time Trades</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-white mb-1">280K+</div>
              <div className="text-sm text-slate-400">Total Users</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DexHero;
