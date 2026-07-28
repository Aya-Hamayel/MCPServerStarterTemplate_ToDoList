import * as z from "zod/v4";

/** Tool: complete_task */
export const completeTaskInputSchema = z.object({
  taskId: z
    .number()
    .int()
    .positive()
    .describe("The unique numeric ID of the task to mark as completed"),
});