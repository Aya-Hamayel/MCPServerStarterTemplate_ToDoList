# Example Conversations

These examples show how a user can interact with the To-Do List MCP Server through an MCP client such as Claude Desktop.

---

## Conversation A ΓÇö View All Tasks

### User Prompt

> Show me all my tasks.

### Expected Tool Call

1. `list_tasks`

```json
{}
```

### Good Final Answer

The assistant should display the user's tasks clearly and separate incomplete and completed tasks when possible.

Example:

```text
Open:
- #2 Finish MCP project
- #4 Finish week3 task

Completed:
- #5 aya
- #6 finish p0
```

---

## Conversation B ΓÇö Add a New Task

### User Prompt

> Add a task called "Prepare Demo Day".

### Expected Tool Call

1. `add_task`

```json
{
  "text": "Prepare Demo Day"
}
```

### Good Final Answer

```text
"Prepare Demo Day" was added successfully.
```

The response should confirm that the task was created without exposing raw tool JSON to the user.

---

## Conversation C ΓÇö Complete a Task

### User Prompt

> Mark "Prepare Demo Day" as completed.

### Expected Tool Calls

1. `list_tasks` ΓÇö if the assistant needs to find the task ID.

```json
{}
```

2. `complete_task`

```json
{
  "taskId": 15
}
```

### Good Final Answer

```text
Done ΓÇö "Prepare Demo Day" is marked as complete.
```

The assistant should first identify the correct task and then mark it as completed.

---

## Tools Covered

These conversations demonstrate the following MCP tools:

* `list_tasks`
* `add_task`
* `complete_task`
