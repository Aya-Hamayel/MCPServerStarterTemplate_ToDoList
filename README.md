# To-Do List MCP Server

A Model Context Protocol (MCP) server that provides task management tools — add, list, and complete to-do items — backed by local JSON storage.

## Overview

This project implements an MCP server exposing three tools for managing a simple to-do list:

- **`add_task`** — creates a new task with validated input
- **`list_tasks`** — retrieves the current list of tasks
- **`complete_task`** — marks an existing task as completed by ID

All inputs are validated using [Zod](https://zod.dev/) schemas, and task data is persisted to a local `data/todos.json` file.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes bundled with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Aya-Hamayel/MCPServerStarterTemplate_ToDoList.git
cd MCPServerStarterTemplate_ToDoList
npm install
```

## Running the Server with MCP Inspector

The easiest way to test and interact with the server is through the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), a web-based tool for calling MCP tools directly.

Start the server with:

```bash
npm run inspect
```

This will:
1. Launch the MCP Inspector.
2. Start the server via `tsx src/index.ts`.
3. Open a browser window with the Inspector UI, where you can call each tool and view its response.

If the browser does not open automatically, the terminal output will include a local URL (with an auth token) that you can open manually.

## Available Tools

### `add_task`

Adds a new task to the list.

**Input:**
| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | Cannot be empty or null. Subject to a maximum length limit. |

**Behavior:**
- Rejects empty or null task descriptions.
- Enforces a maximum length on task text.

### `list_tasks`

Returns the current list of tasks.

**Input:** None required.

**Behavior:**
- Reads and returns all stored tasks without modifying state.
- Results are capped at a maximum output limit to prevent excessively large responses.

### `complete_task`

Marks a task as completed.

**Input:**
| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | number | Yes | Must correspond to an existing task. Negative or unmatched IDs are rejected. |

**Behavior:**
- Validates that the task ID exists before marking it complete.
- Rejects negative or non-matching IDs with a clear error message.

## Demo Path (P0 Workflow)

The following sequence demonstrates the core functionality end-to-end:

1. **`add_task`** — Add a new task (e.g., `{ "title": "Buy groceries" }`).
   *Expected result:* Task is created and returned with a unique ID.

2. **`list_tasks`** — Retrieve the task list.
   *Expected result:* The newly added task appears in the returned list.

3. **`complete_task`** — Mark the task as complete using its ID.
   *Expected result:* The task's status is updated to completed, confirmed by calling `list_tasks` again.

### Invalid Input Example

Calling `add_task` with an empty title:

```json
{ "title": "" }
```

**Expected result:** The request is rejected with a validation error, and no task is added to `data/todos.json`.

## Project Structure

```
src/
  lib/         # Core task logic (read/write/validate)
  schemas/     # Zod input schemas for each tool
  tools/       # MCP tool implementations
data/
  todos.json   # Local task storage
SECURITY.md    # Security notes and practices
```

## Security Notes

- No user-controlled file paths are used; `data/todos.json` is a fixed path.
- No credentials or secrets are stored in the repository; `.env` files are excluded via `.gitignore`, and `.env.example` contains placeholder values only.
- See [SECURITY.md](./SECURITY.md) for further details.

#
## Testing

Run the unit tests for pure helper functions:
\`\`\`bash
npm test
\`\`\`