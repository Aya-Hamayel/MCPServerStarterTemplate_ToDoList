import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addTaskInputSchema } from "../schemas/add-task.js";
import { tasks, incrementNextId } from "./taskStore.js";

export function registerAddTaskTool(server: McpServer): void {
  server.registerTool(
    "add_task",
    {
      description: "Add a new task to the to-do list",
      inputSchema: addTaskInputSchema,
    },
    async ({ text }) => {
      const id = incrementNextId();
      tasks.push({ id, text, done: false });
      return {
        content: [{ type: "text", text: `Added task #${id}: "${text}"` }],
      };
    },
  );
}
