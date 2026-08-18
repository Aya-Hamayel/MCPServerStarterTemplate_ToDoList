import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_PATH = resolve(__dirname, "../../data/todos.json");

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

const taskSchema = z.object({
  id: z.number().int().positive(),

  text: z
    .string()
    .trim()
    .min(1)
    .max(200),

  done: z.boolean(),
});

export async function loadTasks(): Promise<Task[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      console.error("[tasks.ts] Invalid task data: expected an array.");
      return [];
    }

    // Validate each task individually so one malformed entry (e.g. a
    // negative id from a manual edit) doesn't discard the whole list.
    const validTasks: Task[] = [];

    for (const item of parsed) {
      const result = taskSchema.safeParse(item);

      if (result.success) {
        validTasks.push(result.data);
      } else {
        console.error(
          "[tasks.ts] Skipping invalid task entry:",
          result.error.issues,
        );
      }
    }

    return validTasks;
  } catch (err) {
    console.error(`[tasks.ts] Failed to load ${DATA_PATH}:`, err);
    return [];
  }
}

async function saveTasks(tasks: Task[]): Promise<void> {
  await mkdir(dirname(DATA_PATH), { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

export async function addTaskToStore(
  text: string,
): Promise<Task> {
  const tasks = await loadTasks();

  const nextId =
    tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1;

  const newTask: Task = {
    id: nextId,
    text: text.trim(),
    done: false,
  };

  tasks.push(newTask);

  await saveTasks(tasks);

  return newTask;
}

export async function listTasksFromStore(
  filterText?: string,
  limit = 10,
): Promise<{
  tasks: Task[];
  truncated: boolean;
}> {
  const tasks = await loadTasks();

  const filtered = filterText
    ? tasks.filter((task) =>
        task.text
          .toLowerCase()
          .includes(filterText.toLowerCase()),
      )
    : tasks;

  const safeLimit = Math.min(limit, 50);

  return {
    tasks: filtered.slice(0, safeLimit),
    truncated: filtered.length > safeLimit,
  };
}

export async function completeTaskById(
  id: number,
): Promise<Task | null> {
  const tasks = await loadTasks();

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return null;
  }

  task.done = true;

  await saveTasks(tasks);

  return task;
}