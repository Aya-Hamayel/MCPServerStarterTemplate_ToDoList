# Threat Model

## Assets

- `./data/todos.json` containing the application's task data.
- Task data returned by MCP tools.
- The server's local filesystem and application files.
- The integrity and availability of the MCP server.
- Any future API credentials or secrets used by the server.

## Trust Boundaries

- **Model → MCP tools:** Tool arguments such as task text and task IDs are treated as untrusted input.
- **MCP tools → filesystem:** `add_task`, `complete_task`, and `list_tasks` access the local task data through the task store.
- **MCP server → external services:** Current P0 tools do not accept arbitrary URLs or make user-controlled network requests.

## Top 5 Risks

1. **Oversized task text in `add_task`**
   - The current schema prevents empty text but does not set a maximum length.
   - Extremely large input could increase storage usage and response size.

2. **Invalid task IDs in `complete_task`**
   - The current schema already requires a positive integer.
   - Additional handling is needed for IDs that are syntactically valid but do not exist.

3. **Malformed or corrupted task data**
   - Unexpected data written to `todos.json` could make the task store unreadable or inconsistent.

4. **Runaway responses from `list_tasks`**
   - Returning every task could produce a very large response if the data file grows significantly.

5. **Unsafe filesystem access**
   - File operations must not allow user-controlled paths to access arbitrary files.
   - Currently the data path is constructed internally and is not supplied through tool arguments, which limits this risk.

## Mitigations This Week

- Add a maximum length to the `add_task` text schema.
- Keep `complete_task` restricted to positive integer task IDs and return controlled errors for missing IDs.
- Validate task data loaded from `todos.json` before using it.
- Add a reasonable response/task limit for `list_tasks`.
- Keep the data file path internal and prevent future user-controlled filesystem paths.
- Return safe, clear error messages without exposing stack traces or internal filesystem details.
- Avoid logging secrets or sensitive data.
- Add timeouts if external network operations are introduced in the future.

## Out of Scope

- Authentication and authorization for a multi-user production deployment.
- Protection against a fully compromised host machine.
- Distributed concurrency and multi-process database locking.
- Arbitrary external URL fetching, because current P0 tools do not accept user-controlled URLs or perform network requests.