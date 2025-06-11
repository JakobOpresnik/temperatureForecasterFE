import type { Forecast } from './forecast';
import type { StationRow } from './supabase_rows';

export type StationMarkerProps = {
  station: StationRow;
  forecasts: Forecast[];
};
