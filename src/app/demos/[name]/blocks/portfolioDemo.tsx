"use client";

import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import PortfolioPage from "@/app/demos/[name]/blocks/portfolio-page";

export const portfolioDemo = {
  name: "portfolioDemo",
  components: {
    Default: (
      <MinimalLayout>
        <PortfolioPage />
      </MinimalLayout>
    ),
  },
};
