import express from "express";

import {
  getTasksController,
  getTaskByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/tasks.controller.js";

import { validate } from "../middleware/validation.middleware.js";

import {
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema,
} from "../schemas/tasks.schema.js";

const router = express.Router();

router.get(
  "",
  getTasksController
);

router.get(
  "/:id",
  validate(taskIdSchema, "params"),
  getTaskByIdController
);

router.post(
  "",
  validate(createTaskSchema, "body"),
  createTaskController
);

router.patch(
  "/:id",
  validate(taskIdSchema, "params"),
  validate(updateTaskSchema, "body"),
  updateTaskController
);

router.delete(
  "/:id",
  validate(taskIdSchema, "params"),
  deleteTaskController
);

export default router;