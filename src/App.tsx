import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { API_BASE_URL } from './constants/apiClient';
import type { StationRow } from './types/supabase_rows';
import type { Forecast } from './types/forecast';
import StationMarker from './components/StationMarker';
import { getStationsData } from './api/stations';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

function App() {
  const [stations, setStations] = useState<StationRow[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  const getRegisteredModels = async () => {
    try {
      const response: Response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data: ', data);
      setModels(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTemperatureForecast = async (station: string) => {
    try {
      const response: Response = await fetch(
        `${API_BASE_URL}/predict/${station}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log('fetched data: ', data);
      const forecast: Forecast = {
        station: station,
        predictions: data.predictions,
        actuals: data.actuals,
        timestamps: data.timestamps,
      };
      setForecasts((prev: Forecast[]) => [...prev, forecast]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const stationsResult = await getStationsData();
        console.log('result: ', stationsResult);
        if (stationsResult) setStations(stationsResult);
      } catch (err) {
        console.error('Failed to fetch initial data: ', err);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    getRegisteredModels();
  }, []);

  useEffect(() => {
    for (const model of models) {
      getTemperatureForecast(model.split('-')[1]);
    }
  }, [models]);

  console.log('forecasts: ', forecasts);
  console.log('stations:', stations);

  /* function getNextTimestamps(start: string, count: number): string[] {
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
  } */

  return (
    <>
      {/* <ul>
        <button onClick={() => getTemperatureForecast('Lendava')}>
          GET PREDICTIONS FOR LENDAVA
        </button>
        {forecasts.map((forecast: Forecast, index: number) => (
          <p key={index}>
            {forecast.station}:{' '}
            {forecast.predictions?.map(
              (value: number) => `${value.toFixed(1)}°C `
            )}
          </p>
        ))}
        {models.map((model: string, index: number) => (
          <li key={index}>{model}</li>
        ))}
        {data.map((weather: WeatherRow, index: number) => (
          <li key={index}>
            {weather.Date} {weather.Location} {weather.Temperature}
          </li>
        ))}
      </ul> */}

      <MapContainer
        center={[46.173785, 14.973106]}
        zoom={9}
        style={{ height: '100vh' }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        {stations.map((station: StationRow, index: number) => (
          <StationMarker key={index} station={station} forecasts={forecasts} />
        ))}
      </MapContainer>
    </>
  );
}

export default App;

//
// handy command for creating TypeScript types from Supabase tables:
//
// > pnpm dlx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/types/supabase.ts
//
