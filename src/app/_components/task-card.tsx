"use client";

import { useRouter } from "next/navigation";

type Task = {
  id: number;
  message: string;
  completed: boolean;
};

export function TaskCard({ taskData }: { taskData: Task }) {
  const router = useRouter();

  const taskMutation = async (data: string | boolean) => {
    const newData = {
      ...taskData,
    };

    if (typeof data === "string") {
      newData.message = data;
    }

    if (typeof data === "boolean") {
      newData.completed = data;
    }

    const res = await fetch(`http://localhost:8080/tasks/${taskData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: newData.message,
        completed: newData.completed,
      }),
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const deleteTask = async () => {
    const res = await fetch(`http://localhost:8080/tasks/${taskData.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <form data-cy={`task-${taskData.id}`}>
      <input
        data-cy="task-card-message"
        type="text"
        name="message"
        defaultValue={taskData.message}
        onBlur={async (e) => {
          await taskMutation(e.target.value);
        }}
      />
      <input
        data-cy="task-card-completed"
        type="checkbox"
        defaultChecked={taskData.completed}
        onChange={async (e) => {
          await taskMutation(e.target.checked);
        }}
      />

      <button type="button" onClick={deleteTask}>
        Delete
      </button>
    </form>
  );
}
