"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Grid2X2Icon,
  ListIcon,
  Search,
  Filter,
  X,
  Heart,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

// Mock NFT data
const nftsData = [
  {
    id: "1",
    name: "Solana Monkey #7623",
    collection: "Solana Monkey Business",
    image: "https://phantom.app/blog/content/images/2022/01/smb.jpg",
    price: 21.5,
    currency: "SOL",
    rarity: 82,
    owner: "GK72..5AxP",
    attributes: [
      { trait: "Background", value: "Purple" },
      { trait: "Fur", value: "Gold" },
      { trait: "Eyes", value: "Lazer" },
      { trait: "Clothing", value: "Solana Shirt" },
      { trait: "Hat", value: "Crown" },
    ],
    listed: true,
  },
  {
    id: "2",
    name: "DeGod #4521",
    collection: "DeGods",
    image: "/nfts/degods-nft.png",
    price: 56.3,
    currency: "SOL",
    rarity: 94,
    owner: "84Wx..9VcR",
    attributes: [
      { trait: "Background", value: "Galaxy" },
      { trait: "Body", value: "Skeleton" },
      { trait: "Eyes", value: "Diamond" },
      { trait: "Clothing", value: "Leather Jacket" },
      { trait: "Accessory", value: "Gold Chain" },
    ],
    listed: true,
  },
  {
    id: "3",
    name: "Okay Bear #2145",
    collection: "Okay Bears",
    image: "https://pbs.twimg.com/media/FRYUoXQVUAItbMC.jpg",
    price: 72.8,
    currency: "SOL",
    rarity: 89,
    owner: "5uTY..Pzw2",
    attributes: [
      { trait: "Background", value: "Green" },
      { trait: "Fur", value: "Brown" },
      { trait: "Eyes", value: "Sleepy" },
      { trait: "Clothing", value: "Hawaiian Shirt" },
      { trait: "Hat", value: "Fisherman" },
    ],
    listed: true,
  },
  {
    id: "4",
    name: "Blocksmith #8756",
    collection: "Blocksmith Labs",
    image: "https://pbs.twimg.com/media/FRAhhUPaIAAo8Ak.jpg",
    price: 12.2,
    currency: "SOL",
    rarity: 76,
    owner: "MVcx..72Qb",
    attributes: [
      { trait: "Background", value: "Workshop" },
      { trait: "Body", value: "Robot" },
      { trait: "Eyes", value: "Digital" },
      { trait: "Tool", value: "Hammer" },
      { trait: "Element", value: "Fire" },
    ],
    listed: true,
  },
  {
    id: "5",
    name: "Solana Squad #427",
    collection: "Solana Squad",
    image:
      "https://i.seadn.io/gae/fzWJqiFvTXXuIriYqQbvLzCjbp5KRpD6zJ8NU03Y8fmV5OKsUxJCobG64dQCvhJ-CJsJpjyPSaQwS_mG5Son6rzkLlVUbUBzmVUP?auto=format&dpr=1&w=1000",
    price: 5.7,
    currency: "SOL",
    rarity: 62,
    owner: "3FzT..Rn8K",
    attributes: [
      { trait: "Background", value: "City" },
      { trait: "Character", value: "Hero" },
      { trait: "Weapon", value: "Solana Sword" },
      { trait: "Armor", value: "Tech Suit" },
      { trait: "Power", value: "Speed" },
    ],
    listed: false,
  },
  {
    id: "6",
    name: "Mad Lad #1337",
    collection: "Mad Lads",
    image:
      "https://cryptotesters.com/wp-content/uploads/2023/05/Mad-Lads-NFT-collection.jpeg",
    price: 36.9,
    currency: "SOL",
    rarity: 91,
    owner: "9pQr..jK2x",
    attributes: [
      { trait: "Background", value: "Neon" },
      { trait: "Face", value: "Cyber" },
      { trait: "Eyes", value: "VR" },
      { trait: "Clothing", value: "Hacker Hoodie" },
      { trait: "Accessory", value: "Drone" },
    ],
    listed: true,
  },
  {
    id: "7",
    name: "Famous Fox #982",
    collection: "Famous Fox Federation",
    image: "https://img.seadn.io/files/661a14db1e76a3a164e3ecbe2156a2c5.png",
    price: 19.5,
    currency: "SOL",
    rarity: 84,
    owner: "7Hjk..pV5s",
    attributes: [
      { trait: "Background", value: "Forest" },
      { trait: "Fur", value: "Red" },
      { trait: "Eyes", value: "Sly" },
      { trait: "Clothing", value: "Business Suit" },
      { trait: "Accessory", value: "Pocket Watch" },
    ],
    listed: true,
  },
  {
    id: "8",
    name: "ABC #456",
    collection: "ABC Collection",
    image:
      "https://i.seadn.io/gae/K-1z3_vI91mhliMNJ-4qpWuTiYU5ACxx7U3DC0w6V_XaeGy9Ypz1P5Ngg0S7iZlKvdKJP8vgWEtKR_mR4wkVUBoWWJgPwaYxSenU?auto=format&dpr=1&w=1000",
    price: 8.3,
    currency: "SOL",
    rarity: 71,
    owner: "4rTg..2Lcv",
    attributes: [
      { trait: "Background", value: "Blue" },
      { trait: "Type", value: "Letter" },
      { trait: "Style", value: "Graffiti" },
      { trait: "Color", value: "Gold" },
      { trait: "Special", value: "Glow" },
    ],
    listed: false,
  },
];

// Mock collections data
const collections = [
  { name: "Solana Monkey Business", floor: 21.5, volume: 14563, items: 5000 },
  { name: "DeGods", floor: 56.3, volume: 28745, items: 10000 },
  { name: "Okay Bears", floor: 72.8, volume: 32456, items: 10000 },
  { name: "Blocksmith Labs", floor: 12.2, volume: 8456, items: 5555 },
  { name: "Solana Squad", floor: 5.7, volume: 3245, items: 8888 },
  { name: "Mad Lads", floor: 36.9, volume: 18456, items: 10000 },
  { name: "Famous Fox Federation", floor: 19.5, volume: 9876, items: 7777 },
  { name: "ABC Collection", floor: 8.3, volume: 4532, items: 3333 },
];

export function NFTComponent() {
  const { connected } = useWallet();
  // Using undefined initial state to prevent hydration mismatch
  const [view, setView] = useState<"grid" | "list" | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<
    "explore" | "collected" | "collections" | undefined
  >(undefined);
  const [selectedNFT, setSelectedNFT] = useState<(typeof nftsData)[0] | null>(
    null,
  );
  const [filters, setFilters] = useState({
    collection: "",
    minPrice: "",
    maxPrice: "",
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  // Initialize client-side only state after component mounts
  useEffect(() => {
    setView("grid");
    setActiveTab("explore");
    setMounted(true);
  }, []);

  // Filter NFTs based on search and filters
  const filteredNFTs = nftsData.filter((nft) => {
    const matchesSearch =
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCollection = filters.collection
      ? nft.collection === filters.collection
      : true;

    const matchesPrice =
      (!filters.minPrice || nft.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || nft.price <= Number(filters.maxPrice));

    const matchesStatus =
      filters.status === "" ||
      (filters.status === "listed" && nft.listed) ||
      (filters.status === "unlisted" && !nft.listed);

    return matchesSearch && matchesCollection && matchesPrice && matchesStatus;
  });

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      collection: "",
      minPrice: "",
      maxPrice: "",
      status: "",
    });
    setSearchQuery("");
  };

  // Handle NFT selection
  const handleSelectNFT = (nft: (typeof nftsData)[0]) => {
    setSelectedNFT(nft);
  };

  // Back to gallery
  const handleBackToGallery = () => {
    setSelectedNFT(null);
  };

  // Calculate unique collections
  const uniqueCollections = Array.from(
    new Set(nftsData.map((nft) => nft.collection)),
  );

  // NFT Card Component
  const NFTCard = ({ nft }: { nft: (typeof nftsData)[0] }) => (
    <Card
      className="bg-background border border-[#9945FF]/20 overflow-hidden hover:border-[#9945FF]/50 transition-all cursor-pointer w-full h-full"
      onClick={() => handleSelectNFT(nft)}
    >
      <div className="relative w-full h-full aspect-square overflow-hidden">
        <Image
          src={nft.image}
          alt={nft.name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-background/70 text-white hover:bg-background/80">
            {nft.rarity} Rarity
          </Badge>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm truncate">{nft.name}</h3>
            <p className="text-xs text-gray-400 truncate">{nft.collection}</p>
          </div>
          {nft.listed && (
            <div className="text-right">
              <p className="text-sm font-semibold text-[#14F195]">
                {nft.price} {nft.currency}
              </p>
              <p className="text-xs text-gray-400">Listed</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // NFT List Item Component
  const NFTListItem = ({ nft }: { nft: (typeof nftsData)[0] }) => (
    <Card
      className="bg-background border border-[#9945FF]/20 overflow-hidden hover:border-[#9945FF]/50 transition-all cursor-pointer w-full h-full"
      onClick={() => handleSelectNFT(nft)}
    >
      <div className="flex">
        <div className="w-20 h-20 relative">
          <Image
            src={nft.image}
            alt={nft.name}
            width={80}
            height={80}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-3 flex justify-between items-center">
          <div>
            <h3 className="font-medium text-sm">{nft.name}</h3>
            <p className="text-xs text-gray-400">{nft.collection}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-background/70 text-white hover:bg-background/80">
              {nft.rarity} Rarity
            </Badge>
            {nft.listed && (
              <div className="text-right">
                <p className="text-sm font-semibold text-[#14F195]">
                  {nft.price} {nft.currency}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  // Collection Card Component
  const CollectionCard = ({
    collection,
  }: { collection: (typeof collections)[0] }) => (
    <Card className="bg-background border border-[#9945FF]/20 overflow-hidden hover:border-[#9945FF]/50 transition-all cursor-pointer">
      <div className="p-4">
        <h3 className="font-medium">{collection.name}</h3>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div>
            <p className="text-xs text-gray-400">Floor</p>
            <p className="text-sm font-medium">{collection.floor} SOL</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Volume</p>
            <p className="text-sm font-medium">
              {collection.volume.toLocaleString()} SOL
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Items</p>
            <p className="text-sm font-medium">
              {collection.items.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );

  // Detail view for selected NFT
  const NFTDetailView = () => {
    if (!selectedNFT) return null;

    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          size="sm"
          className="border-[#9945FF]/30 hover:bg-[#9945FF]/10"
          onClick={handleBackToGallery}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to gallery
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NFT Image */}
          <Card className="bg-background border border-[#9945FF]/20 overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={selectedNFT.image}
                alt={selectedNFT.name}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
          </Card>

          {/* NFT Details */}
          <div className="space-y-6">
            <Card className="bg-background border border-[#9945FF]/20">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{selectedNFT.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {selectedNFT.collection}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-[#9945FF]/30 hover:bg-[#9945FF]/10"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Owner</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono">{selectedNFT.owner}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-[#9945FF]/10"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {selectedNFT.listed && (
                  <div>
                    <p className="text-sm text-gray-400">Price</p>
                    <p className="text-2xl font-semibold text-[#14F195]">
                      {selectedNFT.price} {selectedNFT.currency}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-400 mb-2">Rarity score</p>
                  <div className="w-full bg-[#9945FF]/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#9945FF] to-[#14F195] h-2 rounded-full"
                      style={{ width: `${selectedNFT.rarity}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400">Common</p>
                    <p className="text-xs text-gray-400">Legendary</p>
                  </div>
                </div>

                {selectedNFT.listed && connected && (
                  <Button className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                    Buy Now
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-background border border-[#9945FF]/20">
              <CardHeader>
                <CardTitle className="text-lg">Attributes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedNFT.attributes.map((attr) => (
                    <div
                      key={attr.trait}
                      className="bg-[#9945FF]/10 rounded-md p-2"
                    >
                      <p className="text-xs text-gray-400">{attr.trait}</p>
                      <p className="font-medium text-sm">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Filter panel
  const FilterPanel = () => (
    <Card className="bg-background border border-[#9945FF]/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" /> Filters
          </CardTitle>
          {(filters.collection ||
            filters.minPrice ||
            filters.maxPrice ||
            filters.status) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-[#9945FF] hover:text-[#9945FF] hover:bg-[#9945FF]/10"
            >
              Reset
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="collection" className="text-sm text-gray-400">
            Collection
          </label>
          <Select
            value={filters.collection}
            onValueChange={(val) => setFilters({ ...filters, collection: val })}
          >
            <SelectTrigger className="bg-background border-[#9945FF]/30">
              <SelectValue id="collection" placeholder="All collections" />
            </SelectTrigger>
            <SelectContent className="bg-background border-[#9945FF]/30">
              <SelectItem value="all">All collections</SelectItem>
              {uniqueCollections.map((collection) => (
                <SelectItem key={collection} value={collection}>
                  {collection}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="priceRange" className="text-sm text-gray-400">
            Price Range (SOL)
          </label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="minPrice"
              placeholder="Min"
              type="number"
              className="bg-background border-[#9945FF]/30"
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({ ...filters, minPrice: e.target.value })
              }
            />
            <span className="text-gray-400">to</span>
            <Input
              id="maxPrice"
              placeholder="Max"
              type="number"
              className="bg-background border-[#9945FF]/30"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({ ...filters, maxPrice: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm text-gray-400">
            Status
          </label>
          <Select
            value={filters.status}
            onValueChange={(val) => setFilters({ ...filters, status: val })}
          >
            <SelectTrigger className="bg-background border-[#9945FF]/30">
              <SelectValue id="status" placeholder="All items" />
            </SelectTrigger>
            <SelectContent className="bg-background border-[#9945FF]/30">
              <SelectItem value="all">All items</SelectItem>
              <SelectItem value="listed">Listed</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  // Only render UI after client-side hydration is complete
  if (!mounted) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-[#9945FF] rounded-full" />
          <div className="h-3 w-3 bg-[#9945FF] rounded-full" />
          <div className="h-3 w-3 bg-[#9945FF] rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {selectedNFT ? (
        <NFTDetailView />
      ) : (
        <>
          {/* Search and tabs */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as any)}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-background border border-[#9945FF]/20">
                <TabsTrigger
                  value="explore"
                  className="data-[state=active]:bg-[#9945FF]/20"
                >
                  Explore
                </TabsTrigger>
                <TabsTrigger
                  value="collected"
                  className="data-[state=active]:bg-[#9945FF]/20"
                >
                  Collected
                </TabsTrigger>
                <TabsTrigger
                  value="collections"
                  className="data-[state=active]:bg-[#9945FF]/20"
                >
                  Collections
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or collection"
                  className="bg-background border-[#9945FF]/30 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              {activeTab !== "collections" && (
                <div className="flex rounded-md border border-[#9945FF]/30">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${view === "grid" ? "bg-[#9945FF]/20" : ""}`}
                    onClick={() => setView("grid")}
                  >
                    <Grid2X2Icon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-none ${view === "list" ? "bg-[#9945FF]/20" : ""}`}
                    onClick={() => setView("list")}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters - left sidebar */}
            <div className="md:col-span-1">
              <FilterPanel />
            </div>

            {/* NFTs grid or list */}
            <Tabs value="explore" className="md:col-span-3">
              <TabsContent value="explore" className="md:col-span-3">
                {filteredNFTs.length > 0 ? (
                  <div
                    className={
                      view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                        : "flex flex-col gap-3"
                    }
                  >
                    {view === "grid"
                      ? filteredNFTs.map((nft) => (
                          <NFTCard key={nft.id} nft={nft} />
                        ))
                      : filteredNFTs.map((nft) => (
                          <NFTListItem key={nft.id} nft={nft} />
                        ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Search className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium mb-2">No NFTs found</h3>
                    <p className="text-gray-400 text-center">
                      No NFTs match your current filters. Try adjusting your
                      search criteria.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-[#9945FF]/30 hover:bg-[#9945FF]/10"
                      onClick={resetFilters}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </TabsContent>
                
              <TabsContent value="collected" className="mt-0">
                {connected ? (
                  <div
                    className={
                      view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                        : "flex flex-col gap-3"
                    }
                  >
                    {/* Show only 2 NFTs for demo purposes */}
                    {view === "grid"
                      ? nftsData
                          .slice(4, 6)
                          .map((nft) => <NFTCard key={nft.id} nft={nft} />)
                      : nftsData
                          .slice(4, 6)
                          .map((nft) => <NFTListItem key={nft.id} nft={nft} />)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <h3 className="text-xl font-medium mb-2">
                      Connect wallet to view your collection
                    </h3>
                    <Button className="mt-4 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90">
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="collections" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collections.map((collection) => (
                    <CollectionCard
                      key={collection.name}
                      collection={collection}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}

export const nft = {
  name: "nft",
  components: {
    Default: <NFTComponent />,
  },
};
