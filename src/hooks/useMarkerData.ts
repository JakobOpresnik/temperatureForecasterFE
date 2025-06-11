import { useMemo } from 'react';
import type { Forecast } from '../types/forecast';
import { getNextTimestamps } from '../utils/time';
import type { StationMarkerProps } from '../types/marker';

export const useMarkerData = ({ station, forecasts }: StationMarkerProps) => {
  const forecast: Forecast | undefined = forecasts.find(
    (forecast: Forecast) => forecast.station === station.name,
  );

  const forecastTimestamps: string[] = getNextTimestamps(forecast?.timestamps[17] ?? '', 6);

  // all timestamps
  const timestamps: string[] = [...(forecast?.timestamps ?? []), ...forecastTimestamps];

  const actuals = [...(forecast?.actuals ?? []), ...Array(6).fill(null)];
  const predictions = [...Array(18).fill(null), ...(forecast?.predictions ?? [])];

  const shouldShowPopup: boolean = useMemo(
    () => !!forecast?.actuals && !!forecast.timestamps,
    [forecast],
  );

  return {
    show: shouldShowPopup,
    actuals: actuals,
    predictions: predictions,
    timestamps: timestamps,
    forecast: forecast,
  };
};
