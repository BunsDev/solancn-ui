import type { ReactElement, ReactNode } from "react";

// blocks
import { blank } from "@/app/demos/[name]/blocks/blank";
import { dashboard } from "@/app/demos/[name]/blocks/dashboard";
import { solana } from "@/app/demos/[name]/blocks/solana";
import { nft as nftBlock } from "@/app/demos/[name]/blocks/nft";

// components
import { brandHeader } from "@/app/demos/[name]/components/brand-header";
import { brandSidebar } from "@/app/demos/[name]/components/brand-sidebar";
import { hero } from "@/app/demos/[name]/components/hero";
import { login } from "@/app/demos/[name]/components/login";
import { logo } from "@/app/demos/[name]/components/logo";
import { productGrid } from "@/app/demos/[name]/components/product-grid";
import { promo } from "@/app/demos/[name]/components/promo";

// solana
import { borrow } from "@/app/demos/[name]/solana/borrow";
import { bridge } from "@/app/demos/[name]/solana/bridge";
import { frame } from "@/app/demos/[name]/solana/frame";
import { lend } from "@/app/demos/[name]/solana/lend";
import { portfolio } from "@/app/demos/[name]/solana/portfolio";
import { receive } from "@/app/demos/[name]/solana/receive";
import { stake } from "@/app/demos/[name]/solana/stake";
import { swap } from "@/app/demos/[name]/solana/swap";
import { transfer } from "@/app/demos/[name]/solana/transfer";
import { wallet } from "@/app/demos/[name]/solana/wallet";
import { nft } from "@/app/demos/[name]/solana/nft";

// ui
import { accordion } from "@/app/demos/[name]/ui/accordion";
import { alert } from "@/app/demos/[name]/ui/alert";
import { avatar } from "@/app/demos/[name]/ui/avatar";
import { badge } from "@/app/demos/[name]/ui/badge";
import { breadcrumb } from "@/app/demos/[name]/ui/breadcrumb";
import { button } from "@/app/demos/[name]/ui/button";
import { calendar } from "@/app/demos/[name]/ui/calendar";
import { card } from "@/app/demos/[name]/ui/card";
import { chart } from "@/app/demos/[name]/ui/chart";
import { checkbox } from "@/app/demos/[name]/ui/checkbox";
import { dataTable } from "@/app/demos/[name]/ui/data-table";
import { datePicker } from "@/app/demos/[name]/ui/date-picker";
import { dialog } from "@/app/demos/[name]/ui/dialog";
import { dropdownMenu } from "@/app/demos/[name]/ui/dropdown-menu";
import { input } from "@/app/demos/[name]/ui/input";
import { menuBar } from "@/app/demos/[name]/ui/menu-bar";
import { select } from "@/app/demos/[name]/ui/select";
import { separator } from "@/app/demos/[name]/ui/separator";
import { skeleton } from "@/app/demos/[name]/ui/skeleton";
import { slider } from "@/app/demos/[name]/ui/slider";
import { sonner } from "@/app/demos/[name]/ui/sonner";
import { switchComponent } from "@/app/demos/[name]/ui/switch";
import { table } from "@/app/demos/[name]/ui/table";
import { tabs } from "@/app/demos/[name]/ui/tabs";
import { toggleGroup } from "@/app/demos/[name]/ui/toggle-group";
import { tooltip } from "@/app/demos/[name]/ui/tooltip";

interface Demo {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  // blocks
  blank,
  nftBlock,
  dashboard,
  solana,

  // components
  hero,
  login,
  promo,
  logo,
  "brand-header": brandHeader,
  "brand-sidebar": brandSidebar,
  "product-grid": productGrid,

  // solana
  borrow,
  bridge,
  frame,
  lend,
  portfolio,
  receive,
  stake,
  swap,
  transfer,
  wallet,
  nft,

  // ui
  accordion,
  alert,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  chart,
  checkbox,
  dialog,
  "date-picker": datePicker,
  "data-table": dataTable,
  "dropdown-menu": dropdownMenu,
  input,
  "menu-bar": menuBar,
  select,
  separator,
  skeleton,
  slider,
  switch: switchComponent,
  sonner,
  table,
  tabs,
  "toggle-group": toggleGroup,
  tooltip,
};
