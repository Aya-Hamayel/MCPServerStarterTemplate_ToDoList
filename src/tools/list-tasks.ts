import type { McpServer } from "@modelcontextprotocol/server";
import { listTasksInputSchema } from "../schemas/list-tasks.js";
import { listTasksFromStore } from "../lib/tasks.js";

export function registerListTasksTool(server: McpServer): void {
  server.registerTool(
    "list_tasks",
    {
      description: "List all tasks in the to-do list",
      inputSchema: listTasksInputSchema,
    },
    async () => {
      const tasks = await listTasksFromStore();

      if (tasks.length === 0) {
        return {
          content: [{ type: "text", text: "No tasks yet." }],
        };
      }

      const summary = tasks
        .map((t) => `#${t.id} [${t.done ? "x" : " "}] ${t.text}`)
        .join("\n");

      return {
        content: [{ type: "text", text: summary }],
      };
    },
  );
}