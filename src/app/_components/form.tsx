"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function TaskForm() {
  const router = useRouter();

  const [tasks, setTasks] = useState<{
    message: string;
    completed: boolean;
  }>({
    message: "",
    completed: false,
  });

  const createNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: tasks.message,
        completed: tasks.completed,
      }),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <form data-cy="task-form" method="post" onSubmit={createNewTask}>
      <input
        data-cy="task-form-message"
        type="text"
        name="message"
        value={tasks.message}
        onChange={(e) => {
          setTasks({ ...tasks, message: e.target.value });
        }}
      />
      <input
        data-cy="task-form-completed"
        type="checkbox"
        onChange={(e) => {
          setTasks({ ...tasks, completed: e.target.checked });
        }}
      />

      <button data-cy="task-form-submit" type="submit">
        Add Task
      </button>
    </form>
  );
}
