import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import type { Database } from "$lib/supabase";
import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle } from "@sveltejs/kit";

const PUBLIC_ROUTES = ["/", "/login"];

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event,
  });

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  event.locals.session = await event.locals.getSession();

  if (!event.locals.session) {
    const path = event.url.pathname;
    console.log(
      `No session found on [Hooks.server.ts] Trying to access path [${path}]`,
    );
    const isRoutePublic = PUBLIC_ROUTES.includes(path);

    if (!isRoutePublic) {
      throw redirect(303, "/login");
    }
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range";
    },
  });
};
