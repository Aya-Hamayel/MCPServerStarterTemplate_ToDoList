import type { McpServer } from "@modelcontextprotocol/server";
import { deleteTaskInputSchema } from "../schemas/delete-task.js";

export function registerDeleteTaskTool(server: McpServer): void {
  server.registerTool(
    "delete_task",
    {
      description: "Delete a task by its ID",
      inputSchema: deleteTaskInputSchema,
    },
    async (input) => {
      // Week 2: stub only — Week 3 replaces this with real data
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ ok: true, stub: true, tool: "delete_task" }, null, 2),
          },
        ],
      };
    },
  );
}