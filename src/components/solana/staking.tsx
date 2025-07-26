"use client";

import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWallet } from "@solana/wallet-adapter-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Mock staking validators
const validators = [
  {
    id: "marinade",
    name: "Marinade Finance",
    logo: "https://cryptologos.cc/logos/marinade-mnde-logo.png",
    apy: 6.2,
    totalStaked: 28456789,
    commission: 3.0,
    uptime: 99.9,
    description: "Liquid staking protocol that unlocks liquidity of staked SOL tokens.",
    status: "active",
  },
  {
    id: "lido",
    name: "Lido",
    logo: "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
    apy: 6.1,
    totalStaked: 35789432,
    commission: 3.5,
    uptime: 99.8,
    description: "Liquid staking solution for proof-of-stake blockchains.",
    status: "active",
  },
  {
    id: "jito",
    name: "Jito",
    logo: "https://pbs.twimg.com/profile_images/1516145916517535753/xGgXbZeW_400x400.jpg",
    apy: 6.8,
    totalStaked: 18256432,
    commission: 3.0,
    uptime: 99.9,
    description: "MEV-aware validator for Solana with optimal rewards.",
    status: "active",
  },
  {
    id: "socean",
    name: "Socean",
    logo: "https://pbs.twimg.com/profile_images/1425104169586495488/d1_vF55r_400x400.jpg",
    apy: 6.5,
    totalStaked: 12458976,
    commission: 3.2,
    uptime: 99.7,
    description: "Auto-diversification across multiple validators for reduced risk.",
    status: "active",
  },
  {
    id: "chorus",
    name: "Chorus One",
    logo: "https://pbs.twimg.com/profile_images/1326904766355673088/iOC0JQ5v_400x400.png",
    apy: 6.3,
    totalStaked: 15789543,
    commission: 3.1,
    uptime: 99.8,
    description: "Professional validator operator across multiple proof-of-stake networks.",
    status: "active",
  },
];

// Mock user's staking positions
const userStakingPositions = [
  {
    id: "stake1",
    validator: "marinade",
    amount: 24.5,
    rewards: 0.068,
    startDate: "2025-05-15",
    endDate: "2025-08-15",
    lockPeriod: "90",
    autoCompound: true,
    status: "active",
  },
  {
    id: "stake2", 
    validator: "jito",
    amount: 12.8,
    rewards: 0.041,
    startDate: "2025-06-02",
    lockPeriod: "30",
    autoCompound: false,
    status: "active",
  },
];

export default function StakingComponent() {
  const { connected } = useWallet();
  const [selectedValidator, setSelectedValidator] = useState(validators[0]);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeTab, setStakeTab] = useState("stake"); // "stake" or "unstake"
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lockPeriod, setLockPeriod] = useState("0"); // "0" for no lock, "30", "60", "90" days
  const [autoCompound, setAutoCompound] = useState(true);

  // Calculate estimated rewards based on stake amount and APY
  const calculateEstimatedRewards = () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) return "0.00";
    
    const amount = Number.parseFloat(stakeAmount);
    const dailyRate = selectedValidator.apy / 36500; // Daily interest rate
    const days = lockPeriod === "0" ? 30 : Number.parseInt(lockPeriod, 10); // Default preview for 30 days
    
    let total = amount;
    if (autoCompound) {
      // Compound daily
      for (let i = 0; i < days; i++) {
        total *= (1 + dailyRate);
      }
      return (total - amount).toFixed(4);
    }
    // Simple interest
    return (amount * dailyRate * days).toFixed(4);
  };

  // Format large numbers with K, M, B suffix
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Calculate total staked by user
  const getTotalStaked = () => {
    return userStakingPositions.reduce((total, pos) => total + pos.amount, 0);
  };

  // Calculate total rewards
  const getTotalRewards = () => {
    return userStakingPositions.reduce((total, pos) => total + pos.rewards, 0);
  };

  // Find validator data by ID
  const getValidatorById = (id: string) => {
    return validators.find(v => v.id === id) || validators[0];
  };

  interface ValidatorCardProps {
    validator: any; // Using any temporarily - would define a proper Validator interface in a production app
    isSelected: boolean;
    onSelect: (validator: any) => void;
  }

  // Validator selector card component
  const ValidatorCard = ({ validator, isSelected, onSelect }: ValidatorCardProps) => (
    <Card 
      className={`bg-black hover:bg-[#9945FF]/5 transition-all cursor-pointer ${
        isSelected ? 'border-[#9945FF]' : 'border-[#9945FF]/20'
      }`}
      onClick={() => onSelect(validator)}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
          <img 
            src={validator.logo} 
            alt={validator.name}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{validator.name}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-[#14F195]">{validator.apy}% APY</span>
            <span className="text-xs text-gray-400">{formatLargeNumber(validator.totalStaked)} SOL staked</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  interface StakingPositionProps {
    position: {
      id: string;
      validator: string;
      amount: number;
      startDate: string;
      endDate?: string;
      rewards: number;
      lockPeriod: string;
      autoCompound: boolean;
    };
  }

  // Staking position card
  const StakingPositionCard = ({ position }: StakingPositionProps) => {
    const validator = getValidatorById(position.validator);
    
    return (
      <Card className="bg-black border border-[#9945FF]/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src={validator.logo} 
                  alt={validator.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium">{validator.name}</h3>
                <p className="text-xs text-gray-400">Since {new Date(position.startDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{position.amount} SOL</p>
              <p className="text-xs text-[#14F195]">+{position.rewards} SOL</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Rewards accruing</span>
              <span className="text-[#14F195]">{validator.apy}% APY</span>
            </div>
            <Progress value={33} className="h-1.5 bg-[#9945FF]/20">
              <div className="bg-gradient-to-r from-[#9945FF] to-[#14F195] h-full" />
            </Progress>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-[#9945FF]/30 hover:bg-[#9945FF]/10"
            >
              Unstake
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 border-[#14F195]/30 hover:bg-[#14F195]/10 text-[#14F195]"
            >
              Claim {position.rewards} SOL
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Staked Card */}
        <Card className="bg-black border border-[#9945FF]/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Total Staked</CardDescription>
            <CardTitle className="text-3xl">{connected ? getTotalStaked().toFixed(2) : "0.00"} SOL</CardTitle>
          </CardHeader>
          <CardContent>
            {connected && (
              <div className="text-sm text-gray-400">
                Across {userStakingPositions.length} validators
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Rewards Card */}
        <Card className="bg-black border border-[#9945FF]/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Total Rewards</CardDescription>
            <CardTitle className="text-3xl text-[#14F195]">+{connected ? getTotalRewards().toFixed(4) : "0.0000"} SOL</CardTitle>
          </CardHeader>
          <CardContent>
            {connected && (
              <div className="text-sm text-gray-400">
                {(getTotalRewards() / getTotalStaked() * 100).toFixed(2)}% return so far
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Network Stats Card */}
        <Card className="bg-black border border-[#9945FF]/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-gray-400">Network Stats</CardDescription>
            <CardTitle className="text-xl">Solana Staking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-400">Avg. APY</p>
                <p className="font-medium text-[#14F195]">
                  {(validators.reduce((sum, v) => sum + v.apy, 0) / validators.length).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-gray-400">Total Staked</p>
                <p className="font-medium">
                  {formatLargeNumber(validators.reduce((sum, v) => sum + v.totalStaked, 0))} SOL
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Staking Interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Staking Form */}
        <div className="md:col-span-2">
          <Card className="bg-black border border-[#9945FF]/20">
            <CardHeader>
              <CardTitle className="text-[#14F195]">Stake SOL</CardTitle>
              <CardDescription className="text-gray-400">
                Earn rewards by staking your SOL with validators
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stake/Unstake Tabs */}
              <Tabs defaultValue="stake" value={stakeTab} onValueChange={setStakeTab}>
                <TabsList className="bg-black border border-[#9945FF]/20">
                  <TabsTrigger value="stake" className="data-[state=active]:bg-[#9945FF]">
                    Stake
                  </TabsTrigger>
                  <TabsTrigger value="unstake" className="data-[state=active]:bg-[#9945FF]">
                    Unstake
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="stake" className="space-y-6 mt-4">
                  {/* Validator Selection */}
                  <div className="space-y-4">
                    <label htmlFor="validator-selection" className="text-sm text-gray-400">Select Validator</label>
                    <div className="space-y-2" id="validator-selection">
                      {validators.slice(0, 3).map((validator) => (
                        <ValidatorCard 
                          key={validator.id}
                          validator={validator}
                          isSelected={selectedValidator.id === validator.id}
                          onSelect={setSelectedValidator}
                        />
                      ))}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full text-[#9945FF] hover:bg-[#9945FF]/10"
                    >
                      View all validators
                    </Button>
                  </div>
                  
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label htmlFor="stake-amount" className="text-sm text-gray-400">Amount to Stake</label>
                    <div className="flex space-x-2">
                      <Input
                        id="stake-amount"
                        type="number"
                        placeholder="0.00"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="bg-black border-[#9945FF]/30"
                      />
                      <Button 
                        variant="outline"
                        className="border-[#9945FF]/30 hover:bg-[#9945FF]/10"
                        onClick={() => setStakeAmount("42.69")} // Mock max amount
                      >
                        MAX
                      </Button>
                    </div>
                  </div>
                  
                  {/* Advanced Options */}
                  <div>
                    <Button 
                      variant="ghost" 
                      className="w-full flex items-center justify-between text-[#9945FF] hover:bg-[#9945FF]/10 p-2 h-auto"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                      <span>Advanced Options</span>
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
                        className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </Button>
                    
                    {showAdvanced && (
                      <div className="pt-4 space-y-4">
                        {/* Lock Period */}
                        <div>
                          <div className="flex flex-col space-y-2">
                            <span id="lock-period-label" className="text-sm text-gray-400">Lock Period</span>
                            <Select 
                              value={lockPeriod}
                              onValueChange={setLockPeriod}
                              aria-labelledby="lock-period-label"
                            >
                              <SelectTrigger className="bg-black border-[#9945FF]/30">
                                <SelectValue id="lock-period" placeholder="Select lock period" />
                              </SelectTrigger>
                              <SelectContent className="bg-black border-[#9945FF]/30">
                                <SelectItem value="0">No lock (unstake anytime)</SelectItem>
                                <SelectItem value="30">30 days (+0.5% APY boost)</SelectItem>
                                <SelectItem value="60">60 days (+1.0% APY boost)</SelectItem>
                                <SelectItem value="90">90 days (+1.5% APY boost)</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-400">
                              Locking your stake increases rewards but prevents unstaking until the period ends
                            </p>
                          </div>
                        </div>
                        
                        {/* Auto-compound Toggle */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Auto-compound Rewards</Label>
                            <p className="text-xs text-gray-400">
                              Automatically adds rewards to your stake for higher returns
                            </p>
                          </div>
                          <Switch 
                            checked={autoCompound}
                            onCheckedChange={setAutoCompound}
                            className="data-[state=checked]:bg-[#14F195]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Staking Details */}
                  {stakeAmount && Number(stakeAmount) > 0 && (
                    <div className="bg-[#9945FF]/10 p-4 rounded-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Validator</span>
                        <span>{selectedValidator.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">APY</span>
                        <span className="text-[#14F195]">
                          {selectedValidator.apy}% 
                          {lockPeriod !== "0" && (
                            <span> + {(Number.parseInt(lockPeriod, 10) / 60).toFixed(1)}%</span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Est. 30-day rewards</span>
                        <span className="text-[#14F195]">+{calculateEstimatedRewards()} SOL</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Unstake period</span>
                        <span>{lockPeriod === "0" ? "~3 days" : `${lockPeriod} days lock + ~3 days`}</span>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="unstake" className="space-y-4 mt-4">
                  {connected ? (
                    userStakingPositions.length > 0 ? (
                      <div className="space-y-4">
                        <p className="text-sm text-gray-400">
                          Select a staking position to unstake
                        </p>
                        
                        {userStakingPositions.map((position) => (
                          <Card key={position.id} className="bg-black border border-[#9945FF]/20">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={getValidatorById(position.validator).logo} 
                                      alt={getValidatorById(position.validator).name}
                                      className="w-8 h-8 object-contain"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{getValidatorById(position.validator).name}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-sm">{position.amount} SOL</span>
                                      <span className="text-xs text-[#14F195]">+{position.rewards} SOL rewards</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Select>
                                  <SelectTrigger className="w-[120px] bg-black border-[#9945FF]/30">
                                    <SelectValue placeholder="Amount" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black border-[#9945FF]/30">
                                    <SelectItem value="25">25%</SelectItem>
                                    <SelectItem value="50">50%</SelectItem>
                                    <SelectItem value="75">75%</SelectItem>
                                    <SelectItem value="100">100%</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <Button 
                                className="w-full mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
                              >
                                Unstake
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                        
                        <div className="bg-[#9945FF]/10 p-4 rounded-md">
                          <p className="text-sm text-gray-400">
                            Note: Unstaking typically takes around 3 days to process due to Solana epoch timing. 
                            Your funds will be locked during this period.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="mb-2">You don't have any active staking positions</p>
                        <Button 
                          onClick={() => setStakeTab("stake")}
                          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
                        >
                          Stake SOL first
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-6">
                      <p className="mb-2">Connect your wallet to view staking positions</p>
                      <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                        Connect Wallet
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter>
              {stakeTab === "stake" ? (
                connected ? (
                  <Button 
                    className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
                    disabled={!stakeAmount || Number(stakeAmount) <= 0}
                  >
                    Stake {stakeAmount} SOL
                  </Button>
                ) : (
                  <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                    Connect Wallet
                  </Button>
                )
              ) : null}
            </CardFooter>
          </Card>
        </div>
        
        {/* Info Card */}
        <div className="md:col-span-1">
          <Card className="bg-black border border-[#9945FF]/20">
            <CardHeader>
              <CardTitle className="text-[#14F195]">About {selectedValidator.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedValidator.logo} 
                    alt={selectedValidator.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{selectedValidator.name}</h3>
                  <p className="text-sm text-[#14F195]">{selectedValidator.apy}% APY</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400">
                {selectedValidator.description}
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#9945FF]/5 p-3 rounded-md">
                  <p className="text-xs text-gray-400">Total Staked</p>
                  <p className="font-medium">{formatLargeNumber(selectedValidator.totalStaked)} SOL</p>
                </div>
                <div className="bg-[#9945FF]/5 p-3 rounded-md">
                  <p className="text-xs text-gray-400">Commission</p>
                  <p className="font-medium">{selectedValidator.commission}%</p>
                </div>
                <div className="bg-[#9945FF]/5 p-3 rounded-md">
                  <p className="text-xs text-gray-400">Uptime</p>
                  <p className="font-medium">{selectedValidator.uptime}%</p>
                </div>
                <div className="bg-[#9945FF]/5 p-3 rounded-md">
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="font-medium text-[#14F195] capitalize">{selectedValidator.status}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline"
                  className="w-full border-[#9945FF]/30 hover:bg-[#9945FF]/10"
                >
                  Visit Website
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black border border-[#9945FF]/20 mt-6">
            <CardHeader>
              <CardTitle className="text-[#14F195]">Staking FAQ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">What is staking?</h3>
                <p className="text-sm text-gray-400">
                  Staking is the process of delegating SOL to validators who help secure the Solana network, 
                  and earning rewards in return.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How are rewards calculated?</h3>
                <p className="text-sm text-gray-400">
                  Rewards are based on validator performance, network inflation rate, and total amount staked. 
                  Rewards are earned every epoch (2-3 days).
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">How long does unstaking take?</h3>
                <p className="text-sm text-gray-400">
                  Unstaking takes about 3 days (one epoch) to complete on Solana. Your tokens remain locked 
                  during this cooldown period.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Active Staking Positions */}
      {connected && userStakingPositions.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Your Staking Positions</h2>
            <Button 
              variant="outline"
              className="border-[#9945FF]/30 hover:bg-[#9945FF]/10"
            >
              Claim All Rewards
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userStakingPositions.map((position) => (
              <StakingPositionCard key={position.id} position={position} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const staking = {
  name: "staking",
  components: {
    Default: <StakingComponent />,
  },
};
