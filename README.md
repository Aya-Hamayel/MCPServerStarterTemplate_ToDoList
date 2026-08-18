# To-Do List MCP Server

A Model Context Protocol (MCP) server that manages a simple to-do list — add, list, complete, and delete tasks — backed by local JSON storage. All tool inputs are validated with [Zod](https://zod.dev/).

## What It Does

This server exposes a set of tools that let an MCP-compatible AI client, such as Claude Desktop or the MCP Inspector, read and modify a to-do list stored in `data/todos.json`.

Every input is validated before it touches storage, so malformed requests are rejected with a clear error instead of corrupting the task file.

## Requirements

* Node.js v20 or newer
* npm, bundled with Node.js
* Claude Desktop if you want to connect the server to Claude

Check your versions with:

```bash
node -v
npx -v
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Aya-Hamayel/MCPServerStarterTemplate_ToDoList.git
```

Move into the project directory:

```bash
cd MCPServerStarterTemplate_ToDoList
```

Install the dependencies:

```bash
npm install
```

## Running the Server

To start the MCP server directly:

```bash
npm start
```

This runs:

```bash
tsx src/index.ts
```

The server uses the stdio transport.

You should see:

```text
To-Do List MCP server running on stdio
```

The terminal will remain open while the server waits for MCP client requests.

## Testing with MCP Inspector

The easiest way to test the MCP tools manually is with MCP Inspector.

Run:

```bash
npm run inspect
```

This starts the To-Do List MCP server and launches the MCP Inspector.

If the browser does not open automatically, copy the local Inspector URL printed in the terminal and open it in your browser.

From the Inspector, you can test tools such as:

* `add_task`
* `list_tasks`
* `complete_task`
* `delete_task`
* `greet`

## Automated Unit Tests

The project also includes automated tests for pure task helper functions.

Run:

```bash
npm test
```

The tests cover functionality such as:

* Listing tasks
* Filtering tasks by search text
* Applying result limits
* Enforcing the maximum result limit
* Adding a new task
* Trimming whitespace from task text

A successful test run should finish with no failed tests.

Example:

```text
tests 6
pass 6
fail 0
```

## Available Tools

| Tool            | Input                               | Required Fields             | Description                                                                                                              |
| --------------- | ----------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `greet`         | `{ name: string }`                  | `name` (min 2 chars)        | Returns a short greeting. Useful for confirming that the server is running and responding.                               |
| `add_task`      | `{ text: string }`                  | `text` (1–200 chars)        | Adds a new task and returns it with a generated `id`.                                                                    |
| `list_tasks`    | `{ text?: string, limit?: number }` | None                        | Lists tasks and can optionally filter them by text. `limit` controls the number of returned tasks, with a maximum of 50. |
| `complete_task` | `{ taskId: number }`                | `taskId` (positive integer) | Marks the task with the specified ID as completed.                                                                       |
| `delete_task`   | `{ taskId: number }`                | `taskId` (positive integer) | Stub only — returns a confirmation message but does not currently remove the task from storage.                          |

## Example Prompts

After connecting the server to an MCP client, try prompts such as:

* "Add a task called Prepare Demo Day."
* "Show me all my tasks."
* "List only tasks that mention lab."
* "Mark task #2 as complete."
* "Say hello to confirm the server is working."

For complete examples that include the user prompt, expected tool calls, and final answer, see:

[examples/conversations.md](examples/conversations.md)

## Connect to Claude Desktop

The To-Do List MCP Server can be connected to Claude Desktop so Claude can call the tools directly from a normal conversation.

### 1. Install Claude Desktop

Install and open the Claude Desktop application.

This setup is for the desktop application, not Claude in the browser.

### 2. Open the MCP Configuration

In Claude Desktop, go to:

```text
Settings → Developer → Edit Config
```

This opens the Claude Desktop configuration file.

On Windows, the file is named:

```text
claude_desktop_config.json
```

### 3. Add the To-Do List MCP Server

Add the following configuration under `mcpServers`:

```json
{
  "mcpServers": {
    "todo-list-mcp": {
      "command": "npx.cmd",
      "args": [
        "-y",
        "tsx",
        "C:\\Users\\YOUR_USERNAME\\path\\to\\MCPServerStarterTemplate_ToDoList\\src\\index.ts"
      ]
    }
  }
}
```

Replace:

```text
C:\\Users\\YOUR_USERNAME\\path\\to\\MCPServerStarterTemplate_ToDoList\\src\\index.ts
```

with the absolute path to `src/index.ts` on your computer.

For example, the real Windows path may look like:

```text
C:\Users\YOUR_USERNAME\Documents\MCPServerStarterTemplate_ToDoList\src\index.ts
```

Inside JSON, Windows backslashes must be written as double backslashes:

```text
\\
```

On Windows, use:

```text
npx.cmd
```

instead of:

```text
npx
```

### 4. Save and Restart Claude Desktop

Save the configuration file.

Then fully close Claude Desktop and open it again.

Claude reads the MCP configuration when the application starts.

### 5. Confirm the MCP Server Is Running

Go to:

```text
Settings → Developer
```

You should see:

```text
todo-list-mcp
```

with the status:

```text
running
```

### 6. Test the Connection

Start a new Claude conversation and try:

```text
Show me all my tasks.
```

Claude should call the `list_tasks` MCP tool and return the tasks stored in `data/todos.json`.

Then try:

```text
Add a task called "Prepare Demo Day".
```

Claude should call:

```text
add_task
```

Finally, try:

```text
Mark "Prepare Demo Day" as completed.
```

Claude can identify the task and call:

```text
complete_task
```

A successful flow looks like:

```text
User prompt
    ↓
Claude Desktop
    ↓
MCP tool call
    ↓
To-Do List MCP Server
    ↓
data/todos.json
    ↓
Tool result
    ↓
Claude final response
```

For more complete examples, see [examples/conversations.md](examples/conversations.md).

## Troubleshooting

### 1. `add_task` returns a validation error

The `text` field is required and must contain between 1 and 200 characters.

Correct:

```json
{
  "text": "Finish MCP project"
}
```

Incorrect:

```json
{
  "title": "Finish MCP project"
}
```

The tool expects `text`, not `title`.

### 2. `complete_task` or `delete_task` returns "Task not found"

The `taskId` must be a positive integer matching an existing task ID.

Use `list_tasks` first to check the available IDs.

Example:

```json
{
  "taskId": 2
}
```

If `data/todos.json` contains an invalid entry, such as a task with a negative ID, that invalid entry is skipped instead of causing the whole task list to fail.

### 3. MCP Inspector does not open

Make sure you installed the dependencies:

```bash
npm install
```

Then run:

```bash
npm run inspect
```

If the browser does not open automatically, use the Inspector URL printed in the terminal.

Also make sure another Inspector process is not already using the same port.

### 4. Claude Desktop shows "Server disconnected"

Go to:

```text
Settings → Developer → View Logs
```

Check the MCP server logs for the exact error.

If the logs show something similar to:

```text
Cannot find module 'C:\Windows\System32\src\index.ts'
```

Claude is trying to resolve the relative `src/index.ts` path from the wrong working directory.

Use the full absolute path to `src/index.ts` in the Claude configuration:

```json
{
  "mcpServers": {
    "todo-list-mcp": {
      "command": "npx.cmd",
      "args": [
        "-y",
        "tsx",
        "C:\\Users\\YOUR_USERNAME\\path\\to\\MCPServerStarterTemplate_ToDoList\\src\\index.ts"
      ]
    }
  }
}
```

Then fully restart Claude Desktop.

## Project Structure

```text
src/
  index.ts
  lib/
    tasks.ts
    tasks.test.ts
  schemas/
  tools/

data/
  todos.json

docs/
  test-plan.md
  evidence/
  threat-model.md
  review-checklist.md

examples/
  add_task.json
  complete_task.json
  delete_task.json
  greet.json
  list_task.json
  conversations.md

README.md
SECURITY.md
LICENSE
package.json
```

### Main Files

* `src/index.ts` — MCP server entry point.
* `src/lib/tasks.ts` — core task storage and helper logic.
* `src/lib/tasks.test.ts` — automated unit tests.
* `src/schemas/` — Zod validation schemas.
* `src/tools/` — MCP tool registration.
* `data/todos.json` — local task storage.
* `docs/test-plan.md` — Week 5 manual test plan and results.
* `docs/evidence/` — screenshots from MCP Inspector testing.
* `examples/conversations.md` — three example end-to-end MCP conversations.

## Security Notes

* No user-controlled file paths are used for task storage.
* `data/todos.json` uses a fixed application path.
* No credentials or secrets are stored in the repository.
* `.env` files are excluded through `.gitignore`.
* Tool inputs are validated before being processed.
* Stored tasks are validated individually when loaded.
* Invalid stored task entries are skipped instead of causing the complete task list to fail.

For more information, see [SECURITY.md](SECURITY.md).

## License

MIT — see [LICENSE](LICENSE).
