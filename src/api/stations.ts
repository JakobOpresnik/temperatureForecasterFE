import { API_BASE_URL } from '../constants/apiClient';
import type { StationRow } from '../types/supabase_rows';

/* export const getStationsData = async (): Promise<StationRow[] | null> => {
  const { data, error } = await supabase.from('station').select('*').limit(5);
  if (error) {
    console.error('Failed to fetch stations data:', error);
    return null;
  }
  return data;
}; */

export const getStationsData = async (): Promise<StationRow[]> => {
  const response: Response = await fetch(`${API_BASE_URL}/stations`)
  if (!response.ok) {
    throw new Error(`Error fetching stations: ${response.status}`)
  }
  const data = response.json()
  return data
}

export const getStationData = async (station_name: string): Promise<StationRow> => {
  const response: Response = await fetch(`${API_BASE_URL}/stations/${station_name}`)
  if (!response.ok) {
    throw new Error(`Error fetching station with name '${station_name}': ${response.status}`)
  }
  const data = response.json()
  return data
}
