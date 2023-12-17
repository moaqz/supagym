import { deleteExerciseSchema } from "$lib/schema/exercise.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const searchParamsSchema = z.object({
  routineId: z.coerce.number().positive(),
});

export async function load({ locals, params }) {
  const session = await locals.getSession();
  if (!session) {
    throw redirect(307, "/login");
  }

  const searchParams = searchParamsSchema.safeParse(params);
  if (!searchParams.success) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const { data: routine, error: supabaseError } = await locals.supabase
    .from("routines")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("id", searchParams.data.routineId)
    .single();

  if (supabaseError) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const exercises = await locals.supabase
    .from("exercises")
    .select("*")
    .eq("routine_id", searchParams.data.routineId);

  if (exercises.error) {
    throw error(404, {
      message: "Exercises not found",
    });
  }

  return { routine, exercises: exercises.data };
}

export const actions = {
  deleteExercise: async ({ locals, request, params }) => {
    const session = await locals.getSession();
    if (!session) {
      return fail(401, {
        message: "You must be logged in.",
      });
    }

    let exerciseId = (await request.formData()).get("exerciseId");
    if (!exerciseId || exerciseId instanceof File) {
      return fail(400);
    }

    const form = deleteExerciseSchema.safeParse({
      routineId: parseInt(params.routineId),
      exerciseId: parseInt(exerciseId),
    });

    if (!form.success) {
      return fail(400);
    }

    const routine = await locals.supabase
      .from("routines")
      .select("id, user_id")
      .eq("id", form.data.routineId)
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

    const { error } = await locals.supabase
      .from("exercises")
      .delete()
      .eq("id", form.data.exerciseId);

    if (error) {
      return fail(500, {
        messsage: "Something went wrong!",
      });
    }

    return { success: true };
  },
};
