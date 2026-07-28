import * as z from "zod/v4";

// Schema for: complete_task
export const completeTaskInputSchema = z.object({
  id: z
    .number()
    .int()
    .positive()
    .describe("The ID of the task to mark as complete"),
});