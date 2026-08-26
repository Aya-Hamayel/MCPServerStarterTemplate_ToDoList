# Final Reflection

## Wins

During this cohort, we built and shipped a To-Do List MCP Server using TypeScript. The server allows an MCP-compatible AI client to add, list, and complete tasks using natural-language requests.

We added input validation using Zod, used local JSON storage for the task data, tested the tools with MCP Inspector, and added automated unit tests for helper functions. We also improved the README, documented the project, connected the local MCP server to Claude Desktop, and successfully demonstrated the tools during Demo Day.

## Blockers

One of the main challenges was understanding how the MCP client, server, tools, and local storage work together.

Another challenge was connecting the local MCP server to Claude Desktop. At first, Claude tried to resolve `src/index.ts` from `C:\Windows\System32`, which caused the server to disconnect. We checked the MCP logs, found the path problem, and fixed it by using the absolute path to the server entry file.

Testing different validation and error cases was also important because we needed the tools to handle invalid input safely instead of only working for the happy path.

## Resume Blurb

Built a To-Do List MCP Server using TypeScript, the Model Context Protocol (MCP), and Zod validation. Implemented and tested task-management tools for adding, listing, and completing tasks using shared local JSON storage. Added manual MCP Inspector testing, automated unit tests, security hardening, and project documentation. Connected the server to Claude Desktop and delivered a successful live Demo Day presentation.

## LinkedIn Draft

Over the past six weeks, I worked on building and shipping a To-Do List MCP Server using TypeScript, MCP, and Zod. The project included designing MCP tools, validating inputs, managing shared local task storage, testing with MCP Inspector, writing documentation, and connecting the server to Claude Desktop. One of the most useful parts of the experience was debugging the full flow from a natural-language prompt to an MCP tool call and seeing the server work in a live demo.

## Post-Cohort Improvement

If I continued working on the project for the next two weeks, I would complete the `delete_task` implementation so it actually removes tasks from storage instead of acting as a stub. I would also add more tests around deletion to make sure invalid and missing task IDs are handled safely.
