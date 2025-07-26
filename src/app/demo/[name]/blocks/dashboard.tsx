import DashboardPage from "@/app/demo/[name]/blocks/dashboard-page";
import ShellLayout from "@/app/demo/[name]/blocks/shell-layout";

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
