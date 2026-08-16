# Week 5 — Test Plan

| id    | tool          | setup                                            | input                                                 | expected                                                           | result | evidence |
| ----- | ------------- | ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------ | ------ | -------- |
| TC-01 | add_task      | Reset `data/todos.json` to the test fixture      | `examples/add_task.json`                              | A new task is added successfully                                   |        |          |
| TC-02 | add_task      | Reset `data/todos.json` to the test fixture      | Empty task text                                       | The request is rejected with a short validation error              |        |          |
| TC-03 | list_tasks    | Reset `data/todos.json` with test tasks          | `examples/list_tasks.json`                            | The task list is returned successfully                             |        |          |
| TC-04 | list_tasks    | Reset `data/todos.json` with test tasks          | Invalid input                                         | The request is rejected with a short validation error              |        |          |
| TC-05 | complete_task | Reset `data/todos.json` with an incomplete task  | `examples/complete_task.json`                         | The selected task is marked as completed                           |        |          |
| TC-06 | complete_task | Reset `data/todos.json` with test tasks          | Invalid task ID                                       | The request is rejected with a short validation error              |        |          |
| TC-07 | list_tasks    | Set `data/todos.json` to an empty task list      | `list_tasks` with empty data                          | An empty list is returned without crashing                         |        |          |
| TC-08 | add_task      | Reset `data/todos.json` to the test fixture      | Task text longer than the allowed limit               | The request is rejected with a validation error                    |        |          |
| TC-09 | complete_task | Reset `data/todos.json` to the test fixture      | Task ID that does not exist                           | A controlled error is returned                                     |        |          |
| TC-10 | list_tasks    | Simulate an unavailable or timed-out data source | Run `list_tasks` while the data source is unavailable | A short controlled error is returned and the server does not crash |        |          |

## Fixture Reset

Before tests that change the data, reset `data/todos.json` to the original test fixture.

The `result` and `evidence` columns will be filled after running the tests.
