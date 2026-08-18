# Security Policy

## Supported Versions

This repository supports the current version of the project.

## Reporting a Vulnerability

If you discover a security issue, please report it privately to the project mentor at:

mohammad.jaragdat@gmail.com

Please do not publicly disclose the issue before it has been reviewed.

## Security Hardening

This project has been hardened with the following security measures:

- Validating MCP tool arguments using Zod schemas (e.g. `taskId` must be a positive integer, rejected per-call for direct tool inputs).
- Applying maximum length limits to task text.
- Validating each stored task in `data/todos.json` individually on load — a malformed entry (e.g. a negative `id` from a manual file edit) is skipped and logged, instead of discarding the entire task list.
- Returning short and controlled error messages instead of raw stack traces.
- Limiting excessive responses from `list_tasks`.
- Keeping filesystem paths internal and preventing user-controlled file paths.
- Avoiding secrets and sensitive data in logs.
- Excluding `.env` and `.env.local` from Git.
- Providing a `.env.example` file containing placeholders only.
- Checking the repository for accidentally committed secrets.