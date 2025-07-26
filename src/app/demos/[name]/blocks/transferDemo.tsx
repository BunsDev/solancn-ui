"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import TransferPage from "@/app/demos/[name]/blocks/transfer-page";

export const transferDemo = {
  name: "transferDemo",
  components: {
    Default: (
      <MinimalLayout>
        <TransferPage />
      </MinimalLayout>
    ),
  },
};
