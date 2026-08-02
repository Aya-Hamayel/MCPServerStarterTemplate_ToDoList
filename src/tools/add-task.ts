import type { McpServer } from "@modelcontextprotocol/server";
import { addTaskInputSchema } from "../schemas/add-task.js";
import { tasks, incrementNextId, persistTasks } from "./taskStore.js";

export function registerAddTaskTool(server: McpServer): void {
  server.registerTool(
    "add_task",
    {
      description: "Add a new task to the to-do list",
      inputSchema: addTaskInputSchema,
    },
    async ({ text }) => {
      const id = incrementNextId();
      const task = { id, text, done: false };
      tasks.push(task);
      persistTasks();

      return {
        content: [
          { type: "text", text: JSON.stringify(task, null, 2) },
        ],
      };
    },
  );
}