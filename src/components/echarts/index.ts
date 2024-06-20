import * as echarts from "echarts/core";

import {
  BarChart, LineChart, PieChart,
  EffectScatterChart,
  ScatterChart,
} from "echarts/charts";

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
} from "echarts/components";

import { LabelLayout, UniversalTransition, } from "echarts/features";

import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  LegendComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart, EffectScatterChart,
  ScatterChart
]);

export default echarts;