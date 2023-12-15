import { error, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(307, "/login");
  }

  const { data, error: supabaseError } = await locals.supabase
    .from("routines")
    .select("*")
    .eq("user_id", session.user.id);

  if (supabaseError) {
    throw error(404);
  }

  return { routines: data };
}
