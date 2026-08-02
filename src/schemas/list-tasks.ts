import * as z from "zod/v4";

// Schema for: list_tasks
export const listTasksInputSchema = z.object({
  text: z
    .string()
    .optional()
    .describe("Optional search text to filter tasks by"),
  limit: z
    .number()
    .int()
    .positive()
    .max(50)
    .optional()
    .describe("Max number of tasks to return, defaults to 10"),
});