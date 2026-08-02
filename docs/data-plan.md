# Week 3 — Data Plan

All three P0 tools read from and write to a single shared fixture file:
`./data/todos.json`

## Data Sources

| Tool | Source | Fixture Path | Auth | Rate Limits |
|---|---|---|---|---|
| add_task | local file | `./data/todos.json` | none | N/A (local file, no external calls) |
| list_tasks | local file | `./data/todos.json` | none | N/A (local file, no external calls) |
| complete_task | local file | `./data/todos.json` | none | N/A (local file, no external calls) |

## Failure Modes

| Tool | Failure Mode | Handling |
|---|---|---|
| add_task | empty/missing `text` | rejected by Zod schema before handler runs |
| add_task | `data/todos.json` file missing | create file with empty array on first write |
| list_tasks | `data/todos.json` is empty array | return "No tasks yet." |
| list_tasks | file contains malformed JSON | catch parse error, return a clear error message |
| complete_task | `taskId` not found in file | return a "Task not found" message instead of throwing |
| complete_task | `taskId` missing/invalid (negative, non-integer) | rejected by Zod schema before handler runs |

## Example Responses (happy path)

### add_task

Request:
```json
{ "text": "Finish Week 3 assignment" }
```

Response:
```json
{
  "id": 4,
  "text": "Finish Week 3 assignment",
  "done": false
}
```

### list_tasks

Request:
```json
{ "text": "Week", "limit": 10 }
```

Response:
```json
{
  "tasks": [
    { "id": 4, "text": "Finish Week 3 assignment", "done": false }
  ]
}
```

### complete_task

Request:
```json
{ "taskId": 4 }
```

Response:
```json
{
  "id": 4,
  "text": "Finish Week 3 assignment",
  "done": true
}
```