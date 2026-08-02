import type { McpServer } from "@modelcontextprotocol/server";
import { listTasksInputSchema } from "../schemas/list-tasks.js";
import { tasks } from "./taskStore.js";

export function registerListTasksTool(server: McpServer): void {
  server.registerTool(
    "list_tasks",
    {
      description: "List all tasks in the to-do list, optionally filtered by text",
      inputSchema: listTasksInputSchema,
    },
    async ({ text, limit }) => {
      let result = tasks;

      if (text) {
        result = result.filter((t) =>
          t.text.toLowerCase().includes(text.toLowerCase()),
        );
      }

      if (limit) {
        result = result.slice(0, limit);
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ tasks: result }, null, 2),
          },
        ],
      };
    },
  );
}