import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// data/todos.json lives at the repo root, two levels up from src/tools/
const DATA_DIR = join(__dirname, "..", "..", "data");
const DATA_FILE = join(DATA_DIR, "todos.json");

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

function loadTasks(): Task[] {
  if (!existsSync(DATA_FILE)) {
    return [];
  }
  const raw = readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Task[];
}

function saveTasks(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
  writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

export const tasks: Task[] = loadTasks();

let currentId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

export function incrementNextId(): number {
  const id = currentId++;
  return id;
}

// Call this after every change to tasks (add, complete, delete, edit)
export function persistTasks(): void {
  saveTasks();
}