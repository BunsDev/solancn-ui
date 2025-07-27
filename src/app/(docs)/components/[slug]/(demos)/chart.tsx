import { AreaChartComponent } from "@/app/(docs)/components/[slug]/(demos)/area-chart";
import { BarChartComponent } from "@/app/(docs)/components/[slug]/(demos)/bar-chart";
import { PieChartComponent } from "@/app/(docs)/components/[slug]/(demos)/pie-chart";

export const chart = {
  name: "chart",
  components: {
    BarChart: <BarChartComponent />,
    AreaChart: <AreaChartComponent />,
    PieChart: <PieChartComponent />,
  },
};
