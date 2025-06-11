import type { ChartConfig } from '../components/ui/chart';
import type { TemperatureChartProps } from '../types/chart';

export const useChartData = ({ actuals, predictions, timestamps }: TemperatureChartProps) => {
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
      missing: index === 17 ? actuals[index] : index === 18 ? predictions[index] : null,
    };
  });

  return { config: chartConfig, data: chartData };
};
