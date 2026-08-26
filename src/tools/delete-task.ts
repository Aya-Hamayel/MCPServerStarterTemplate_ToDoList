import type { McpServer } from "@modelcontextprotocol/server";
import { deleteTaskInputSchema } from "../schemas/delete-task.js";
import { deleteTaskById } from "../lib/tasks.js";

export function registerDeleteTaskTool(server: McpServer): void {
  server.registerTool(
    "delete_task",
    {
      description:
        "Delete an existing task using its task ID and return a deletion confirmation.",
      inputSchema: deleteTaskInputSchema,
    },
    async ({ taskId }) => {
      const task = await deleteTaskById(taskId);

      if (!task) {
        return {
          content: [
            {
              type: "text",
              text: `Task #${taskId} not found. It may have already been removed or the ID is incorrect.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Task #${task.id} deleted successfully: "${task.text}"`,
          },
        ],
      };
    },
  );
}