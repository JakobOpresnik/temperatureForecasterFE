import { API_BASE_URL } from '../constants/apiClient';
import type { Forecast } from '../types/forecast';

/* export const getWeatherData = async (): Promise<WeatherRow[] | null> => {
  const { data, error } = await supabase.from('weather').select('*').limit(5);
  if (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
  return data;
}; */

export const getTemperatureForecast = async (station: string): Promise<Forecast> => {
  const response: Response = await fetch(`${API_BASE_URL}/predict/${station}`);
  if (!response.ok) {
    throw new Error(`Error getting predictions: ${response.status}`);
  }
  const data = await response.json();
  return {
    station: station,
    predictions: data.predictions,
    actuals: data.actuals,
    timestamps: data.timestamps,
  };

  /* try {
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
      // setForecasts((prev: Forecast[]) => [...prev, forecast]);
      return forecast
    } catch (err) {
      console.log(err);
      return
    } */
  };