import { z } from "zod/v4";

/** Tool: complete_task */
export const completeTaskInputSchema = z.object({
  taskId: z
    .string()
    .min(1, "Task ID cannot be empty")
    .max(50, "Task ID must not exceed 50 characters")
    .describe("The unique ID of the task to mark as completed"),
});