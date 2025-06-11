import { useMemo } from 'react';
import type { Forecast } from '../types/forecast';

export const useStats = (forecast: Forecast) => {
  const tempAvg: number | undefined = useMemo(() => {
    const sum: number = forecast.actuals.reduce((acc: number, value: number) => acc + value, 0);
    const count: number = forecast.actuals.length;
    return sum / count;
  }, [forecast]);

  const tempMax: number | undefined = useMemo(() => Math.max(...forecast.actuals), [forecast]);
  const tempMin: number | undefined = useMemo(() => Math.min(...forecast.actuals), [forecast]);

  const shouldShowStatsTable: boolean = !!tempAvg && !!tempMax && !!tempMin;

  return {
    avg: tempAvg,
    max: tempMax,
    min: tempMin,
    show: shouldShowStatsTable,
  };
};
