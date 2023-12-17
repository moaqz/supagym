import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Exercise name must contain at least 3 character(s)" })
    .max(40, { message: "Exercise name must contain at most 50 character(s)" }),
  sets: z.number().positive({ message: "Sets must be a positive number" }),
  reps: z.number().positive({ message: "Reps must be a positive number" }),
});

export type CreateExercise = typeof createExerciseSchema;

export const updateExerciseSchema = createExerciseSchema.extend({
  id: z.number().positive(),
});

export type UpdateExercise = typeof updateExerciseSchema;

export const deleteExerciseSchema = z.object({
  routineId: z.number().positive(),
  exerciseId: z.number().positive(),
});

export type Exercise = {
  createdAt: string | null;
  id: number;
  name: string;
  reps: number;
  routine_id: number;
  sets: number;
  user_id: string;
};
