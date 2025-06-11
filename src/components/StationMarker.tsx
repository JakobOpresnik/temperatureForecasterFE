import type { Forecast } from '../types/forecast';
import type { StationRow } from '../types/supabase_rows';
import { Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../App.css';
import { Typography } from '@mui/joy';
import TemperatureChart from './TemperatureChart';
import { Card, CardContent, CardHeader } from './ui/card';
import StatsTable from './StatsTable';

type StationMarkerProps = {
  station: StationRow;
  forecasts: Forecast[];
};

const StationMarker = ({ station, forecasts }: StationMarkerProps) => {
  const forecast: Forecast | undefined = forecasts.find(
    (forecast: Forecast) => forecast.station === station.name
  );

  function getNextTimestamps(start: string, count: number): string[] {
    console.log('start: ', start);
    const [hours, minutes] = start.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const timestamps: string[] = [];

    for (let i = 1; i <= count; i++) {
      const next = new Date(startDate.getTime() + i * 30 * 60 * 1000);
      const hh = next.getHours().toString().padStart(2, '0');
      const mm = next.getMinutes().toString().padStart(2, '0');
      timestamps.push(`${hh}:${mm}`);
    }

    return timestamps;
  }

  const forecastTimestamps: string[] = getNextTimestamps(
    forecast?.timestamps[17] ?? '',
    6
  );

  // all timestamps
  const timestamps: string[] = [
    ...(forecast?.timestamps ?? []),
    ...forecastTimestamps,
  ];

  const actuals = [...(forecast?.actuals ?? []), ...Array(6).fill(null)];
  const predictions = [
    ...Array(18).fill(null),
    ...(forecast?.predictions ?? []),
  ];

  const shouldDisplayPopup: boolean = useMemo(
    () => !!forecast?.actuals && !!forecast.timestamps,
    [forecast]
  );

  return (
    <Marker position={[station.latitude, station.longitude]}>
      <Popup>
        {shouldDisplayPopup ? (
          <Card style={{ width: 350, border: 0 }} className='!shadow-none'>
            <CardHeader>
              <Typography level='h3'>{station.name}</Typography>
              <Typography level='body-sm'>
                {station.latitude}, {station.longitude}
              </Typography>
            </CardHeader>
            <CardContent>
              <>
                <TemperatureChart
                  actuals={actuals}
                  predictions={predictions}
                  timestamps={timestamps}
                />
                {forecast && (
                  <StatsTable
                    title='Stats for the last 9 hours'
                    forecast={forecast}
                  />
                )}
              </>
            </CardContent>
          </Card>
        ) : (
          <CircularProgress variant='soft' />
        )}
      </Popup>
    </Marker>
  );
};

export default StationMarker;
