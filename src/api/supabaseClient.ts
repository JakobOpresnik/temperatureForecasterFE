import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

console.log("SUPABASE URL: ", supabaseUrl)
console.log("SUPABASE_KEY: ", supabaseKey)

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

console.log('Supabase client created: ', supabase);

export default supabase;
