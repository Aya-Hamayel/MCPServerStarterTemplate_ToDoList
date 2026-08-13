# Peer Review Checklist

## Peer Review Information

- *Review type:* On-site Peer Review
- *Project:* To-Do List MCP Server
- *Reviewers:*
  - Maysam Abu Eid — Tools & Validation
  - Julnar Assi — Security & Error Handling
  - Lana Al-Sayes — README & Demo Path
- *Review date:* 2026-08-11

---

## 1. Tools & Validation

*Reviewer:* Maysam Abu Eid

### What was reviewed

- add_task
- list_tasks
- complete_task
- Input schemas and type validation
- Boundary and malformed input handling
- Error behavior using MCP Inspector

### What worked

- add_task correctly validates task input.
- Empty or null task descriptions are rejected.
- Task text length limitations are enforced.
- list_tasks safely handles its input without unexpected state changes.
- complete_task correctly validates task IDs.
- Negative and unmatched task IDs are handled safely.

### Issues found

- None.

### Recommended fixes

- No corrective actions required for the Tools & Validation layer.

### Result

- *Passed*
- *P0 findings:* None

---

## 2. Security & Error Handling

*Reviewer:* Julnar Assi

### What was reviewed

- Task data validation
- Filesystem access
- Secret management
- Error handling
- Output limits
- Invalid and potentially unsafe inputs

### What worked

- The application uses a fixed path for data/todos.json.
- No user-controlled file paths were identified.
- No exposed API keys, passwords, tokens, or credentials were found.
- .env files are excluded through .gitignore.
- .env.example contains placeholder values only.
- Negative taskId values are correctly rejected by the Zod schema.
- No practical path traversal issue was identified.

### Issues found

- *P1:* Stored task objects from todos.json need runtime schema validation.
- *P1:* list_tasks does not enforce an effective maximum output limit.
- *P1:* Tool-level filesystem/runtime errors are not handled consistently.
- *P1:* Error responses could be made shorter and more actionable.

### Recommended fixes

- Validate parsed todos.json data using a runtime Zod schema.
- Apply a maximum result limit to list_tasks.
- Add consistent error handling around filesystem operations.
- Return short, actionable error messages while keeping technical details in server logs.

### Result

- *Passed with improvements recommended*
- *P0 findings:* None
- *P1 findings:* Four

---

## 3. README & Demo Path

*Reviewer:* Lana Al-Sayes

### What was reviewed

- Project setup and installation
- MCP Inspector setup
- P0 demo workflow
- README documentation
- Validation example

### What worked

- The repository was successfully cloned.
- Dependencies were successfully installed using npm install.
- MCP Inspector launched successfully using npm run inspect.
- The server connected correctly to MCP Inspector.
- The P0 workflow was successfully reproduced:
  add_task → list_tasks → complete_task
- Invalid empty input for add_task was correctly rejected.

### Issues found

- *P0:* README only contains the starter project title.
- *P0:* Installation and setup instructions are missing.
- *P0:* README does not explain how to launch the server or MCP Inspector.
- *P0:* The implemented MCP tools are not documented.
- *P0:* The working P0 demo path is not documented.
- *P1:* No invalid-input example is included for reviewers.

### Recommended fixes

- Replace the starter README content with an overview of the To-Do List MCP server.
- Add prerequisites and installation instructions, including npm install.
- Document how to launch MCP Inspector using npm run inspect.
- Add descriptions for the implemented MCP tools.
- Document the P0 demo sequence:
  add_task → list_tasks → complete_task
- Include the expected result of each demo step.
- Add an invalid-input example showing the validation behavior.

### Result

- *Functional demo with documentation improvements required*
- *P0 findings:* Five
- *P1 findings:* One

---

## 4. Action Items

| Action Item | Priority | Owner | Due Date | Status |
|---|---|---|---|---|
| Update README with project overview and setup instructions | P0 | Project Team | End of Week 4 | Open |
| Document npm run inspect and MCP Inspector usage | P0 | Project Team | End of Week 4 | Open |
| Document the three P0 tools and their usage | P0 | Project Team | End of Week 4 | Open |
| Document the add_task → list_tasks → complete_task demo path | P0 | Project Team | End of Week 4 | Open |
| Add an invalid-input example to README | P1 | Project Team | End of Week 4 | Open |
| Add runtime Zod validation for stored task data | P1 | Project Team | End of Week 4 | Open |
| Add a maximum response limit to list_tasks | P1 | Project Team | End of Week 4 | Open |
| Improve filesystem/runtime error handling | P1 | Project Team | End of Week 4 | Open |
| Make tool error messages short and actionable | P1 | Project Team | End of Week 4 | Open |

---

## 5. Overall Review Summary

### What worked

- All three P0 tools were successfully tested.
- The main P0 workflow works correctly through MCP Inspector.
- Input validation correctly rejects invalid task IDs and empty task descriptions.
- No exposed secrets or credentials were found.
- No practical path traversal issue was identified.
- The project can be installed and run successfully.

### Issues requiring follow-up

- README documentation needs significant improvement.
- Runtime validation should be added for stored task data.
- list_tasks should enforce an output limit.
- Filesystem/runtime errors should be handled consistently.
- Error messages should remain short and actionable.

### Final Review Status

- *Tools & Validation:* Passed
- *Security & Error Handling:* Passed with improvements recommended
- *README & Demo Path:* Functional demo with documentation improvements required
- *P0 findings:* 5
- *P1 findings:* 5
- *Overall:* Follow-up fixes required before final hardening review