import type { StationRow } from '../types/supabase_rows';
import supabase from './supabaseClient';

export const getStationsData = async (): Promise<StationRow[] | null> => {
  const { data, error } = await supabase.from('station').select('*').limit(5);
  if (error) {
    console.error('Failed to fetch stations data:', error);
    return null;
  }
  return data;
};
