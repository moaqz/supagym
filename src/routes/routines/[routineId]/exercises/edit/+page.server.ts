import {
  createExerciseSchema,
  updateExerciseSchema,
} from "$lib/schema/exercise.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { number, z } from "zod";

const paramsSchema = z.object({
  routineId: number().positive(),
  id: number().positive().nullable(),
});

export async function load({ locals, url, params }) {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(307, "/login");
  }

  const result = paramsSchema.safeParse({
    routineId: parseInt(params.routineId),
    id: parseInt(url.searchParams.get("id") ?? ""),
  });

  let isEditMode = false;
  if (result.success && result.data.id) {
    isEditMode = true;
  }

  if (!isEditMode) {
    return {
      form: superValidate(createExerciseSchema),
      exercise: null,
    };
  }

  // @ts-ignore
  const routineId = result.data.routineId;
  // @ts-ignore
  const exerciseId = result.data.id;
  const userId = session.user.id;

  // Verify that the routine belongs to the user.
  const routine = await locals.supabase
    .from("routines")
    .select("id, user_id")
    .eq("id", routineId)
    .eq("user_id", userId)
    .single();

  if (routine.error || routine.data.user_id !== userId) {
    throw error(401);
  }

  const exercise = await locals.supabase
    .from("exercises")
    .select("id, name, sets, reps")
    .eq("id", exerciseId)
    .eq("user_id", userId)
    .single();

  if (exercise.error) {
    throw error(404, {
      message: "Exercise not found",
    });
  }

  return {
    form: superValidate(exercise.data, updateExerciseSchema),
    exercise: exercise.data,
  };
}

export const actions = {
  createExercise: async ({ locals, request, params }) => {
    const session = await locals.getSession();
    const routineId = parseInt(params.routineId);

    if (!session) {
      return fail(401, {
        message: "You must be logged in to create an exercise.",
      });
    }

    const form = await superValidate(request, createExerciseSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const routine = await locals.supabase
      .from("routines")
      .select("id, user_id")
      .eq("id", routineId)
      .single();

    if (routine.error) {
      return fail(500, {
        message: "Something went wrong! Could not create the exercise",
        form,
      });
    }

    if (!(routine.data.user_id === session.user.id)) {
      return fail(401, {
        message: "You don't have access to this resource",
        form,
      });
    }

    const response = await locals.supabase.from("exercises").insert({
      name: form.data.name,
      reps: form.data.reps,
      routine_id: routineId,
      sets: form.data.sets,
      user_id: session.user.id,
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
    const session = await locals.getSession();
    const routineId = parseInt(params.routineId);

    if (!session) {
      return fail(401, {
        message: "You must be logged in to edit an exercise.",
      });
    }

    const form = await superValidate(request, updateExerciseSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const routine = await locals.supabase
      .from("routines")
      .select("id, user_id")
      .eq("id", routineId)
      .single();

    if (routine.error) {
      return fail(500, {
        message: "Something went wrong! Could not update the exercise",
        form,
      });
    }

    if (!(routine.data.user_id === session.user.id)) {
      return fail(401, {
        message: "You don't have access to this resource",
        form,
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
