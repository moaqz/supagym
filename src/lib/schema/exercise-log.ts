import { z } from "zod";

export const createExerciseLogSchema = z.object({
  routineId: z.number().positive(),
  exerciseId: z.number().positive(),
});
