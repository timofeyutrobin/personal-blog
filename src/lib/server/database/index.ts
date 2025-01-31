import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '$env/static/private'
import type { Database } from '$lib/types/supabase';

export const db = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);