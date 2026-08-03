import { z } from "zod";

export const addTaskInputSchema = z.object({
  text: z.string().min(1).describe("The task description"),
});
