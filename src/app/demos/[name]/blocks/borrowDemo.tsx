"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import BorrowPage from "@/app/demos/[name]/blocks/borrow-page";

export const borrowDemo = {
  name: "borrowDemo",
  components: {
    Default: (
      <MinimalLayout>
        <BorrowPage />
      </MinimalLayout>
    ),
  },
};
