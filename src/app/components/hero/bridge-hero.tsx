"use client";
import { ArrowRight, ArrowRightLeft, ChevronDown, Menu, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const BridgeHero = () => {
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

  return (
    <div className="w-full bg-gradient-to-b from-[#0B0E11] via-[#13151D] to-[#0B0E11] text-white">
      <nav
        ref={navRef}
        className="z-20 bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 dark:border-slate-800 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">
                <span className="text-[#9945FF]">Sol</span>
                <span className="text-[#14F195]">Bridge</span>
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Dropdown
                title="Networks"
                isOpen={openDropdown === "Networks"}
                onToggle={() => handleDropdownToggle("Networks")}
              >
                <DropdownItem>Solana</DropdownItem>
                <DropdownItem>Ethereum</DropdownItem>
                <DropdownItem>Binance Smart Chain</DropdownItem>
                <DropdownItem>Polygon</DropdownItem>
                <DropdownItem>Avalanche</DropdownItem>
              </Dropdown>
              <Dropdown
                title="Bridge Assets"
                isOpen={openDropdown === "Assets"}
                onToggle={() => handleDropdownToggle("Assets")}
              >
                <DropdownItem>Tokens</DropdownItem>
                <DropdownItem>NFTs</DropdownItem>
                <DropdownItem>Liquidity</DropdownItem>
              </Dropdown>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Analytics
              </a>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Docs
              </a>
              <button className="h-9 px-4 py-2 bg-[#9945FF] text-white hover:bg-[#8A3DE0] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
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
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Networks
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Bridge Assets
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
              <button className="mt-4 w-full h-10 px-4 py-2 bg-[#9945FF] text-white hover:bg-[#8A3DE0] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
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
              <span className="text-[#14F195]">Seamless</span> Cross-Chain
              <br />
              Bridge Experience
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl md:max-w-2xl mx-auto mb-10">
              Transfer tokens and NFTs between Solana and other blockchains with lightning-fast speeds, 
              ultra-low fees, and enterprise-grade security.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-800/60 border border-slate-700/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-2/5 bg-slate-700/50 border border-slate-600/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-2">From</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#9945FF] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">ETH</span>
                      </div>
                      <select className="bg-transparent text-white border-none outline-none text-lg font-medium">
                        <option value="eth">Ethereum</option>
                        <option value="bsc">BSC</option>
                        <option value="polygon">Polygon</option>
                      </select>
                    </div>
                    <div className="flex flex-col items-end">
                      <input 
                        type="text" 
                        placeholder="0.0" 
                        className="bg-transparent text-right text-white text-lg font-medium outline-none w-full" 
                      />
                      <div className="text-xs text-slate-400">~$0.00</div>
                    </div>
                  </div>
                </div>

                <div className="p-2 bg-[#14F195]/10 border border-[#14F195]/20 rounded-full">
                  <ArrowRightLeft className="w-5 h-5 text-[#14F195]" />
                </div>

                <div className="w-full sm:w-2/5 bg-slate-700/50 border border-slate-600/50 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-2">To</div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#14F195] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">SOL</span>
                      </div>
                      <select className="bg-transparent text-white border-none outline-none text-lg font-medium">
                        <option value="sol">Solana</option>
                        <option value="avalanche">Avalanche</option>
                        <option value="near">Near</option>
                      </select>
                    </div>
                    <div className="flex flex-col items-end">
                      <input 
                        type="text" 
                        placeholder="0.0" 
                        className="bg-transparent text-right text-white text-lg font-medium outline-none w-full" 
                      />
                      <div className="text-xs text-slate-400">~$0.00</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2 text-sm text-slate-400">
                <div>Estimated Time: ~2 minutes</div>
                <div>Fee: 0.1%</div>
              </div>

              <button className="h-12 w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white inline-flex items-center justify-center rounded-lg text-base font-medium transition-all">
                Bridge Assets
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center mt-12 gap-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9945FF]/20 mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-white">$2B+</p>
                <p className="text-sm text-slate-400">Total Volume</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#14F195]/20 mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="#14F195" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-white">2.5M+</p>
                <p className="text-sm text-slate-400">Transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#9945FF]/20 mr-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="#9945FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium text-white">150,000+</p>
                <p className="text-sm text-slate-400">Unique Users</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BridgeHero;
