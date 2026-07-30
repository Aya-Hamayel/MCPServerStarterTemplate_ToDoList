import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerGreetTool } from "./tools/greet.js";
import { registerAddTaskTool } from "./tools/add-task.js";
import { registerListTasksTool } from "./tools/list-task.js";
import { registerCompleteTaskTool } from "./tools/complete-task.js";
import { registerDeleteTaskTool } from "./tools/delete-task.js";

function createServer(): McpServer {
  const server = new McpServer({
    name: "todo-list-mcp",
    version: "0.1.0",
  });

registerGreetTool(server);
registerAddTaskTool(server);
registerListTasksTool(server);
registerCompleteTaskTool(server);
registerDeleteTaskTool(server);

  return server;
}

void serveStdio(createServer);

console.error("To-Do List MCP server running on stdio");