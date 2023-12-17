import { error, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const routines = await locals.supabase
    .from("routines")
    .select("*")
    .eq("user_id", locals.session.user.id);

  if (routines.error) {
    throw error(404);
  }

  return { routines: routines.data };
}
