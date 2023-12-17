import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z.string().trim().min(3).max(60),
  sets: z.number().positive(),
  reps: z.number().positive(),
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
