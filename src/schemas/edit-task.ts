import * as z from "zod/v4";

// Schema for: edit_task
export const editTaskInputSchema = z.object({
  id: z
    .number()
    .int()
    .positive()
    .describe("The ID of the task to edit"),
  text: z
    .string()
    .min(1)
    .max(200)
    .describe("The new task description"),
});