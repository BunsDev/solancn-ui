import DashboardPage from "@/app/demos/[name]/blocks/dashboard-page";
import ShellLayout from "@/app/demos/[name]/blocks/shell-layout";

export const dashboard = {
  name: "dashboard",
  components: {
    Default: (
      <ShellLayout>
        <DashboardPage />
      </ShellLayout>
    ),
  },
};
