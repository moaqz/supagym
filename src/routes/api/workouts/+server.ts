import { json, redirect } from '@sveltejs/kit'
import { z } from 'zod';

const deleteWorkoutSchema = z.object({
  workoutId: z.number().positive(),
  exerciseId: z.number().positive(),
});

export async function DELETE({ locals, url }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const workoutId = url.searchParams.get("workoutId") || "";
  const exerciseId = url.searchParams.get("exerciseId") || "";

  const result = deleteWorkoutSchema.safeParse({
    workoutId: parseInt(workoutId),
    exerciseId: parseInt(exerciseId),
  });

  if (!result.success) {
    return json("Invalid or missing workout and/or exercise ID", {
      status: 400,
    });
  }

  const exercise = await locals.supabase
    .from("exercises")
    .select("*")
    .eq("id", exerciseId)
    .eq("user_id", locals.session.user.id);

  if (exercise.error) {
    return json("Failed to fetch exercise information", { status: 401 })
  }

  const { error } = await locals.supabase
    .from("exercise_logs")
    .delete()
    .eq("id", workoutId)

  if (error) {
    return json("Failed to delete workout log.", { status: 500 })
  }

  return json({ success: true })
}
