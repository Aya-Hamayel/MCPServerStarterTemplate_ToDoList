import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js";
import { registerAddTaskTool } from "./tools/add-task.js";
import { registerListTasksTool } from "./tools/list-tasks.js";
import { registerCompleteTaskTool } from "./tools/complete-task.js";

/**
 * Factory used by stdio (and later HTTP) so every connection gets a fresh server.
 * Register all tools inside this function — never on a shared global instance.
 */
function createServer(): McpServer {
  const server = new McpServer({
    name: "mcprepo",
    version: "0.1.0",
  });

  // Week 1 — one working tool so you can verify Inspector immediately
  registerGreetTool(server);

  // Week 2 — To-Do List tools
  registerAddTaskTool(server);
  registerListTasksTool(server);
  registerCompleteTaskTool(server);

  return server;
}

void serveStdio(createServer);
console.error("mcprepo MCP server running on stdio");