# To-Do List MCP Server

A Model Context Protocol (MCP) server that manages a simple to-do list — add, list, complete, and delete tasks — backed by local JSON storage. All tool inputs are validated with [Zod](https://zod.dev/).

## What It Does

This server exposes a set of tools that let an MCP-compatible AI client (e.g. Claude Desktop, the MCP Inspector) read and modify a to-do list stored in `data/todos.json`. Every input is validated before it touches storage, so malformed requests are rejected with a clear error instead of corrupting the task file.

## Requirements

- [Node.js](https://nodejs.org/) LTS (v20 or newer)
- npm (bundled with Node.js)

## Installation

```bash
git clone https://github.com/Aya-Hamayel/MCPServerStarterTemplate_ToDoList.git
cd MCPServerStarterTemplate_ToDoList
npm install
```

## Running the Server

To start the server directly (for use with an MCP client such as Claude Desktop):

```bash
npm start
```

This runs `tsx src/index.ts` and starts the server on stdio. You should see:

```
To-Do List MCP server running on stdio
```

## Testing with MCP Inspector

The fastest way to try the tools without wiring up a full MCP client is the [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
npm run inspect
```

This launches the Inspector, starts the server in the background, and opens a browser UI where you can call each tool and see its raw response. If the browser doesn't open automatically, copy the local URL (with auth token) printed in the terminal.

## Available Tools

| Tool | Input | Required Fields | Description |
|---|---|---|---|
| `add_task` | `{ text: string }` | `text` (1–200 chars) | Adds a new task and returns it with a generated `id`. |
| `list_tasks` | `{ text?: string, limit?: number }` | none | Lists tasks, optionally filtered by text. `limit` caps results (max 50, default 10). |
| `complete_task` | `{ taskId: number }` | `taskId` (positive integer) | Marks the task with the given ID as completed. |
| `delete_task` | `{ taskId: number }` | `taskId` (positive integer) | **Stub only** — returns a confirmation message but does not currently remove the task from storage. |

## Example Prompts

Once connected to an MCP client, you can try prompts like:

- "Add a task: finish the VLSI lab report."
- "Show me my current to-do list."
- "List only tasks that mention 'lab'."
- "Mark task #2 as complete."

## Troubleshooting

**1. "Task text cannot be empty" / validation error on `add_task`**
The `text` field is required and must be 1–200 characters. Check you're sending `{ "text": "..." }` — not `{ "title": "..." }` (an older, incorrect field name from an earlier draft of this project).

**2. `complete_task` or `delete_task` returns "Task not found"**
The `taskId` must be a **positive integer** matching an existing task's `id`. IDs are assigned sequentially starting at 1 — check `list_tasks` first to confirm the correct ID. Note: if `data/todos.json` is edited manually and one entry is invalid (e.g. a negative `id`), only that entry is skipped on load — it will simply be missing from `list_tasks`, not the whole file. See the Security section below.

**3. Inspector won't open / "port already in use"**
Make sure no other process is running on the Inspector's default port, and that you ran `npm install` after cloning. If the browser doesn't open automatically, manually open the URL (including the auth token) printed in your terminal.

## Project Structure

```
src/
  index.ts     # Server entry point — registers all tools
  lib/         # Core task logic (read/write/validate against data/todos.json)
  schemas/     # Zod input schemas, one per tool
  tools/       # Tool registration — wires schemas to lib logic
data/
  todos.json   # Local task storage
SECURITY.md    # Security notes and practices
```

## Security Notes

- No user-controlled file paths are used; `data/todos.json` is a fixed path.
- No credentials or secrets are stored in the repository; `.env` files are excluded via `.gitignore`.
- Each stored task is validated individually on load. A malformed entry in `data/todos.json` (e.g. a negative `id` from a manual edit) is skipped and logged — it no longer discards the rest of the task list. See [SECURITY.md](./SECURITY.md) for details.

## Example Conversations

See [examples/conversations.md](./examples/conversations.md) for three example conversations showing how a model can use the MCP server tools and turn tool results into natural-language responses.


## License

MIT — see [LICENSE](./LICENSE).
