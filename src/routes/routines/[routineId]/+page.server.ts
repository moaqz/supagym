import { createExerciseSchema } from "$lib/schema/exercise.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const searchParamsSchema = z.object({
  routineId: z.coerce.number().positive(),
});

export async function load({ locals, params, depends }) {
  depends("supagym:exercises");

  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const searchParams = searchParamsSchema.safeParse(params);
  if (!searchParams.success) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const routineId = searchParams.data.routineId;
  const userId = locals.session.user.id;

  const routine = await locals.supabase
    .from("routines")
    .select("*")
    .eq("user_id", userId)
    .eq("id", routineId)
    .single();

  if (routine.error || !routine.data) {
    throw error(404);
  }

  const exercises = await locals.supabase
    .from("exercises")
    .select("*")
    .eq("routine_id", routineId)
    .order("createdAt", { ascending: false });

  if (exercises.error) {
    throw error(404);
  }

  return {
    routine: routine.data,
    exercises: exercises.data,
    createExerciseForm: await superValidate(createExerciseSchema),
  };
}

export const actions = {
  createExercise: async ({ locals, request, params }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
    }

    const form = await superValidate(request, createExerciseSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const routineId = parseInt(params.routineId);
    const userId = locals.session.user.id;

    const routine = await locals.supabase
      .from("routines")
      .select("id, user_id")
      .eq("id", routineId)
      .eq("user_id", userId)
      .single();

    if (routine.error || !routine.data) {
      return fail(404, {
        message: "Routine not found",
      });
    }

    const response = await locals.supabase.from("exercises").insert({
      name: form.data.name,
      reps: form.data.reps,
      routine_id: routineId,
      sets: form.data.sets,
      user_id: locals.session.user.id,
    });

    if (response.error) {
      return fail(500, {
        message: "Something went wrong! Could not create the exercise",
        form,
      });
    }

    throw redirect(307, `/routines/${routineId}`);
  },
};
