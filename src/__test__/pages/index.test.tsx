import { expect, test, vi } from "vitest";

import { getTasks, updateTask, createTask, deleteTask } from "~/server/_db";

test("Get all tasks", () => {
  const tasks = getTasks();

  expect(tasks).length(5);
});

test("Create a task", async () => {
  const tasks = getTasks();

  const id = tasks.length + 1;

  await vi.waitFor(() => {
    createTask({
      id: id,
      message: "This is a test task",
      completed: false,
    });
  });

  const task = getTasks(id);

  expect(task).toStrictEqual([
    {
      id: id,
      message: "This is a test task",
      completed: false,
    },
  ]);
});

test("Update a task", async () => {
  await vi.waitFor(() => {
    updateTask({
      id: 1,
      message: "This is an updated task",
      completed: true,
    });
  });

  const task = getTasks(1);

  expect(task).toStrictEqual([
    {
      id: 1,
      message: "This is an updated task",
      completed: true,
    },
  ]);
});

test("Delete a task", async () => {
  await vi.waitFor(() => {
    deleteTask(1);
  });

  const task = getTasks(1);

  expect(task).toEqual([]);
});
