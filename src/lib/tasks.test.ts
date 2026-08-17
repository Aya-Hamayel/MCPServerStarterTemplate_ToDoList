import { test } from "node:test";
import assert from "node:assert/strict";
import { listTasksFromStore, addTaskToStore } from "./tasks.js";

test("listTasksFromStore returns an array of tasks", async () => {
  const result = await listTasksFromStore();
  assert.ok(Array.isArray(result.tasks));
});

test("listTasksFromStore filters by search text (case-insensitive)", async () => {
  const result = await listTasksFromStore("GROCER");
  for (const task of result.tasks) {
    assert.ok(task.text.toLowerCase().includes("grocer"));
  }
});

test("listTasksFromStore respects the limit parameter", async () => {
  const result = await listTasksFromStore(undefined, 1);
  assert.ok(result.tasks.length <= 1);
});

test("listTasksFromStore caps results at the hard maximum even with a huge limit", async () => {
  const result = await listTasksFromStore(undefined, 9999);
  assert.ok(result.tasks.length <= 50);
});

test("addTaskToStore creates a task with the given text and done=false", async () => {
  const task = await addTaskToStore("Test task from unit test");
  assert.equal(task.text, "Test task from unit test");
  assert.equal(task.done, false);
  assert.ok(typeof task.id === "number");
});

test("addTaskToStore trims whitespace from task text", async () => {
  const task = await addTaskToStore("  padded text  ");
  assert.equal(task.text, "padded text");
});