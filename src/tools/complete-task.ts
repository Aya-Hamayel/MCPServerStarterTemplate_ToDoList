import type { McpServer } from "@modelcontextprotocol/server";
import { completeTaskInputSchema } from "../schemas/complete-task.js";
import { completeTaskById } from "../lib/tasks.js";

export function registerCompleteTaskTool(server: McpServer): void {
  server.registerTool(
    "complete_task",
    {
      description:
        "Mark an existing task as completed using its task ID. This tool changes task status and returns the updated task.",
      inputSchema: completeTaskInputSchema,
    },
    async ({ taskId }) => {
      const task = await completeTaskById(taskId);

      if (!task) {
        return {
          content: [
            { type: "text", text: `Task #${taskId} not found. It may have already been removed or the ID is incorrect.` },
          ],
        };
      }

      return {
        content: [
          { type: "text", text: `Task #${task.id} marked as completed: "${task.text}"` },
        ],
      };
    },
  );
}