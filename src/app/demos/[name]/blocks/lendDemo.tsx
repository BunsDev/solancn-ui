"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import LendPage from "@/app/demos/[name]/blocks/lend-page";

export const lendDemo = {
  name: "lendDemo",
  components: {
    Default: (
      <MinimalLayout>
        <LendPage />
      </MinimalLayout>
    ),
  },
};
