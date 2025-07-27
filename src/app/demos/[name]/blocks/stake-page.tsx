"use client";

import { useState } from "react";
import { BarChart, ChevronRight, Clock, Shield, Zap, Info, HelpCircle, BarChart3, PlusCircle, MinusCircle, History } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Define validator interface
interface Validator {
  name: string;
  logo: string;
  commission: number;
  apy: number;
  totalStake: number;
  status: string;
  identity: string;
}

// Mock validator data
const validators: Validator[] = [
  { 
    name: "Solana Foundation", 
    logo: "/images/validators/solana-foundation.png",
    commission: 0, 
    apy: 7.8, 
    totalStake: 1250000, 
    status: "active",
    identity: "3Zra33FZk957ygn5D9xPQxBtMsx6nNZU7Pk1C8JLkMmN" 
  },
  { 
    name: "Marinade Finance", 
    logo: "/images/validators/marinade.png",
    commission: 3, 
    apy: 7.6, 
    totalStake: 950000, 
    status: "active",
    identity: "Ev7SHLyf7kdHt36jnGj4MR5KLMZU5Quxt5XRF6YFLdF3" 
  },
  { 
    name: "Lido", 
    logo: "/images/validators/lido.png",
    commission: 2, 
    apy: 7.5, 
    totalStake: 1050000, 
    status: "active",
    identity: "D4jS6JLJfKMYfJCAgrdLGUY4MeW7iGxi2zxgT1MwGYh6" 
  },
  { 
    name: "Jito", 
    logo: "/images/validators/jito.png",
    commission: 5, 
    apy: 8.2, 
    totalStake: 800000, 
    status: "active",
    identity: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn" 
  },
  { 
    name: "JPool", 
    logo: "/images/validators/jpool.png",
    commission: 4, 
    apy: 7.7, 
    totalStake: 650000, 
    status: "active",
    identity: "5BAi9YGCmEtHGs9ZcbJFz4FCxap6maH2g7YNXFTUXh4F" 
  },
];

// Define staking history interface
interface StakingHistoryItem {
  action: string;
  amount: number;
  validator: string;
  timestamp: Date;
  rewards: number;
  status: string;
}

// Mock staking history
const stakingHistory: StakingHistoryItem[] = [
  { action: "stake", amount: 5.5, validator: "Solana Foundation", timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), rewards: 0.05, status: "active" },
  { action: "claim", amount: 0.2, validator: "Marinade Finance", timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), rewards: 0, status: "completed" },
  { action: "unstake", amount: 2.0, validator: "Jito", timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), rewards: 0.1, status: "completed" },
];

interface StakingOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  apy: number;
  minAmount: number;
  lockupPeriod: number | null;
  earlyWithdrawalPenalty: number | null;
}

// Different staking options
const stakingOptions: StakingOption[] = [
  {
    id: "native",
    name: "Native Staking",
    description: "Stake directly with validators",
    icon: <Shield className="h-5 w-5 text-[#14F195]" />,
    apy: 7.8,
    minAmount: 1,
    lockupPeriod: 2,  // days
    earlyWithdrawalPenalty: null,
  },
  {
    id: "liquid",
    name: "Liquid Staking",
    description: "Get liquid staking tokens (LSTs)",
    icon: <Zap className="h-5 w-5 text-[#9945FF]" />,
    apy: 7.5,
    minAmount: 0.01,
    lockupPeriod: null,
    earlyWithdrawalPenalty: null,
  },
];

// Helper components with proper types
interface ValidatorRowProps {
  validator: Validator;
  isSelected: boolean;
  onSelect: (validator: Validator) => void;
}

const ValidatorRow = ({ validator, isSelected, onSelect }: ValidatorRowProps) => (
  <div 
    className={`p-3 border rounded-lg mb-2 cursor-pointer transition-all ${isSelected ? 'border-[#9945FF] bg-[#9945FF]/5' : 'border-border hover:border-[#9945FF]/50'}`}
    onClick={() => onSelect(validator)}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          {validator.logo ? (
            <div className="w-7 h-7 rounded-full bg-background flex items-center justify-center">
              <span className="text-xs font-semibold">{validator.name.substring(0, 2)}</span>
            </div>
          ) : (
            <Shield className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div>
          <div className="font-medium">{validator.name}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[120px]">{validator.identity.slice(0, 8)}...</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium text-[#14F195]">{validator.apy.toFixed(1)}%</div>
        <div className="text-xs text-muted-foreground">{validator.commission}% fee</div>
      </div>
    </div>
  </div>
);

interface StakeSummaryProps {
  amount: number;
  validator: Validator | null;
  option: StakingOption | null;
  estimatedRewards: number;
}

const StakeSummary = ({ amount, validator, option, estimatedRewards }: StakeSummaryProps) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <div className="text-sm text-muted-foreground">Amount</div>
      <div className="font-medium">{amount} SOL</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-sm text-muted-foreground">Validator</div>
      <div className="font-medium">{validator?.name || "Not selected"}</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-sm text-muted-foreground">Staking Method</div>
      <div className="font-medium">{option?.name || "Not selected"}</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-sm text-muted-foreground">APY</div>
      <div className="font-medium text-[#14F195]">{(validator?.apy || option?.apy || 0).toFixed(1)}%</div>
    </div>
    {option?.lockupPeriod && (
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">Lockup Period</div>
        <div className="font-medium">{option.lockupPeriod} days</div>
      </div>
    )}
    <Separator />
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium">Estimated Daily Rewards</div>
      <div className="font-medium text-[#14F195]">{estimatedRewards.toFixed(6)} SOL</div>
    </div>
    <div className="flex justify-between items-center">
      <div className="text-sm font-medium">Estimated Monthly Rewards</div>
      <div className="font-medium text-[#14F195]">{(estimatedRewards * 30).toFixed(6)} SOL</div>
    </div>
  </div>
);

interface HistoryItemProps {
  item: StakingHistoryItem;
}

const HistoryItem = ({ item }: HistoryItemProps) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center">
            <Badge 
              variant={item.action === "stake" ? "default" : item.action === "unstake" ? "outline" : "secondary"}
              className={`mr-2 ${item.action === "stake" ? "bg-green-500/20 text-green-500" : item.action === "unstake" ? "border-orange-500 text-orange-500" : "bg-blue-500/20 text-blue-500"}`}
            >
              {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
            </Badge>
            <span className="font-medium">{item.amount} SOL</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{item.validator}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">{formatDate(item.timestamp)}</div>
          {item.rewards > 0 && (
            <div className="text-xs text-[#14F195] mt-1">+{item.rewards} SOL rewards</div>
          )}
        </div>
      </div>
    </div>
  );
};

const StakeContent = () => {
  // State management with proper types
  const [activeTab, setActiveTab] = useState("stake");
  const [amount, setAmount] = useState("1.0");
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(null);
  const [selectedOption, setSelectedOption] = useState<StakingOption>(stakingOptions[0]);
  const [stakeInProgress, setStakeInProgress] = useState(false);

  // Calculate estimated rewards
  const numericAmount = parseFloat(amount) || 0;
  const validatorApy = selectedValidator?.apy || selectedOption?.apy || 0;
  const estimatedDailyRewards = (numericAmount * (validatorApy / 100)) / 365;

  // Handle input change with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Handle stake action
  const handleStake = () => {
    if (!selectedValidator) {
      toast.error("Validator required", { description: "Please select a validator to stake with" });
      return;
    }

    if (numericAmount < (selectedOption?.minAmount || 0)) {
      toast.error("Insufficient amount", { 
        description: `Minimum staking amount is ${selectedOption?.minAmount} SOL` 
      });
      return;
    }

    setStakeInProgress(true);

    // Simulate transaction processing
    setTimeout(() => {
      toast.success("Staking successful", { 
        description: `Successfully staked ${numericAmount} SOL with ${selectedValidator.name}` 
      });
      setStakeInProgress(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-text w-full">
      <header className="border-b border-[#9945FF]/20 p-4 sticky top-0 z-10 bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[#9945FF]/20 p-2 rounded-md text-text">
            <div className="w-8 h-8 cursor-pointer rounded-full bg-gradient-to-r from-[#9945FF] to-[#14F195] flex items-center justify-center">
              <BarChart className="text-text w-4 h-4" />
            </div>
            <h1 className="text-2xl font-bold">Stake</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 container mx-auto max-w-6xl">
        <div className="py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Staking options and validator selection */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="stake" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Stake Solana</CardTitle>
                      <CardDescription>Earn passive rewards by staking your SOL</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (SOL)</Label>
                        <div className="flex items-center space-x-2">
                          <Input 
                            id="amount"
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0.0"
                            className="font-medium text-lg"
                          />
                          <Button variant="outline" size="sm" onClick={() => setAmount("1.0")}>
                            MIN
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setAmount("10.0")}>
                            MAX
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Minimum stake amount: {selectedOption?.minAmount || 1} SOL
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Staking Method</Label>
                        <RadioGroup 
                          defaultValue={selectedOption.id}
                          onValueChange={(value) => {
                            const option = stakingOptions.find(o => o.id === value);
                            if (option) setSelectedOption(option);
                          }}
                          className="grid grid-cols-2 gap-4"
                        >
                          {stakingOptions.map(option => (
                            <div key={option.id}>
                              <RadioGroupItem 
                                value={option.id} 
                                id={option.id}
                                className="peer sr-only"
                              />
                              <Label 
                                htmlFor={option.id}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-muted peer-data-[state=checked]:border-[#9945FF] peer-data-[state=checked]:bg-[#9945FF]/5 cursor-pointer"
                              >
                                {option.icon}
                                <div className="mt-3 font-medium text-center">{option.name}</div>
                                <div className="text-xs text-center text-muted-foreground mt-1">{option.description}</div>
                                <div className="text-[#14F195] font-medium mt-2">{option.apy}% APY</div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Select Validator</Label>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 px-2 text-xs text-muted-foreground"
                            onClick={() => toast.info("Learn about validators", { description: "Validators secure the Solana network and process transactions" })}
                          >
                            <HelpCircle className="h-3 w-3 mr-1" />
                            What are validators?
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                          {validators.map(validator => (
                            <ValidatorRow 
                              key={validator.identity} 
                              validator={validator} 
                              isSelected={selectedValidator?.identity === validator.identity}
                              onSelect={setSelectedValidator}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white"
                        onClick={handleStake}
                        disabled={stakeInProgress || !numericAmount || !selectedValidator}
                      >
                        {stakeInProgress ? "Processing..." : "Stake SOL"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="unstake">
                  <Card>
                    <CardHeader>
                      <CardTitle>Unstake Solana</CardTitle>
                      <CardDescription>Withdraw your staked SOL and rewards</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 py-8">
                      <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto py-8">
                        <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Active Stakes Found</h3>
                        <p className="text-muted-foreground text-sm mb-6">You don't have any active staking positions to unstake.</p>
                        <Button variant="outline" onClick={() => setActiveTab("stake")}>
                          Stake SOL to Get Started
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Staking History
                      </CardTitle>
                      <CardDescription>Your recent staking activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {stakingHistory.length > 0 ? (
                        <div className="space-y-1">
                          {stakingHistory.map((item, i) => (
                            <HistoryItem key={i} item={item} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No staking history found
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Staking summary */}
            <div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Staking Summary</CardTitle>
                    <CardDescription>Review your staking details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StakeSummary 
                      amount={numericAmount} 
                      validator={selectedValidator} 
                      option={selectedOption}
                      estimatedRewards={estimatedDailyRewards}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Current Network Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Validators</span>
                      <span className="font-medium">1,967</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total SOL Staked</span>
                      <span className="font-medium">372.4M SOL</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Network Stake Rate</span>
                      <span className="font-medium">76.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average APY</span>
                      <span className="font-medium text-[#14F195]">7.6%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#9945FF]/5 border-[#9945FF]/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#9945FF]/20 rounded-full p-2">
                        <Info className="h-4 w-4 text-[#9945FF]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Staking Tips</h4>
                        <ul className="text-xs space-y-2 text-muted-foreground">
                          <li className="flex items-start gap-1">
                            <ChevronRight className="h-3 w-3 text-[#9945FF] shrink-0 mt-0.5" />
                            <span>Staked SOL has a cooling period of 2-3 days when unstaking</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <ChevronRight className="h-3 w-3 text-[#9945FF] shrink-0 mt-0.5" />
                            <span>Rewards are automatically added to your stake</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <ChevronRight className="h-3 w-3 text-[#9945FF] shrink-0 mt-0.5" />
                            <span>Consider validator reliability and performance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function StakePage() {
  return <StakeContent />;
}
