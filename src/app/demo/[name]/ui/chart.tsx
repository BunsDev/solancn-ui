import { AreaChartComponent } from "@/app/demo/[name]/ui/area-chart";
import { BarChartComponent } from "@/app/demo/[name]/ui/bar-chart";
import { PieChartComponent } from "@/app/demo/[name]/ui/pie-chart";

export const chart = {
  name: "chart",
  components: {
    BarChart: <BarChartComponent />,
    AreaChart: <AreaChartComponent />,
    PieChart: <PieChartComponent />,
  },
};
