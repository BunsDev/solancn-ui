import { AreaChartComponent } from "@/app/demos/[name]/ui/area-chart";
import { BarChartComponent } from "@/app/demos/[name]/ui/bar-chart";
import { PieChartComponent } from "@/app/demos/[name]/ui/pie-chart";

export const chart = {
  name: "chart",
  components: {
    BarChart: <BarChartComponent />,
    AreaChart: <AreaChartComponent />,
    PieChart: <PieChartComponent />,
  },
};
