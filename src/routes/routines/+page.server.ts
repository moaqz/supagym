import { insertRoutineSchema } from "$lib/schema/routine.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";

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

  return {
    routines: routines.data,
    routineForm: await superValidate(insertRoutineSchema),
  };
}

export const actions = {
  createRoutine: async ({ locals, request }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
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
        user_id: locals.session.user.id,
      })
      .select("id")
      .single();

    if (error) {
      return message(
        form,
        "Failed to create routine. Please try again later.",
        { status: 500 },
      );
    }

    throw redirect(303, `/routines/${routine.id}`);
  },
};
