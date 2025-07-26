import MinimalLayout from "@/app/demos/[name]/blocks/minimal-layout";
import StorePage from "@/app/demos/[name]/blocks/store-page";

export const store = {
  name: "store",
  components: {
    Default: (
      <MinimalLayout>
        <StorePage />
      </MinimalLayout>
    ),
  },
};
