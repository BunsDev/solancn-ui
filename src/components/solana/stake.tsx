
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export function StakeComponent() {
return (
<Card className="w-[600px] bg-black text-text border border-[#9945FF]/20">
<CardHeader className="border-b border-[#9945FF]/20">
  <CardTitle className="text-[#14F195]">Stake SOL</CardTitle>
  <CardDescription className="text-gray-400">
    Earn rewards by staking your SOL
  </CardDescription>
</CardHeader>
<CardContent className="pt-6">
  <Tabs defaultValue="stake" className="w-full">
    <TabsList className="grid w-full grid-cols-2 bg-black border border-[#9945FF]/30">
      <TabsTrigger value="stake" className="data-[state=active]:bg-[#9945FF]/20">Stake</TabsTrigger>
      <TabsTrigger value="unstake" className="data-[state=active]:bg-[#9945FF]/20">Unstake</TabsTrigger>
    </TabsList>
    
    <TabsContent value="stake" className="space-y-6 mt-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Amount to Stake</span>
          <span className="text-sm text-gray-400">Balance: 0.00 SOL</span>
        </div>
        <div className="flex space-x-2">
          <Input 
            type="number" 
            placeholder="0.00" 
            className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]" 
          />
          <Button className="bg-[#9945FF]/10 hover:bg-[#9945FF]/20 text-[#9945FF] border border-[#9945FF]/30">
            MAX
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 bg-[#9945FF]/10 p-4 rounded-md">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Current APY</span>
          <span className="text-[#14F195] font-medium">~6.9%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated Daily Rewards</span>
          <span>0.00 SOL</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated Monthly Rewards</span>
          <span>0.00 SOL</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Unstaking Period</span>
          <span>~3-4 days</span>
        </div>
      </div>
      
      <div className="pt-2">
        <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
          Connect Wallet to Stake
        </Button>
      </div>
    </TabsContent>
    
    <TabsContent value="unstake" className="space-y-6 mt-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Your Staked SOL</span>
          <span className="text-sm">0.00 SOL</span>
        </div>
        
        <Card className="bg-black border border-[#9945FF]/20">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Staking Validator</span>
              <span className="text-sm">Solana Foundation</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <span className="text-sm text-[#14F195]">Active</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Commission</span>
                <span>5%</span>
              </div>
              <Progress
                value={5} 
                className="h-1 bg-[#9945FF]/20" 
                indicatorClassName="bg-[#14F195]" 
                />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Input 
                type="number" 
                placeholder="0.00" 
                className="flex-1 bg-black border-[#9945FF]/30 focus:border-[#9945FF]" 
              />
              <Button className="bg-[#9945FF]/10 hover:bg-[#9945FF]/20 text-[#9945FF] border border-[#9945FF]/30">
                MAX
              </Button>
            </div>
            
            <Button variant="outline" className="w-full border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10">
              Unstake
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  </Tabs>
</CardContent>

<CardFooter className="border-t border-[#9945FF]/20 pt-4">
  <div className="w-full space-y-3">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">Total Staked</span>
      <span>13.4M SOL</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">Active Validators</span>
      <span>1,923</span>
    </div>
  </div>
</CardFooter>
</Card>
);  
}

export const stake = {
  name: "stake",
  components: {
    Default: <StakeComponent />,
  },
};