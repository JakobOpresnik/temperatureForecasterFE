'use client';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { useChartData } from '../hooks/useChartData';
import type { TemperatureChartProps } from '../types/chart';

const TemperatureChart = (props: TemperatureChartProps) => {
  const { actuals, predictions, timestamps } = props;

  const { config: chartConfig, data: chartData } = useChartData({
    actuals,
    predictions,
    timestamps,
  });

  return (
    <ChartContainer config={chartConfig} style={{ width: 310 }}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamps"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="temperature"
          type="natural"
          fill="blue"
          fillOpacity={0.4}
          stroke="blue"
          strokeWidth={3}
        />
        <Area
          dataKey="missing"
          type="natural"
          fill="blue"
          fillOpacity={0.4}
          stroke="blue"
          strokeWidth={3}
        />
        <Area
          dataKey="forecast"
          type="natural"
          fill="orange"
          fillOpacity={0.4}
          stroke="orange"
          strokeWidth={3}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default TemperatureChart;
