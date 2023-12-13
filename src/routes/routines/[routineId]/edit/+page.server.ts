import { newRoutineSchema } from "$lib/schema/routine.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const searchParamsSchema = z.object({
  routineId: z.coerce.number().positive(),
});

export async function load({ locals, params }) {
  const searchParams = searchParamsSchema.safeParse(params);
  if (!searchParams.success) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const session = await locals.getSession();
  if (!session) {
    throw error(401, {
      message: "You must be logged in to edit a routine",
    });
  }

  const { data } = await locals.supabase
    .from("routines")
    .select("name, description")
    .eq("user_id", session.user.id)
    .eq("id", searchParams.data.routineId);

  if (!data || data.length <= 0) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const form = await superValidate(data.at(0), newRoutineSchema);
  return { form };
}

export const actions = {
  updateRoutine: async ({ locals, request, params }) => {
    const searchParams = searchParamsSchema.safeParse(params);
    if (!searchParams.success) {
      throw error(404, {
        message: "Routine not found",
      });
    }

    const session = await locals.getSession();
    if (!session) {
      return fail(401, {
        message: "You must be logged in to update a routine",
      });
    }

    const form = await superValidate(request, newRoutineSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    // TODO: handle errors
    const {} = await locals.supabase
      .from("routines")
      .update({
        name: form.data.name,
        description: form.data.description,
      })
      .eq("id", searchParams.data.routineId)
      .eq("user_id", session.user.id);

    return { form };
  },
  deleteRoutine: async ({ locals, params }) => {
    const searchParams = searchParamsSchema.safeParse(params);
    if (!searchParams.success) {
      throw error(404, {
        message: "Routine not found",
      });
    }

    const session = await locals.getSession();
    if (!session) {
      return fail(401, {
        message: "You must be logged in to update a routine",
      });
    }

    // TODO: handle errors
    await locals.supabase
      .from("routines")
      .delete()
      .eq("id", searchParams.data.routineId)
      .eq("user_id", session.user.id);

    throw redirect(301, "/routines");
  },
};
