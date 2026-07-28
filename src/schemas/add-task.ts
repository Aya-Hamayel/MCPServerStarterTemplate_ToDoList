import * as z from "zod/v4";

// Schema for: add_task
export const addTaskInputSchema = z.object({
  text: z
    .string()
    .min(1)
    .max(200)
    .describe("The task description to add to the to-do list"),
});