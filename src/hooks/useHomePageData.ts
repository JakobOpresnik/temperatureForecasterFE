import { useEffect, useState } from 'react';
import type { ForecastRow, StationRow } from '../types/supabase_rows';
import type { Forecast } from '../types/forecast';
import { ModelApi } from '../services/modelApi';
import { StationApi } from '../services/stationApi';
import { WeatherApi } from '../services/weatherApi';
import { ForecastApi } from '../services/forecastApi';
import type { EvalMetrics } from '../types/model';

export const useHomePageData = () => {
  const [stations, setStations] = useState<StationRow[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<EvalMetrics[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [evaluations, setEvaluations] = useState<ForecastRow[]>([]);

  const fetchModels = async (): Promise<void> => {
    try {
      const { models, metrics } = await ModelApi.getAllRegistered();
      setModels(models);
      setMetrics(metrics);
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

  const fetchPredictions = async (station: string): Promise<void> => {
    try {
      const forecast: Forecast = await WeatherApi.getPredictionByStation(station);
      setForecasts((prev: Forecast[]) => [...prev, forecast]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchForecasts = async (): Promise<void> => {
    try {
      const evaluations: ForecastRow[] = await ForecastApi.getAll();
      setEvaluations(evaluations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchStations();
    fetchForecasts();
  }, []);

  useEffect(() => {
    for (const model of models) {
      const stationName: string = model.split('-')[1];
      fetchPredictions(stationName);
    }
  }, [models]);

  const roundMetrics = (metrics: EvalMetrics[]): EvalMetrics[] => {
    return metrics.map((metric: EvalMetrics) => ({
      ...metric,
      mae: +metric.mae.toFixed(3),
      mse: +metric.mse.toFixed(3),
      rmse: +metric.rmse.toFixed(3),
    }));
  };

  console.log('models: ', models);
  console.log('metrics: ', metrics);
  console.log('forecasts: ', forecasts);
  console.log('stations:', stations);
  console.log('evaluations: ', evaluations);

  return {
    stations: stations,
    forecasts: forecasts,
    metrics: roundMetrics(metrics),
  };
};
