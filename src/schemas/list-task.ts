import { z } from "zod";

export const listTasksInputSchema = z.object({
      text: z.string().min(1).describe("The task description"),

});

