import type { Database } from "$lib/supabase";
import { SupabaseClient, Session } from "@supabase/supabase-js";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
