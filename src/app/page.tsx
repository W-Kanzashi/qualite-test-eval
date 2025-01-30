import { TaskForm } from "./_components/form";
import { TaskCard } from "./_components/task-card";

export default async function HomePage() {
  const res = await fetch("http://localhost:8080/tasks", {
    method: "GET",
  });

  const tasks = (await res.json()) as {
    id: number;
    message: string;
    completed: boolean;
  }[];

  if (tasks.length === 0) {
    return (
      <div>
        <p data-cy="no-tasks-found">No tasks found</p> <TaskForm />
      </div>
    );
  }

  return (
    <main>
      <h1>Home</h1>

      <div data-cy="task-list">
        {tasks.map((task) => {
          return <TaskCard key={task.id} taskData={task} />;
        })}
      </div>

      <TaskForm />
    </main>
  );
}
