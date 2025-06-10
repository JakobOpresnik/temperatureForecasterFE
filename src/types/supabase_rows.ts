import type { Database } from "./supabase";

export type WeatherRow = Database['public']['Tables']['weather']['Row'];
export type StationRow = Database['public']['Tables']['station']['Row'];