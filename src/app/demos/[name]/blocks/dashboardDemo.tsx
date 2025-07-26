import DashboardPage from "@/app/demos/[name]/blocks/dashboard-page";
import ShellLayout from "@/app/demos/[name]/blocks/shell-layout";

export const dashboardDemo = {
  name: "dashboardDemo",
  components: {
    Default: (
      <ShellLayout>
        <DashboardPage />
      </ShellLayout>
    ),
  },
};
