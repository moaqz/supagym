import {
  createExerciseSchema,
  updateExerciseSchema,
} from "$lib/schema/exercise.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { number, z } from "zod";

const paramsSchema = z.object({
  id: number().positive(),
});

export async function load({ locals, url, params }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const parsedParams = paramsSchema.safeParse({
    id: parseInt(url.searchParams.get("id") ?? ""),
  });

  if (!parsedParams.success) {
    return {
      form: superValidate(createExerciseSchema),
      exercise: null,
    };
  }

  const routineId = parseInt(params.routineId);
  const exerciseId = parsedParams.data.id;
  const userId = locals.session.user.id;

  const routine = await locals.supabase
    .from("routines")
    .select("*")
    .eq("id", routineId)
    .eq("user_id", userId);

  if (routine.error) {
    throw error(401, {
      message: "You don't have access to this exercise",
    });
  }

  const exercise = await locals.supabase
    .from("exercises")
    .select("id, name, sets, reps")
    .eq("id", exerciseId)
    .eq("user_id", userId)
    .single();

  if (exercise.error) {
    throw error(404);
  }

  return {
    form: superValidate(exercise.data, updateExerciseSchema),
    exercise: exercise.data,
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
  updateExercise: async ({ locals, request, params }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
    }

    const form = await superValidate(request, updateExerciseSchema);
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

    const response = await locals.supabase
      .from("exercises")
      .update({
        name: form.data.name,
        reps: form.data.reps,
        sets: form.data.sets,
      })
      .eq("id", form.data.id);

    if (response.error) {
      return fail(500, {
        message: "Something went wrong! Could not update the exercise",
        form,
      });
    }

    throw redirect(307, `/routines/${routineId}`);
  },
};
