import { useEffect, useState } from 'react';
import type { StationRow } from '../types/supabase_rows';
import type { Forecast } from '../types/forecast';
import { getStationsData } from '../api/stations';
import { MapContainer, TileLayer } from 'react-leaflet';
import StationMarker from '../components/StationMarker';
import { MAP_LAYER } from '../constants/map';
import { getTemperatureForecast } from '../api/weather';
import { getRegisteredModels } from '../api/models';

const HomePage = () => {
  const [stations, setStations] = useState<StationRow[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  const fetchModels = async (): Promise<void> => {
    try {
      const models: string[] = await getRegisteredModels();
      setModels(models);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStations = async (): Promise<void> => {
    try {
      const stations: StationRow[] = await getStationsData();
      setStations(stations);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchForecast = async (station: string): Promise<void> => {
    try {
      const forecast: Forecast = await getTemperatureForecast(station);
      setForecasts((prev: Forecast[]) => [...prev, forecast]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchStations();
  }, []);

  /* useEffect(() => {
    getRegisteredModels();
  }, []); */

  useEffect(() => {
    for (const model of models) {
      const stationName: string = model.split('-')[1];
      fetchForecast(stationName);
    }
  }, [models]);

  console.log('forecasts: ', forecasts);
  console.log('stations:', stations);

  return (
    <>
      <MapContainer
        center={[46.173785, 14.973106]}
        zoom={9}
        style={{ height: '100vh' }}
      >
        <TileLayer url={MAP_LAYER} />
        {stations.map((station: StationRow, index: number) => (
          <StationMarker key={index} station={station} forecasts={forecasts} />
        ))}
      </MapContainer>
    </>
  );
};

export default HomePage;
