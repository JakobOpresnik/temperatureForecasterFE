import type { Forecast } from '../types/forecast';
import { LineChart } from '@mui/x-charts';
import type { StationRow } from '../types/supabase_rows';
import { Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../App.css';
import { Table, Typography } from '@mui/joy';

type StationMarkerProps = {
  station: StationRow;
  forecasts: Forecast[];
};

const StationMarker = ({ station, forecasts }: StationMarkerProps) => {
  const forecast: Forecast | undefined = forecasts.find(
    (forecast: Forecast) => forecast.station === station.name
  );

  // console.log('COORDINATES: ', station.latitude, station.longitude);

  /* const customIcon = new Icon({
      iconUrl: 'assets/location_pin.png',
      iconSize: [45, 45],
    }); */

  const chartData: number[] = [
    ...(forecast?.actuals ?? []),
    ...(forecast?.predictions ?? []),
  ];

  /* const forecastTimestamps: string[] = getNextTimestamps(
    forecast?.timestamps[17] ?? '',
    6
  );

  console.log('timestamps forecast: ', forecastTimestamps);
  console.log([...(forecast?.timestamps ?? []), ...forecastTimestamps]); */

  const tempAvg: number | undefined = useMemo(() => {
    if (forecast) {
      const sum: number = forecast.actuals.reduce(
        (acc: number, value: number) => acc + value,
        0
      );
      const count: number = forecast.actuals.length;
      return sum / count;
    }
  }, [forecast]);

  const tempMax: number | undefined = useMemo(() => {
    if (forecast) {
      return Math.max(...forecast.actuals);
    }
  }, [forecast]);

  const tempMin: number | undefined = useMemo(() => {
    if (forecast) {
      return Math.min(...forecast.actuals);
    }
  }, [forecast]);

  const actuals = [...(forecast?.actuals ?? []), ...Array(6).fill(null)];
  const predictions = [
    ...Array(17).fill(null),
    ...(forecast?.predictions ?? []),
  ];

  return (
    <Marker position={[station.latitude, station.longitude]}>
      <Popup className='popup'>
        <Typography level='h3' sx={{ marginTop: 3 }}>
          {station.name}
        </Typography>
        <Typography level='body-sm'>
          {station.latitude}, {station.longitude}
        </Typography>
        {tempAvg && tempMax && tempMin ? (
          <>
            <Typography level='body-md'>Stats for the last 9 hours:</Typography>
            <Table>
              <tr>
                <th>Average</th>
                <th>{tempAvg.toFixed(1)}°C</th>
              </tr>
              <tr>
                <th>Max</th>
                <th>{tempMax.toFixed(1)}°C</th>
              </tr>
              <tr>
                <th>Min</th>
                <th>{tempMin.toFixed(1)}°C</th>
              </tr>
            </Table>
          </>
        ) : (
          <CircularProgress variant='soft' />
        )}
        {forecast?.timestamps && (
          <LineChart
            series={[
              {
                data: actuals,
                label: 'Actuals',
                labelMarkType: 'circle',
                area: true,
                showMark: false,
              },
              {
                data: predictions,
                label: 'Forecast',
                labelMarkType: 'circle',
                area: true,
                showMark: false,
              },
            ]}
            yAxis={[
              {
                min: Math.min(...chartData) * 0.4,
                max: Math.max(...chartData) * 1.3,
                label: 'Temperature (°C)',
              },
            ]}
            height={300}
            width={550}
            sx={{
              paddingLeft: 30,
            }}
          />
        )}
      </Popup>
    </Marker>
  );
};

export default StationMarker;
