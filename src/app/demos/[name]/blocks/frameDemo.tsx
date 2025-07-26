"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import FramePage from "@/app/demos/[name]/blocks/frame-page";

export const frameDemo = {
  name: "frameDemo",
  components: {
    Default: (
      <MinimalLayout>
        <FramePage />
      </MinimalLayout>
    ),
  },
};
