import * as z from "zod/v4";

// Tool: List Tasks
export const listTasksInputSchema = z.object({
  text: z
    .string()
    .min(1)
    .max(200)
    .optional()
    .describe("Optional text to filter tasks by title or description"),

  limit: z
    .number()
    .int()
    .positive()
    .max(50)
    .optional()
    .describe("Maximum number of tasks to return, defaults to 10"),
});
