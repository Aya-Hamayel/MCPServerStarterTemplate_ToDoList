import { z } from "zod/v4";

/** Tool: delete_task */
export const deleteTaskInputSchema = z.object({
  taskId: z
    .number()
    .int()
    .positive()
    .describe("The unique numeric ID of the task to delete"),
});