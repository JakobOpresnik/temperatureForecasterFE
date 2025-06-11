import { API_BASE_URL } from '../constants/apiClient';
import type { Forecast } from '../types/forecast';

export const WeatherApi = {
  async getPredictionByStation(station: string): Promise<Forecast> {
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
  },
};
