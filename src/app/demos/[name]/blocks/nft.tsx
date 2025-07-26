import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import NFTPage from "@/app/demos/[name]/blocks/nft-page";

export const nft = {
  name: "nft",
  components: {
    Default: (
      <MinimalLayout>
        <NFTPage />
      </MinimalLayout>
    ),
  },
};
