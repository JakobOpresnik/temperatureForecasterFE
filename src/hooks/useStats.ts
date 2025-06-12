import { useMemo } from 'react';
import type { Forecast } from '../types/forecast';

export const useStats = (forecast: Forecast) => {
  const tempAvg: number = useMemo(() => {
    const sum: number = forecast.actuals.reduce((acc: number, value: number) => acc + value, 0);
    const count: number = forecast.actuals.length;
    return sum / count;
  }, [forecast]);

  const tempMax: number = useMemo(() => Math.max(...forecast.actuals), [forecast]);
  const tempMin: number = useMemo(() => Math.min(...forecast.actuals), [forecast]);

  return {
    avg: tempAvg,
    max: tempMax,
    min: tempMin,
  };
};
