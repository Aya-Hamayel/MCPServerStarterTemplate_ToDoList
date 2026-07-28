import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerGreetTool } from "./tools/greet.js";
import { registerAddTaskTool } from "./tools/add-task.js";
import { registerListTasksTool } from "./tools/list-task.js";
import { registerCompleteTaskTool } from "./tools/complete-task.js";

const server = new McpServer({
  name: "todo-list-mcp",
  version: "0.1.0",
});

registerGreetTool(server);
registerAddTaskTool(server);
registerListTasksTool(server);
registerCompleteTaskTool(server);

const transport = new StdioServerTransport();
await server.connect(transport);

console.error("To-Do List MCP server running on stdio");