import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { z } from "zod";

const DATA_PATH = resolve(process.cwd(), "data/todos.json");

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

const taskSchema = z.object({
  id: z.number().int().positive(),
  text: z.string().min(1).max(200),
  done: z.boolean(),
});

const tasksSchema = z.array(taskSchema);

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");

    const parsed = JSON.parse(raw);
    const result = tasksSchema.safeParse(parsed);

if (!result.success) {
  console.error("[tasks.ts] Invalid task data.");
  return [];
}

return result.data;

    
  } catch (err) {
    console.error(`[tasks.ts] Failed to load ${DATA_PATH}:`, err);
    return [];
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

export async function addTaskToStore(text: string): Promise<Task> {
  const tasks = await loadTasks();
  const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask: Task = { id: nextId, text, done: false };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
}

export async function listTasksFromStore(
  filterText?: string,
  limit = 10,
): Promise<Task[]> {
  const tasks = await loadTasks();
  const filtered = filterText
    ? tasks.filter((t) => t.text.toLowerCase().includes(filterText.toLowerCase()))
    : tasks;
  return filtered.slice(0, limit);
}

export async function completeTaskById(id: number): Promise<Task | null> {
  const tasks = await loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.done = true;
  await saveTasks(tasks);
  return task;
}