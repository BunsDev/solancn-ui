import type { ReactElement, ReactNode } from "react";

import { hero } from "@/app/(docs)/blocks/[slug]/(demos)/hero";
import { login } from "@/app/(docs)/blocks/[slug]/(demos)/login";
import { productGrid } from "@/app/(docs)/blocks/[slug]/(demos)/product-grid";
import { borrow } from "@/components/borrow/borrow-component";
import { bridge } from "@/components/bridge/bridge-component";
import { defi } from "@/components/defi/defi-component";
import { frame } from "@/components/frame/frame-component";
import { lend } from "@/components/lend/lend-component";
import { nft } from "@/components/nft/nft-component";
import { portfolio } from "@/components/portfolio/portfolio-component";
import { receive } from "@/components/receive/receive-component";
import { stake } from "@/components/stake/stake-component";
import { swap } from "@/components/swap/swap-component";
import { trading } from "@/components/trading/trading-component";
import { transfer } from "@/components/transfer/transfer-component";
import { wallet } from "@/components/wallet/wallet-component";

interface Block {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Block } = {
  borrow: borrow,
  bridge: bridge,
  defi: defi,
  hero: hero,
  frame: frame,
  lend: lend,
  login: login,
  nft: nft,
  portfolio: portfolio,
  "product-grid": productGrid,
  receive: receive,
  stake: stake,
  swap: swap,
  transfer: transfer,
  trading: trading,
  wallet: wallet,
};
