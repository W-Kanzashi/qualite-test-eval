import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { z } from "zod";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import path from "path";

import {
  getTasks,
  updateTask,
  deleteTask,
  taskSchema,
  createTask,
} from "./_db";

const app = express();

app.use(cors());
const port = 8080;

app.use(bodyParser.json());

app.use("styles", express.static(path.join(__dirname, "../../out/styles/")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../out/global.html"));
});

app.get("/docs", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../out/index.html"));
});

app.get("/docs/db", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../out/index.ts.html"));
});

app.get("/tasks", (_req, res) => {
  const tasks = getTasks();

  res.status(200).json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body as unknown;

  const validatedTask = taskSchema.omit({ id: true }).safeParse(task);

  if (!validatedTask.success) {
    res.status(400).json({ error: "Task is invalid" });

    return;
  }

  const tasks = getTasks();

  if (tasks.length === 0) {
    createTask({
      id: 1,
      message: validatedTask.data.message,
      completed: validatedTask.data.completed,
    });

    const tasks = getTasks();

    res.status(201).json(tasks.slice(-1)[0]);

    return;
  }

  const newTask = {
    id: tasks.length + 1,
    message: validatedTask.data.message,
    completed: validatedTask.data.completed,
  };

  createTask(newTask);

  res.status(201).json({ message: "Task created successfully" });
});

app.put("/tasks/:id", (req, res) => {
  const validatedId = z.coerce.number().safeParse(req.params.id);

  if (!validatedId.success) {
    res.status(400).json({ error: "Invalid task id" });

    return;
  }

  const task = req.body as unknown;

  const validatedTask = taskSchema.omit({ id: true }).safeParse(task);

  if (!validatedTask.success) {
    res.status(400).json({ error: "Task is invalid" });

    return;
  }

  updateTask({
    id: validatedId.data,
    message: validatedTask.data.message,
    completed: validatedTask.data.completed,
  });

  const tasks = getTasks();

  res.status(200).json(tasks.slice(-1)[0]);
});

app.delete("/tasks/:id", (req, res) => {
  const validatedId = z.coerce.number().safeParse(req.params.id);

  if (!validatedId.success) {
    res.status(400).json({
      error: "Invalid task id",
    });

    return;
  }

  deleteTask(validatedId.data);

  res.status(200).json({ message: "Task deleted successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
