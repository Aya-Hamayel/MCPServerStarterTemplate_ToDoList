import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js";
import { registerAddTaskTool } from "./tools/add-task.js";
import { registerListTasksTool } from "./tools/list-tasks.js";
import { registerCompleteTaskTool } from "./tools/complete-task.js";
import { registerDeleteTaskTool } from "./tools/delete-task.js";
import { registerEditTaskTool } from "./tools/edit-task.js";

/**
 * Factory used by stdio (and later HTTP) so every connection gets a fresh server.
 * Register all tools inside this function — never on a shared global instance.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "todo-list-mcp",
    version: "0.2.0",
  });

  // Week 1 — verify Inspector
  registerGreetTool(server);

  // P0 — must work for Demo Day
  registerAddTaskTool(server);
  registerListTasksTool(server);
  registerCompleteTaskTool(server);

  // P1 — stubs for now, real logic comes in Week 3
  registerDeleteTaskTool(server);
  registerEditTaskTool(server);

  return server;
}

void serveStdio(createServer);
console.error("todo-list-mcp MCP server running on stdio");