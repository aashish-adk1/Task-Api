import { Request, Response } from "express";

import {
  getAllTasksService,
  getTaskByIdService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "../services/tasks.service.js";

export const getTasksController = async (
  req: Request,
  res: Response
) => {
  try {
    const tasks = await getAllTasksService();

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const getTaskByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const task = await getTaskByIdService(
      Number(req.params.id)
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};

export const createTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description, completed } = req.body;

    const task = await createTaskService(
      title,
      description,
      completed
    );

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

export const updateTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { title, description, completed } = req.body;

    const task = await updateTaskService(
      id,
      title,
      description,
      completed
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

export const deleteTaskController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const task = await deleteTaskService(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};