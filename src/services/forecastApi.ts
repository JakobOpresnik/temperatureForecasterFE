import { API_BASE_URL } from '../constants/apiClient';
import type { ForecastRow } from '../types/supabase_rows';

export const ForecastApi = {
  async getAll(): Promise<ForecastRow[]> {
    const response: Response = await fetch(`${API_BASE_URL}/evaluate`);
    if (!response.ok) {
      throw new Error(`Error fetching evaluations: ${response.status}`);
    }
    return response.json();
  },

  async getByStationName(name: string): Promise<ForecastRow> {
    const response: Response = await fetch(`${API_BASE_URL}/evaluate/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching evaluation for station '${name}': ${response.status}`);
    }
    return response.json();
  },
};
