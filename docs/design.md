# To-Do List MCP Design

## Project Pitch

The To-Do List MCP Server helps users organize and manage their daily tasks through an AI assistant. It is designed for students, software developers, and office workers who need a simple way to track their work. The MCP server exposes clear tools that allow the AI to add tasks, list tasks, complete tasks, delete tasks, and search tasks. The project works locally and does not require paid APIs or external online services.

## Target User

The target users are people who need a simple and organized way to manage personal or work-related tasks.

Examples include:

- Students
- Software developers
- Office workers

## User and Demo Story

During Demo Day, the user asks the AI assistant to add a task called "Finish the Linux assignment." The model calls the `add_task` tool and returns a confirmation with the created task ID. The user then asks to see all current tasks, so the model calls the `list_tasks` tool and displays the available tasks. Finally, the user says that the Linux assignment is finished, so the model calls the `complete_task` tool using the task ID and returns a response confirming that the task was marked as completed.

## Tool Inventory

| tool_name | description | inputs | output | priority |
|---|---|---|---|---|
| `add_task` | Create a new task in the to-do list. | `text`: string | Confirmation containing the generated task ID and task text | P0 |
| `list_tasks` | Return tasks currently stored in the to-do list. | Optional `text`: string, optional `limit`: number | Text list or array of matching task objects | P0 |
| `complete_task` | Mark an existing task as completed using its task ID. | `taskId`: string | Updated task status or completion confirmation | P0 |
| `delete_task` | Remove an existing task using its task ID. | `taskId`: number | Deletion confirmation | P1 |
| `search_tasks` | Search stored tasks using a keyword. | `query`: string | List of matching task objects | P1 |

## Out of Scope

The following features will not be included in this version:

- User authentication and multiple user accounts.
- Mobile or graphical user interface.
- Notifications, reminders, or calendar integration.
- Cloud database synchronization.
- Paid APIs or external online services.

## Demo Day Success Criteria

- [ ] The `add_task` tool accepts valid input and returns a clear confirmation with a task ID.
- [ ] The `list_tasks` tool returns the available tasks through MCP Inspector.
- [ ] The `complete_task` tool accepts a task ID and returns a successful completed status response.

## Risks and Mitigation

### Risk 1: Invalid tool inputs

The model may send an empty task description, an invalid task ID, or a value outside the expected format.

**Mitigation:** Use Zod schemas with required fields, minimum and maximum limits, enums when needed, and clear `.describe()` values for every field.

### Risk 2: Inconsistent tool schemas

Different team members may use different field names or types, such as using a string task ID in one tool and a numeric task ID in another.

**Mitigation:** Agree on shared field names and data types before implementation, review all P0 schemas together, and test every tool in MCP Inspector.