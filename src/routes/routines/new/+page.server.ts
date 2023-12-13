import { newRoutineSchema } from "$lib/schema/routine";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";

export async function load({ locals }) {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(307, "/login");
  }

  const form = await superValidate(newRoutineSchema);

  return { form };
}

export const actions = {
  default: async ({ locals, request }) => {
    const session = await locals.getSession();

    if (!session) {
      return fail(401, {
        message: "You must be logged in to create a routine.",
      });
    }

    const form = await superValidate(request, newRoutineSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const { data } = form;

    const { error } = await locals.supabase.from("routines").insert({
      name: data.name,
      description: data.description,
      user_id: session.user.id,
    });

    if (error) {
      return fail(400, { form });
    }

    return { form };
  },
};
