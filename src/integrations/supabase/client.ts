import * as Supabase from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = 'VITE_SUPABASE_URL';
const supabaseAnonKey = 'VITE_SUPABASE_ANON_KEY';

export const supabase = Supabase.createClient<Database>(supabaseUrl, supabaseAnonKey)