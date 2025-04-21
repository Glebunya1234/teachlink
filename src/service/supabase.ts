/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createClient } from "@supabase/supabase-js";

export const createClientSupaBase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
}