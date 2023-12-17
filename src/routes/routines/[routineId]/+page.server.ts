import { deleteExerciseSchema } from "$lib/schema/exercise";
import { createExerciseLogSchema } from "$lib/schema/exercise-log";
import { error, fail, redirect } from "@sveltejs/kit";
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
  };
}

export const actions = {
  deleteExercise: async ({ locals, request, params }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
    }

    const exerciseId = (await request.formData()).get("exerciseId");
    if (!exerciseId || exerciseId instanceof File) {
      return fail(400);
    }

    const form = deleteExerciseSchema.safeParse({
      routineId: parseInt(params.routineId),
      exerciseId: parseInt(exerciseId),
    });

    if (!form.success) {
      return fail(400, {
        message: "Missing required fields",
      });
    }

    const routine = await locals.supabase
      .from("routines")
      .select("id, user_id")
      .eq("id", form.data.routineId)
      .eq("user_id", locals.session.user.id)
      .single();

    if (routine.error) {
      return fail(404);
    }

    const response = await locals.supabase
      .from("exercises")
      .delete()
      .eq("id", form.data.exerciseId);

    if (response.error) {
      return fail(500, {
        messsage: "Failed to delete the exercise. Please try again later",
      });
    }

    return { success: true };
  },
  addExecution: async ({ locals, request }) => {
    if (!locals.session) {
      throw redirect(303, "/login");
    }

    const formData = await request.formData();
    const form = createExerciseLogSchema.safeParse({
      // @ts-ignore
      routineId: parseInt(formData.get("routineId")),
      // @ts-ignore
      exerciseId: parseInt(formData.get("exerciseId")),
    });

    if (!form.success) {
      return fail(400);
    }

    const routine = await locals.supabase
      .from("routines")
      .select("*")
      .eq("user_id", locals.session.user.id)
      .eq("id", form.data.routineId)
      .single();

    if (routine.error) {
      return fail(404, {
        message: "Routine not found",
      });
    }

    const { error } = await locals.supabase.from("exercise_logs").insert({
      exercise_id: form.data.exerciseId,
      routine_id: form.data.routineId,
    });

    if (error) {
      return fail(500, {
        message: "Failed to log exercise completion. Please try again later.",
      });
    }

    return { success: true };
  },
};
