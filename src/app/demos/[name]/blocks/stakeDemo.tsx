"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import StakePage from "@/app/demos/[name]/blocks/stake-page";

export const stakeDemo = {
  name: "stakeDemo",
  components: {
    Default: (
      <MinimalLayout>
        <StakePage />
      </MinimalLayout>
    ),
  },
};
