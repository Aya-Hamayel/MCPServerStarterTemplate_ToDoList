export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export const tasks: Task[] = [];

let currentId = 1;
export function incrementNextId(): number {
  return currentId++;
}