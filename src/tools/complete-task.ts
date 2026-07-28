import type { McpServer } from "@modelcontextprotocol/server";
import { completeTaskInputSchema } from "../schemas/complete-task.js";
import { tasks } from "./taskStore.js";

export function registerCompleteTaskTool(server: McpServer): void {
  server.registerTool(
    "complete_task",
    {
      description: "Mark a task as complete by its ID",
      inputSchema: completeTaskInputSchema,
    },
    async ({ id }) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        return {
          content: [{ type: "text", text: `No task found with ID ${id}.` }],
        };
      }
      task.done = true;
      return {
        content: [{ type: "text", text: `Marked task #${id} as complete.` }],
      };
    },
  );
}