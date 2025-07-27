import type { ReactElement, ReactNode } from "react";

import { hero } from "@/app/(docs)/blocks/[slug]/(demos)/hero";
import { login } from "@/app/(docs)/blocks/[slug]/(demos)/login";
import { productGrid } from "@/app/(docs)/blocks/[slug]/(demos)/product-grid";

interface Block {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Block } = {
  hero,
  login,
  "product-grid": productGrid,
};
