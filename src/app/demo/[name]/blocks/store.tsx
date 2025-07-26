import MinimalLayout from "@/app/demo/[name]/blocks/minimal-layout";
import StorePage from "@/app/demo/[name]/blocks/store-page";

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
