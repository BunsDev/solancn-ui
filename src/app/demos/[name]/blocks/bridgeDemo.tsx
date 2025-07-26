"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import BridgePage from "@/app/demos/[name]/blocks/bridge-page";

export const bridgeDemo = {
  name: "bridgeDemo",
  components: {
    Default: (
      <MinimalLayout>
        <BridgePage />
      </MinimalLayout>
    ),
  },
};
