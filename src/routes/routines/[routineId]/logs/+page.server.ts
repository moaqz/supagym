import { error, redirect } from "@sveltejs/kit";

export async function load({ locals, params, url, depends }) {
  depends("supagym:logs")

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

  let page = Number(url.searchParams.get("page")) || 1
  if (page < 1) {
    page = 1
  }
  const take = 8
  const skip = (page - 1) * take

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
      { count: "exact" }
    )
    .eq("routine_id", routineId)
    .order("createdAt", { ascending: false })
    .range(skip, skip + take - 1);

  if (exerciseLogs.error) {
    throw error(404, {
      message: "Exercise logs not found",
    });
  }

  const pageCount = exerciseLogs.count ? Math.ceil(exerciseLogs.count / take) : 0

  return {
    routine: routine.data,
    exerciseLogs: exerciseLogs.data,
    totalPages: pageCount,
  };
}
