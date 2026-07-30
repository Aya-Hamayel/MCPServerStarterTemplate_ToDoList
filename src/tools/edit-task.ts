import type { McpServer } from "@modelcontextprotocol/server";
import { editTaskInputSchema } from "../schemas/edit-task.js";

export function registerEditTaskTool(server: McpServer): void {
  server.registerTool(
    "edit_task",
    {
      description: "Edit the text of an existing task",
      inputSchema: editTaskInputSchema,
    },
    async (input) => {
      // Week 2: stub only — Week 3 replaces this with real data
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ ok: true, stub: true, tool: "edit_task" }, null, 2),
          },
        ],
      };
    },
  );
}