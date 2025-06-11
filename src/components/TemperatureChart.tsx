'use client';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

type TemperatureChartProps = {
  actuals: number[];
  predictions: number[];
  timestamps: string[];
};

const TemperatureChart = (props: TemperatureChartProps) => {
  const { actuals, predictions, timestamps } = props;

  const chartConfig = {
    temperature: {
      label: 'temperature',
      color: 'var(--chart-2)',
    },
    missing: {
      label: 'temperature',
      color: 'var(--chart-2)',
    },
    forecast: {
      label: 'forecast',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  const chartData = timestamps.map((timestamp: string, index: number) => {
    return {
      timestamps: timestamp,
      temperature: actuals[index],
      forecast: predictions[index],
      missing:
        index === 17
          ? actuals[index]
          : index === 18
          ? predictions[index]
          : null,
    };
  });

  console.log('timestamps: ', timestamps);

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
          dataKey='timestamps'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='line' />}
        />
        <Area
          dataKey='temperature'
          type='natural'
          fill='blue'
          fillOpacity={0.4}
          stroke='blue'
          strokeWidth={3}
        />
        <Area
          dataKey='missing'
          type='natural'
          fill='blue'
          fillOpacity={0.4}
          stroke='blue'
          strokeWidth={3}
        />
        <Area
          dataKey='forecast'
          type='natural'
          fill='orange'
          fillOpacity={0.4}
          stroke='orange'
          strokeWidth={3}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};

export default TemperatureChart;
