import { useEffect, useState } from 'react';
import type { StationRow } from '../types/supabase_rows';
import type { Forecast } from '../types/forecast';
import { ModelApi } from '../services/modelApi';
import { StationApi } from '../services/stationApi';
import { WeatherApi } from '../services/weatherApi';

export const useHomePageData = () => {
  const [stations, setStations] = useState<StationRow[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);

  const fetchModels = async (): Promise<void> => {
    try {
      const models: string[] = await ModelApi.getAllRegistered();
      setModels(models);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStations = async (): Promise<void> => {
    try {
      const stations: StationRow[] = await StationApi.getAll();
      setStations(stations);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchForecast = async (station: string): Promise<void> => {
    try {
      const forecast: Forecast = await WeatherApi.getPredictionByStation(station);
      setForecasts((prev: Forecast[]) => [...prev, forecast]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchStations();
  }, []);

  useEffect(() => {
    for (const model of models) {
      const stationName: string = model.split('-')[1];
      fetchForecast(stationName);
    }
  }, [models]);

  console.log('forecasts: ', forecasts);
  console.log('stations:', stations);

  return {
    stations: stations,
    forecasts: forecasts,
  };
};
