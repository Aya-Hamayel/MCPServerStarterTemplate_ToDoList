import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { listTasksInputSchema } from "../schemas/list-task.js";
import { tasks } from "./taskStore.js";

export function registerListTasksTool(server: McpServer): void {
  server.registerTool(
    "list_tasks",
    {
      description: "List all tasks in the to-do list",
      inputSchema: listTasksInputSchema,
    },
    async () => {
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