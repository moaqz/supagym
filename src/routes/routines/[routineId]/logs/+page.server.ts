import { error, redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
  if (!locals.session) {
    throw redirect(303, "/login");
  }

  const routineId = parseInt(params.routineId);
  const routine = await locals.supabase
    .from("routines")
    .select("*")
    .eq("id", routineId)
    .eq("user_id", locals.session.user.id)
    .single();

  if (routine.error) {
    throw error(404, {
      message: "Routine not found",
    });
  }

  const exerciseLogs = await locals.supabase
    .from("exercise_logs")
    .select(
      `
      id, 
      createdAt,
      exercises (
        id, 
        name
      )
    `,
    )
    .eq("routine_id", routineId)
    .order("createdAt", { ascending: false });

  if (exerciseLogs.error) {
    throw error(404, {
      message: "Exercise logs not found",
    });
  }

  return {
    routine: routine.data,
    exerciseLogs: exerciseLogs.data,
  };
}
