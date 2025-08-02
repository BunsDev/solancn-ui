"use client";
import { ArrowRight, ChevronDown, Menu, X, Rocket, Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const TokenLauncherHero = () => {
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

  // Token launcher features
  const features = [
    { name: "Zero Code", description: "Launch tokens without any coding" },
    { name: "Low Cost", description: "Pay just 0.01 SOL to create a token" },
    { name: "Customizable", description: "Set supply, decimals, and more" },
    { name: "Fast Deploy", description: "Live on Solana in seconds" },
  ];

  // Mock recent tokens
  const recentTokens = [
    { name: "MEME", ticker: "MEME", price: "+1240.5%", icon: "M", color: "bg-pink-500" },
    { name: "DEGEN", ticker: "DGN", price: "+58.2%", icon: "D", color: "bg-orange-500" },
    { name: "ROCKET", ticker: "RKT", price: "+324.7%", icon: "R", color: "bg-blue-500" },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-[#0A0A14] via-[#1E1032] to-[#0A0A14] text-white">
      <nav
        ref={navRef}
        className="z-20 bg-slate-900/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-purple-900/30 dark:border-purple-900/30 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white flex items-center">
                <span className="text-[#14F195]">Sol</span>
                <span className="text-[#9945FF]">Launch</span>
                {/* <Rocket className="ml-1 w-4 h-4 text-[#14F195]" /> */}
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Create
              </a>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Explore
              </a>
              <Dropdown
                title="Tools"
                isOpen={openDropdown === "Tools"}
                onToggle={() => handleDropdownToggle("Tools")}
              >
                <DropdownItem>Token Launcher</DropdownItem>
                <DropdownItem>Token Tracker</DropdownItem>
                <DropdownItem>Liquidity Provider</DropdownItem>
              </Dropdown>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Community
              </a>
              <a
                href="#"
                className="cursor-pointer text-sm font-medium text-slate-200 hover:text-white dark:text-slate-200 dark:hover:text-white transition-colors"
              >
                Docs
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
            className="lg:hidden bg-slate-900 dark:bg-slate-900 border-t border-purple-900/30 dark:border-purple-900/30"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Create
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Explore
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Tools
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Community
              </a>
              <a
                href="#"
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800"
              >
                Docs
              </a>
              <button className="mt-4 w-full h-10 px-4 py-2 bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white hover:opacity-90 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Connect Wallet
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#9945FF]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#14F195]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-[#9945FF]/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-[#14F195]" />
              <span className="text-slate-200">No code required - Launch a token in 30 seconds</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="text-[#9945FF]">Create</span> &{" "}
              <span className="text-[#14F195]">Launch</span>
              <br />
              Your Solana Token
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl md:max-w-2xl mx-auto mb-8">
              The easiest way to create a token on Solana. Zero coding required.
              Set your token parameters, click launch, and start your project in seconds.
            </p>
          </div>

          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-5">Launch Your Token</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Token Name</label>
                    <input 
                      type="text" 
                      placeholder="My Awesome Token" 
                      className="w-full px-4 py-3 bg-slate-700/70 border border-slate-600/70 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Token Symbol</label>
                    <input 
                      type="text" 
                      placeholder="AWESOME" 
                      className="w-full px-4 py-3 bg-slate-700/70 border border-slate-600/70 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Decimals</label>
                      <select className="w-full px-4 py-3 bg-slate-700/70 border border-slate-600/70 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50">
                        <option value="9">9 (Default)</option>
                        <option value="6">6</option>
                        <option value="0">0 (No decimals)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Supply</label>
                      <input 
                        type="text" 
                        placeholder="1,000,000" 
                        className="w-full px-4 py-3 bg-slate-700/70 border border-slate-600/70 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button className="h-12 w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors shadow-lg">
                      <Rocket className="mr-2 h-5 w-5" /> Launch Token
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Launching costs 0.01 SOL
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
                    <p className="text-slate-300">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-slate-800/30 border border-slate-700/30 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4">Trending Today</h3>
                <div className="space-y-3">
                  {recentTokens.map((token, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${token.color} flex items-center justify-center mr-3`}>
                          <span className="text-xs font-bold text-white">{token.icon}</span>
                        </div>
                        <div>
                          <div className="font-medium text-white">{token.name}</div>
                          <div className="text-xs text-slate-400">${token.ticker}</div>
                        </div>
                      </div>
                      <div className="text-[#14F195] font-medium">{token.price}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/30 text-center">
                  <a href="#" className="text-sm text-[#9945FF] hover:text-[#8A3DE0] transition-colors">
                    View All Tokens
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Trusted by the Solana Community</h2>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              <div className="text-xl font-bold text-white opacity-70 hover:opacity-100 transition-opacity">20K+ Tokens</div>
              <div className="text-xl font-bold text-white opacity-70 hover:opacity-100 transition-opacity">500K+ Users</div>
              <div className="text-xl font-bold text-white opacity-70 hover:opacity-100 transition-opacity">$800M+ Volume</div>
              <div className="text-xl font-bold text-white opacity-70 hover:opacity-100 transition-opacity">Lightning Fast</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TokenLauncherHero;
