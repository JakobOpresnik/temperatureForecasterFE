import type { Forecast } from '../types/forecast';
import { LineChart } from '@mui/x-charts';
import type { StationRow } from '../types/supabase_rows';
import { Marker, Popup } from 'react-leaflet';

type StationMarkerProps = {
  station: StationRow;
  forecasts: Forecast[];
};

const StationMarker = ({ station, forecasts }: StationMarkerProps) => {
  const forecast: Forecast | undefined = forecasts.find(
    (forecast: Forecast) => forecast.station === station.name
  );

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

  return (
    <Marker position={[station.latitude, station.longitude]}>
      <Popup>
        <h3>{station.name}</h3>
        {forecast?.predictions?.map((value: number) => `${value.toFixed(1)}°C`)}
        {forecast?.timestamps && (
          <LineChart
            series={[
              {
                data: chartData,
                area: true,
              },
            ]}
            /* xAxis={[
                {
                  data: [...forecast.timestamps, ...forecastTimestamps],
                },
              ]} */
            yAxis={[
              {
                min: Math.min(...chartData) * 0.85,
                max: Math.max(...chartData) * 1.15,
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
