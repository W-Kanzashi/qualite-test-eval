import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  message: z.string().min(1),
  completed: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;

// const tasks = [
//   { id: 1, message: "Task 1", completed: false },
//   { id: 2, message: "Task 2", completed: true },
//   { id: 3, message: "Task 3", completed: false },
//   { id: 4, message: "Task 4", completed: true },
//   { id: 5, message: "Task 5", completed: false },
// ];

const tasks = [] as Task[];

/**
 * Get all tasks
 * @param id - Optional task id to filter tasks by
 *
 * @returns An array of tasks
 * @returns An empty array if no tasks are found
 */
function getTasks(id?: number) {
  if (id) {
    return tasks.filter((t) => t.id === id);
  }

  return tasks;
}

function createTask(task: Task) {
  tasks.push(task);
}

function updateTask(task: Task) {
  const index = tasks.findIndex((t) => t.id === task.id);

  tasks[index] = task;
}

function deleteTask(id: number) {
  const index = tasks.findIndex((t) => t.id === id);
  tasks.splice(index, 1);
}

export { getTasks, createTask, updateTask, deleteTask };
