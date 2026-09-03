# My Journey Building a To-Do List MCP Server

As part of the NextFlows Academy program, I worked on building a To-Do List MCP Server. This project gave me the chance to understand the Model Context Protocol (MCP) and see how an AI client can communicate with external tools to perform real actions.

## Starting with the Requirements

At the beginning of the project, I focused on understanding the requirements and defining what the server should do.

The main goal was to build a simple MCP server that could manage a to-do list. The core tools included adding tasks, listing tasks, and marking tasks as completed.

Before starting the implementation, I also worked on defining the expected behavior of each tool, the project scope, success criteria, and possible risks.

This step helped me understand the importance of having clear requirements before writing code.

## Designing the Project

After defining the requirements, I worked on organizing the project structure.

The server was built using TypeScript, and the tasks were stored locally in a JSON file. Each MCP tool had a specific responsibility, while the validation and task logic were separated into different parts of the project.

This structure made the project easier to understand, test, and maintain.

## Implementing the MCP Tools

The next step was implementing the tools that allow the AI client to interact with the to-do list.

I worked with tools such as:

- `add_task` to create a new task.
- `list_tasks` to display existing tasks.
- `complete_task` to mark a task as completed.

Working on these tools helped me understand how MCP tools receive input, execute logic, and return results that an AI client can use.

## Adding Validation and Security

One important part of the project was making sure that invalid input would not cause problems.

I used Zod schemas to validate the inputs before they reached the task storage. For example, task text had to follow specific rules, and task IDs had to be valid positive integers.

I also learned about basic security practices such as avoiding secrets in the repository, using a fixed storage path, and handling malformed data safely.

This part showed me that building a working feature is not enough; it is also important to think about validation, errors, and security.

## Testing the Server

During development, I used the MCP Inspector to test the server and call the tools directly.

I tested different scenarios, including normal tool calls and invalid inputs, to make sure the server returned clear results and error messages.

I also worked on test cases for some of the task functionality.

Testing helped me find issues earlier and gave me more confidence that the tools behaved as expected.

## Testing with an MCP Client

Another useful part of the project was connecting the MCP server to an MCP-compatible client.

Seeing the AI call the tools and interact with the to-do list made the MCP concept much clearer to me. Instead of only reading about MCP, I was able to see the complete flow from a user request to a tool call and then to the final response.

## Documentation and Finalization

In the final stages of the project, I worked on improving the documentation.

The README was updated with installation steps, instructions for running the server, available tools, example prompts, troubleshooting information, security notes, and example conversations.

I also reviewed the project and made sure that the main requirements were completed and documented clearly.

## What I Learned

This project helped me understand MCP in a practical way and taught me how to build tools that an AI system can use.

I also improved my skills in TypeScript, Git and GitHub, input validation, testing, debugging, documentation, and working with a structured development process.

One of the most valuable things I learned was that building a project is not only about implementing features. It also involves planning, testing, handling errors, thinking about security, reviewing the work, and documenting everything clearly.

Overall, the project was a useful learning experience and gave me a better understanding of how MCP servers can connect AI applications with external tools and data.
