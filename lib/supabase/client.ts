import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // During build time, return a mock client that won't be used
    if (!supabaseUrl || !supabaseAnonKey) {
        // Return existing client if available, otherwise create a placeholder
        // This prevents build-time errors while actual runtime will have env vars
        if (typeof window === "undefined") {
            // Server-side during build - return null safely
            return null as unknown as SupabaseClient;
        }
        throw new Error("Supabase environment variables are not configured");
    }

    // Reuse existing client for browser
    if (supabaseClient) {
        return supabaseClient;
    }

    supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
}
