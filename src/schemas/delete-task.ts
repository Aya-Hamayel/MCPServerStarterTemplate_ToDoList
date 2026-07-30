import * as z from "zod/v4";

// Schema for: delete_task
export const deleteTaskInputSchema = z.object({
  id: z
    .number()
    .int()
    .positive()
    .describe("The ID of the task to delete"),
});