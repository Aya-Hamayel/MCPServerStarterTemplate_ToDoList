# Demo Script — To-Do List MCP Server

**Total time: 5:00**

## 0:00–0:40 — The Problem
The To-Do List MCP Server lets an AI client (Claude Desktop, MCP Inspector) manage
a real to-do list through natural language — add tasks, list them, mark them done —
without a custom UI. Tool inputs are validated with Zod, and tasks are persisted
locally in `data/todos.json`.

## 0:40–1:10 — Architecture (one slide)
- Client (Claude Desktop / MCP Inspector) → MCP Server (stdio) → Zod-validated tool
  handlers → local JSON storage (`data/todos.json`)
- Five tools exposed: `greet`, `add_task`, `list_tasks`, `complete_task`, `delete_task`

## 1:10–3:30 — Live Tool Calls
**Prompt 1 (add_task):**
> "Add a task: finish the VLSI lab report."
Expected: `add_task` returns the new task with a generated id.

**Prompt 2 (list_tasks):**
> "Show me my current to-do list."
Expected: `list_tasks` returns the task list including the one just added.

**Backup prompt (complete_task) — use only if time allows or Prompt 1/2 has an issue:**
> "Mark task #8 as complete."
Expected: `complete_task` returns confirmation the task is marked done.

## 3:30–4:30 — What's Next
- Finish `delete_task` (currently a stub — confirms but doesn't remove from storage)
- Add due dates / priority levels to tasks
- Swap local JSON storage for a lightweight database for multi-user support

## 4:30–5:00 — Questions
Open floor for questions. Server stays running in case a live follow-up query is asked.

---

## Backup Plan — Wi-Fi/Network Failure
This demo requires no internet access — everything runs locally over stdio
(`npm start` + `npm run inspect`), so a Wi-Fi outage does not affect it.
As an extra safety net, a fixtures-only fallback is prepared:
- `data/todos.fixtures.json` — a pre-populated snapshot of tasks
- If live `add_task`/`list_tasks` calls fail for any reason, copy the fixture over
  `data/todos.json`, restart the server, and run `list_tasks` to show the same
  results without needing a fresh write.