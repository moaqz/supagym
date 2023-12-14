import { z } from "zod";

export const newRoutineSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50, { message: "Routine name must be between 1 and 50 characters." }),
  goal: z
    .string()
    .max(200, {
      message: "Routine goal exceeds the maximum length of 200 characters.",
    })
    .nullable(),
});

export type NewRoutine = typeof newRoutineSchema;

export type Routine = {
  createdAt: string | null;
  goal: string | null;
  id: number;
  name: string;
  user_id: string;
};

export const searchParamsSchema = z.object({
  routineId: z.coerce.number().positive(),
});
