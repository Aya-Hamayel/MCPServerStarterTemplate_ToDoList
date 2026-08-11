import { z } from "zod/v4";

// Schema for: list_tasks
export const listTasksInputSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Filter text cannot be empty")
    .max(200, "Filter text must be 200 characters or less")
    .optional()
    .describe("Optional text used to filter tasks"),

  limit: z
    .number()
    .int()
    .positive()
    .max(50, "Limit cannot be greater than 50")
    .optional()
    .describe("Maximum number of tasks to return"),
});