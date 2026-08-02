import type { McpServer } from "@modelcontextprotocol/server";
import { completeTaskInputSchema } from "../schemas/complete-task.js";
import { tasks, persistTasks } from "./taskStore.js";

export function registerCompleteTaskTool(server: McpServer): void {
  server.registerTool(
    "complete_task",
    {
      description:
        "Mark an existing task as completed using its task ID. This tool changes task status and returns the updated task.",
      inputSchema: completeTaskInputSchema,
    },
    async ({ taskId }) => {
      const task = tasks.find((t) => t.id === taskId);

      if (!task) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { ok: false, message: `No task found with ID ${taskId}.` },
                null,
                2,
              ),
            },
          ],
        };
      }

      task.done = true;
      persistTasks();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { id: task.id, text: task.text, done: task.done },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}