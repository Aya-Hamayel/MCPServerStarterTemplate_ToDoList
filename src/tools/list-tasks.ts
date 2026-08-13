import type { McpServer } from "@modelcontextprotocol/server";
import { listTasksInputSchema } from "../schemas/list-tasks.js";
import { listTasksFromStore } from "../lib/tasks.js";

export function registerListTasksTool(server: McpServer): void {
  server.registerTool(
    "list_tasks",
    {
      description:
        "List tasks with optional text filtering and a safe result limit",
      inputSchema: listTasksInputSchema,
    },

    async ({ text, limit }) => {
      try {
        const result = await listTasksFromStore(text, limit ?? 10);

        const tasks = result.tasks;

        if (tasks.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "No matching tasks found.",
              },
            ],
          };
        }

        const summary = tasks
          .map((task) => {
            return `#${task.id} [${task.done ? "x" : " "}] ${task.text}`;
          })
          .join("\n");

        const truncationMessage = result.truncated
          ? "\n\nResults were limited to the requested maximum."
          : "";

        return {
          content: [
            {
              type: "text",
              text: summary + truncationMessage,
            },
          ],
        };
      } catch {
        return {
          content: [
            {
              type: "text",
              text: "Unable to list tasks. Please try again.",
            },
          ],
        };
      }
    },
  );
}