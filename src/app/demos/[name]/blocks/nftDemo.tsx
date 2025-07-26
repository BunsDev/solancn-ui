"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import NFTPage from "@/app/demos/[name]/blocks/nft-page";

export const nftDemo = {
  name: "nftDemo",
  components: {
    Default: (
      <MinimalLayout>
        <NFTPage />
      </MinimalLayout>
    ),
  },
};
