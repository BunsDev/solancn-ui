// import { type RegistryItem } from "@/lib/types"

interface RegistryFile {
  path: string;
  type: "registry:component" | "registry:block";
}
export interface RegistryItem {
  name: string;
  title: string;
  type: RegistryFile["type"];
  preview?: React.ReactNode;
  description?: string;
  category?: string;
  tags?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  categories?: string[];
}

export const charts: RegistryItem[] = [
  // Area Charts
  {
    name: "chart-area-axes",
    title: "Chart Area Axes",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-axes.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-default",
    title: "Chart Area Default",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-default.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-gradient",
    title: "Chart Area Gradient",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-gradient.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-icons",
    title: "Chart Area Icons",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-icons.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-interactive",
    title: "Chart Area Interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart", "select"],
    files: [
      {
        path: "charts/chart-area-interactive.tsx",
        type: "registry:component",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-legend",
    title: "Chart Area Legend",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-legend.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-linear",
    title: "Chart Area Linear",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-linear.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-stacked-expand",
    title: "Chart Area Stacked Expand",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-stacked-expand.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-stacked",
    title: "Chart Area Stacked",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-stacked.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },
  {
    name: "chart-area-step",
    title: "Chart Area Step",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-area-step.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-area"],
  },

  // Bar Charts
  {
    name: "chart-bar-active",
    title: "Chart Bar Active",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-active.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "chart-bar-default",
    title: "Chart Bar Default",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-default.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
  },
  {
    name: "chart-bar-horizontal",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-horizontal.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Horizontal",
  },
  {
    name: "chart-bar-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-interactive.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Interactive",
  },
  {
    name: "chart-bar-label-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-label-custom.tsx",  
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Label Custom",
  },
  {
    name: "chart-bar-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Label",
  },
  {
    name: "chart-bar-mixed",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-mixed.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Mixed",
  },
  {
    name: "chart-bar-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-multiple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Multiple",
    },
  {
    name: "chart-bar-negative",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-negative.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Negative",
  },
  {
    name: "chart-bar-stacked",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-bar-stacked.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-bar"],
    title: "Chart Bar Stacked",
  },

  // Line Charts
  {
    name: "chart-line-default",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-default.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Default",
  },
  {
    name: "chart-line-dots-colors",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-dots-colors.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Dots Colors",
  },
  {
    name: "chart-line-dots-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-dots-custom.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Default",
  },
  {
    name: "chart-line-dots",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
        {
          path: "charts/chart-line-dots.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Dots", 
  },
  {
    name: "chart-line-interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-interactive.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Interactive",
  },
  {
    name: "chart-line-label-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-label-custom.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Label Custom",
  },
  {
    name: "chart-line-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Label",
  },
  {
    name: "chart-line-linear",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-linear.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Linear",
  },
  {
    name: "chart-line-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-multiple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Multiple",
  },
  {
    name: "chart-line-step",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-line-step.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-line"],
    title: "Chart Line Step",
  },

  // Pie Charts
  {
    name: "chart-pie-donut-active",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    title: "Chart Pie Donut Active",
    files: [
      {
        path: "charts/chart-pie-donut-active.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
  },
  {
    name: "chart-pie-donut-text",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
          path: "charts/chart-pie-donut-text.tsx",
          type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Donut",
  },
  {
    name: "chart-pie-donut",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-donut.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Donut",
  },
  {
    name: "chart-pie-interactive",
    title: "Chart Pie Interactive",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-interactive.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
  },
  {
    name: "chart-pie-label-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-label-custom.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Label Custom",
  },
  {
    name: "chart-pie-label-list",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-label-list.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Label List",
  },
  {
    name: "chart-pie-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Label",
  },
  {
    name: "chart-pie-legend",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-legend.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Legend",
  },
  {
    name: "chart-pie-separator-none",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-separator-none.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Simple",
  },
  {
    name: "chart-pie-simple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-simple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Simple",
  },
  {
    name: "chart-pie-stacked",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-pie-stacked.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-pie"],
    title: "Chart Pie Stacked",
  },

  // Radar Charts
  {
    name: "chart-radar-default",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-default.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Default",
  },
  {
    name: "chart-radar-dots",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-dots.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Dots",
  },
  {
    name: "chart-radar-grid-circle-fill",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-grid-circle-fill.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Grid Circle Fill",
        },
  {
    name: "chart-radar-grid-circle-no-lines",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-grid-circle-no-lines.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Grid Circle No Lines",
    },
  {
    name: "chart-radar-grid-circle",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-grid-circle.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Grid Circle",
  },
  {
    name: "chart-radar-grid-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-grid-custom.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Grid Custom",
  },
  {
    name: "chart-radar-grid-fill",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-grid-fill.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Grid Fill",
  },
  {
    name: "chart-radar-grid-none",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-grid-none.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Grid None",
  },
  {
    name: "chart-radar-icons",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-icons.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Icons",
  },
  {
    name: "chart-radar-label-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-label-custom.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Label Custom",
  },
  {
    name: "chart-radar-legend",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-legend.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Legend",
  },
  {
    name: "chart-radar-lines-only",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-lines-only.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Lines Only",
  },
  {
    name: "chart-radar-multiple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-multiple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Multiple",
  },
  {
    name: "chart-radar-radius",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radar-radius.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radar"],
    title: "Chart Radar Radius",
  },

  // Radial Charts
  {
    name: "chart-radial-grid",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radial-grid.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
    title: "Chart Radial Grid",
  },
  {
    name: "chart-radial-label",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radial-label.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
    title: "Chart Radial Label",
    },
  {
    name: "chart-radial-shape",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radial-shape.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
    title: "Chart Radial Shape",
  },
  {
    name: "chart-radial-simple",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radial-simple.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
    title: "Chart Radial Simple",
  },
  {
    name: "chart-radial-stacked",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radial-stacked.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
    title: "Chart Radial Stacked",
  },
  {
    name: "chart-radial-text",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-radial-text.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-radial"],
    title: "Chart Radial Text",
  },
  {
    name: "chart-tooltip-default",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-default.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
    title: "Chart Tooltip Default",
  },
  {
    name: "chart-tooltip-indicator-line",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-indicator-line.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
    title: "Chart Tooltip Indicator Line",
  },
  {
    name: "chart-tooltip-indicator-none",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-indicator-none.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
    title: "Chart Tooltip Indicator Line",
  },
  {
    name: "chart-tooltip-label-none",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-label-none.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
    title: "Chart Tooltip Label None",
  },
  {
    name: "chart-tooltip-label-custom",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-label-custom.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
    title: "Chart Tooltip Label Custom",
  },
  {
    name: "chart-tooltip-label-formatter",
    title: "Chart Tooltip Label Formatter",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-label-formatter.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
  },
  {
    name: "chart-tooltip-formatter",
    title: "Chart Tooltip Formatter",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-formatter.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
  },
  {
    name: "chart-tooltip-icons",
    title: "Chart Tooltip Icons",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-icons.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
  },
  {
    name: "chart-tooltip-advanced",
    title: "Chart Tooltip Advanced",
    type: "registry:block",
    registryDependencies: ["card", "chart"],
    files: [
      {
        path: "charts/chart-tooltip-advanced.tsx",
        type: "registry:block",
      },
    ],
    categories: ["charts", "charts-tooltip"],
  },
]
