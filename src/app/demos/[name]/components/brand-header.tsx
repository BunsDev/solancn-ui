import { BrandHeader } from "@/components/brand-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export const brandHeader = {
  name: "brand-header",
  components: {
    Default: (
      <SidebarProvider>
        <BrandHeader />
      </SidebarProvider>
    ),
  },
};
