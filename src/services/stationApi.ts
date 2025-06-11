import { API_BASE_URL } from '../constants/apiClient';
import type { StationRow } from '../types/supabase_rows';

export const StationApi = {
  async getAll(): Promise<StationRow[]> {
    const response = await fetch(`${API_BASE_URL}/stations`);
    if (!response.ok) {
      throw new Error(`Error fetching stations: ${response.status}`);
    }
    return response.json();
  },

  async getByName(name: string): Promise<StationRow> {
    const response = await fetch(`${API_BASE_URL}/stations/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error(`Error fetching station with name '${name}': ${response.status}`);
    }
    return response.json();
  },
};
