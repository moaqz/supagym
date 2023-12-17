import { insertRoutineSchema } from "$lib/schema/routine.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const searchParamsSchema = z.object({
  routineId: z.coerce.number().positive(),
});

export async function load({ locals, params }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const searchParams = searchParamsSchema.safeParse(params);
  if (!searchParams.success) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const routine = await locals.supabase
    .from("routines")
    .select("name, goal")
    .eq("user_id", locals.session.user.id)
    .eq("id", searchParams.data.routineId)
    .single();

  if (routine.error || !routine.data) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  return {
    form: await superValidate(routine.data, insertRoutineSchema),
  };
}

export const actions = {
  updateRoutine: async ({ locals, request, params }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
    }

    const form = await superValidate(request, insertRoutineSchema);
    if (!form.valid) {
      return fail(400, { form });
    }

    const searchParams = searchParamsSchema.safeParse(params);
    if (!searchParams.success) {
      throw error(404, {
        message: "Routine not found",
      });
    }

    const routine = await locals.supabase
      .from("routines")
      .update({
        name: form.data.name,
        goal: form.data.goal,
      })
      .eq("id", searchParams.data.routineId)
      .eq("user_id", locals.session.user.id);

    if (routine.error) {
      return message(
        form,
        "Failed to update routine. Please try again later.",
        { status: 500 },
      );
    }

    return { form };
  },
  deleteRoutine: async ({ locals, params }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
    }

    const searchParams = searchParamsSchema.safeParse(params);
    if (!searchParams.success) {
      throw error(404, {
        message: "Routine not found",
      });
    }

    const response = await locals.supabase
      .from("routines")
      .delete()
      .eq("id", searchParams.data.routineId)
      .eq("user_id", locals.session.user.id);

    if (response.error) {
      return fail(500, {
        message: "Failed to delete routine. Please try again later.",
      });
    }

    throw redirect(307, "/routines");
  },
};
