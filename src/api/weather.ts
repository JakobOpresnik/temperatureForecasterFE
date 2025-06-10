import type { WeatherRow } from '../types/supabase_rows';
import supabase from './supabaseClient';

export const getWeatherData = async (): Promise<WeatherRow[] | null> => {
  const { data, error } = await supabase.from('weather').select('*').limit(5);
  if (error) {
    console.error('Failed to fetch weather data:', error);
    return null;
  }
  return data;
};