import type { Forecast } from '../types/forecast';
import { LineChart, lineElementClasses } from '@mui/x-charts';
import type { StationRow } from '../types/supabase_rows';
import { Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import '../App.css';

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
        <h2>{station.name}</h2>
        {tempAvg && tempMax && tempMin ? (
          <>
            <h3>Stats for the last 9 hours:</h3>
            <table>
              <tbody>
                <tr>
                  <th>Average</th>
                  <td>{tempAvg.toFixed(1)}°C</td>
                </tr>
                <tr>
                  <th>Max</th>
                  <td>{tempMax.toFixed(1)}°C</td>
                </tr>
                <tr>
                  <th>Min</th>
                  <td>{tempMin.toFixed(1)}°C</td>
                </tr>
              </tbody>
            </table>
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
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: 'none',
              },
            }}
            yAxis={[
              {
                min: Math.min(...chartData) * 0.4,
                max: Math.max(...chartData) * 1.3,
                label: '°C',
                labelStyle: {
                  color: 'white',
                },
              },
            ]}
            height={300}
            width={350}
          />
        )}
      </Popup>
    </Marker>
  );
};

export default StationMarker;
