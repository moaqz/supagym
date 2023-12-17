import { z } from "zod";

export type Routine = {
  id: number;
  name: string;
  goal: string | null;
  user_id: string;
  createdAt: string | null;
};

export const insertRoutineSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Routine name must contain at least 3 character(s)" })
    .max(50, { message: "Routine name must contain at most 50 character(s)" }),
  goal: z
    .string()
    .trim()
    .max(400, {
      message: "Routine goal cannot exceed 400 characters",
    })
    .nullable(),
});

export type InsertRoutine = typeof insertRoutineSchema;
