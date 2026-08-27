# Final Reflection — aya hamayel

# Reflection — Todo List MCP Server (6-Week Cohort)


## Wins

During this cohort, I learned how an MCP server connects an AI client to external tools and data. My main technical focus was understanding and working with the `list_tasks` flow, including input validation (like optional filtering), retrieving tasks from storage, formatting the returned list, and sending the result back to the client.

I also worked on testing and documentation. I ran the project in MCP Inspector, reviewed validation and error cases, helped prepare the README and example conversations, and connected the local MCP server to Claude Desktop. One of the most useful outcomes for me was seeing the full flow work from a natural-language request in Claude to an actual MCP tool call and a real read of the task data.

## Blockers

One of the hardest parts for me was understanding how all the project layers were connected. At first, I understood the individual files, but it took time to clearly understand how the schema, MCP tool, shared task logic, and `todos.json` storage worked together in one request flow.

Another challenge was connecting the project to Claude Desktop. The server initially disconnected because Claude tried to resolve `src/index.ts` from `C:\Windows\System32`. I checked the MCP logs, identified the path issue, tested the server manually, and fixed the configuration by using the absolute path to the server entry file. This helped me understand how important debugging logs and execution paths are when integrating local MCP servers.

## Resume Blurb

Built and tested a local To-Do List MCP Server using TypeScript, Model Context Protocol (MCP), and Zod validation. Worked on the `list_tasks` workflow, validation, local JSON persistence, and MCP Inspector testing across three working tools. Connected the server to Claude Desktop and verified end-to-end tool calls using natural-language prompts. Contributed to a public GitHub release and live Demo Day presentation.

## LinkedIn Draft

Over the past six weeks, I worked on a To-Do List MCP Server using TypeScript, MCP, and Zod. I learned how an AI client such as Claude Desktop can discover and call custom tools, and I worked especially on understanding the `list_tasks` flow, validation, local storage, testing, and debugging. One of the most valuable parts of the experience was connecting our local server to Claude Desktop and seeing a natural-language request trigger a real MCP tool call. The project helped me better understand how AI systems can interact with external tools in a structured and controlled way.

## Next Improvement

If I continued working on the project, I would replace the local JSON storage with a small database such as SQLite. This would make task persistence more reliable and would be a better foundation for supporting more users, richer task metadata, and future features.