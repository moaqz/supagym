import { insertRoutineSchema } from "$lib/schema/routine";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";

export async function load({ locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(307, "/login");
  }

  const form = await superValidate(insertRoutineSchema);
  return { form };
}

export const actions = {
  createRoutine: async ({ locals, request }) => {
    const session = await locals.getSession();

    if (!session) {
      return fail(401, {
        message: "You must be logged in to create a routine.",
      });
    }

    const form = await superValidate(request, insertRoutineSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { error, data: routine } = await locals.supabase
      .from("routines")
      .insert({
        name: form.data.name,
        goal: form.data.goal,
        user_id: session.user.id,
      })
      .select("id")
      .single();

    if (error) {
      return fail(400, { form });
    }

    throw redirect(303, `/routines/${routine.id}`);
  },
};
