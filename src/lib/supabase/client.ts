import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Public, anon-key client. Never import a service_role key into this file or
 * any file under src/ — this client is bundled into the browser.
 */
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: { persistSession: false },
      })
    : null;

export const isSupabaseConfigured = Boolean(url && anonKey);
