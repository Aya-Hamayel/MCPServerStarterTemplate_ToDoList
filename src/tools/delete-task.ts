import type { McpServer } from "@modelcontextprotocol/server";

import { deleteTaskInputSchema } from "../schemas/delete-task.js";

/** Week 2 stub — deletes a task using its task ID. */
export function registerDeleteTaskTool(server: McpServer): void {
  server.registerTool(
    "delete_task",
    {
      description:
        "Delete an existing task using its numeric task ID and return a deletion confirmation.",
      inputSchema: deleteTaskInputSchema,
    },
    async ({ taskId }) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                stub: true,
                tool: "delete_task",
                deletedTaskId: taskId,
                message: `Task #${taskId} was deleted successfully.`,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}