import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional(),
});

export const taskIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});