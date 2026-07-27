import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { completeTaskInputSchema } from "../schemas/complete-task.js";

/** Week 2 stub — marks a task as completed. */
export function registerCompleteTaskTool(server: McpServer): void {
  server.registerTool(
    "complete_task",
    {
      description:
        "Mark an existing task as completed using its task ID. This tool changes task status and returns the updated task.",
      inputSchema: completeTaskInputSchema,
    },
    async ({ taskId }) => {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                stub: true,
                tool: "complete_task",
                task: {
                  id: taskId,
                  status: "completed",
                },
                message:
                  "Task marked as completed in the Week 2 stub response.",
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