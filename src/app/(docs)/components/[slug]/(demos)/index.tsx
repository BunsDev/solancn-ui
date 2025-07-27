import type { ReactElement, ReactNode } from "react";

import { accordion } from "@/app/(docs)/components/[slug]/(demos)/accordion";
import { alert } from "@/app/(docs)/components/[slug]/(demos)/alert";
import { avatar } from "@/app/(docs)/components/[slug]/(demos)/avatar";
import { badge } from "@/app/(docs)/components/[slug]/(demos)/badge";
import { breadcrumb } from "@/app/(docs)/components/[slug]/(demos)/breadcrumb";
import { button } from "@/app/(docs)/components/[slug]/(demos)/button";
import { calendar } from "@/app/(docs)/components/[slug]/(demos)/calendar";
import { card } from "@/app/(docs)/components/[slug]/(demos)/card";
import { chart } from "@/app/(docs)/components/[slug]/(demos)/chart";
import { checkbox } from "@/app/(docs)/components/[slug]/(demos)/checkbox";
import { dataTable } from "@/app/(docs)/components/[slug]/(demos)/data-table";
import { datePicker } from "@/app/(docs)/components/[slug]/(demos)/date-picker";
import { dialog } from "@/app/(docs)/components/[slug]/(demos)/dialog";
import { dropdownMenu } from "@/app/(docs)/components/[slug]/(demos)/dropdown-menu";
import { input } from "@/app/(docs)/components/[slug]/(demos)/input";
import { menuBar } from "@/app/(docs)/components/[slug]/(demos)/menu-bar";
import { select } from "@/app/(docs)/components/[slug]/(demos)/select";
import { separator } from "@/app/(docs)/components/[slug]/(demos)/separator";
import { skeleton } from "@/app/(docs)/components/[slug]/(demos)/skeleton";
import { slider } from "@/app/(docs)/components/[slug]/(demos)/slider";
import { sonner } from "@/app/(docs)/components/[slug]/(demos)/sonner";
import { switchComponent } from "@/app/(docs)/components/[slug]/(demos)/switch";
import { table } from "@/app/(docs)/components/[slug]/(demos)/table";
import { tabs } from "@/app/(docs)/components/[slug]/(demos)/tabs";
import { toggleGroup } from "@/app/(docs)/components/[slug]/(demos)/toggle-group";
import { tooltip } from "@/app/(docs)/components/[slug]/(demos)/tooltip";

interface Demo {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  accordion,
  alert,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  chart,
  checkbox,
  dialog,
  "date-picker": datePicker,
  "data-table": dataTable,
  "dropdown-menu": dropdownMenu,
  input,
  "menu-bar": menuBar,
  select,
  separator,
  skeleton,
  slider,
  switch: switchComponent,
  sonner,
  table,
  tabs,
  "toggle-group": toggleGroup,
  tooltip,
};
