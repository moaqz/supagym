import { insertRoutineSchema } from "$lib/schema/routine.js";
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
    .select("name, goal")
    .eq("user_id", session.user.id)
    .eq("id", searchParams.data.routineId);

  if (!data || data.length <= 0) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const form = await superValidate(data.at(0), insertRoutineSchema);
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

    const form = await superValidate(request, insertRoutineSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    await locals.supabase
      .from("routines")
      .update({
        name: form.data.name,
        goal: form.data.goal,
      })
      .eq("id", searchParams.data.routineId)
      .eq("user_id", session.user.id);

    return { form };
  },
  deleteRoutine: async ({ locals, params }) => {
    const searchParams = searchParamsSchema.safeParse(params);
    if (!searchParams.success) {
      return fail(404, {
        message: "Routine not found",
      });
    }

    const session = await locals.getSession();
    if (!session) {
      return fail(401, {
        message: "You must be logged in to update a routine",
      });
    }

    const { error } = await locals.supabase
      .from("routines")
      .delete()
      .eq("id", searchParams.data.routineId)
      .eq("user_id", session.user.id);

    if (error) {
      return fail(500, {
        message: "Something went wrong!",
      });
    }

    if (error) throw redirect(301, "/routines");
  },
};
