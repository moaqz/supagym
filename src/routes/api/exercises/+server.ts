import { json, redirect } from "@sveltejs/kit";
import { deleteExerciseSchema } from "$lib/schema/exercise.js";

// [POST]: record workout exercise
export async function POST({ locals, request }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const body = await request.json();
  const result = deleteExerciseSchema.safeParse(body);

  if (!result.success) {
    return json("Missing required fields", {
      status: 400,
    });
  }

  const routine = await locals.supabase
    .from("routines")
    .select("*")
    .eq("user_id", locals.session.user.id)
    .eq("id", result.data.routineId)
    .single();

  if (routine.error) {
    return json("Routine not found", {
      status: 404,
    });
  }

  const { error } = await locals.supabase.from("exercise_logs").insert({
    exercise_id: result.data.exerciseId,
    routine_id: result.data.routineId,
  });

  if (error) {
    return json(
      "Failed to log exercise completion. Unable to save exercise data.",
      {
        status: 500,
      },
    );
  }

  return json({ success: true });
}

// [DELETE]: Delete exercise
export async function DELETE({ locals, url }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const routineId = url.searchParams.get("routineId") || "";
  const exerciseId = url.searchParams.get("exerciseId") || "";

  const result = deleteExerciseSchema.safeParse({
    routineId: parseInt(routineId),
    exerciseId: parseInt(exerciseId),
  });

  if (!result.success) {
    return json("Missing required fields", {
      status: 400,
    });
  }

  const routine = await locals.supabase
    .from("routines")
    .select("id, user_id")
    .eq("id", result.data.routineId)
    .eq("user_id", locals.session.user.id)
    .single();

  if (routine.error) {
    return json("Routine not found", {
      status: 404,
    });
  }

  const response = await locals.supabase
    .from("exercises")
    .delete()
    .eq("id", result.data.exerciseId);

  if (response.error) {
    console.log(response.error);
    return json("Failed to delete the exercise. Please try again later", {
      status: 500,
    });
  }

  return json({ success: true });
}
