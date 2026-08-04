import type { McpServer } from "@modelcontextprotocol/server";
import { addTaskInputSchema } from "../schemas/add-task.js";
import { addTaskToStore } from "../lib/tasks.js";

export function registerAddTaskTool(server: McpServer): void {
  server.registerTool(
    "add_task",
    {
      description: "Add a new task to the to-do list",
      inputSchema: addTaskInputSchema,
    },
    async ({ text }) => {
  const task = await addTaskToStore(text);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(task, null, 2),
      },
    ],
   };
   },
  );
}