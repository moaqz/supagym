import { z } from "zod";

export const newRoutineSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50, { message: "Routine name must be between 1 and 50 characters." }),
  description: z
    .string()
    .max(200, {
      message:
        "Routine description exceeds the maximum length of 200 characters.",
    })
    .nullable(),
});

export type NewRoutine = typeof newRoutineSchema;

export type Routine = {
  createdAt: string | null;
  description: string | null;
  id: number;
  title: string;
  user_id: string;
};
