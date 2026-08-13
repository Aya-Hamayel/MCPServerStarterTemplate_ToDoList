import { z } from "zod";

export const addTaskInputSchema = z.object({
text: z
  .string()
  .min(1, "Task text cannot be empty")
  .max(200, "Task text must be 200 characters or less")
  .describe("The task description"),
});
