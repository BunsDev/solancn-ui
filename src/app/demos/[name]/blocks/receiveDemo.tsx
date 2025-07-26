"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import ReceivePage from "@/app/demos/[name]/blocks/receive-page";

export const receiveDemo = {
  name: "receiveDemo",
  components: {
    Default: (
      <MinimalLayout>
        <ReceivePage />
      </MinimalLayout>
    ),
  },
};
