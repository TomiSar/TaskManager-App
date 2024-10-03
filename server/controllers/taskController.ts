import { Request, Response } from 'express';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { AppDataSource } from '../connection/db';
import { Task } from '../models/taskEntity';

// GET ALL JOBS
// @desc   Fetch all tasks
// @route  GET  /api/tasks
// @access Public
const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const allTasks = await AppDataSource.getRepository(
      Task,
    ).find({
      order: {
        date: 'desc',
      },
    });

    res.status(200).json(instanceToPlain(allTasks));
  } catch (errors) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

// CREATE TASK
// @desc   Create new Task
// @route  POST  /api/tasks
// @access Public
const createTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newTask = new Task();
  const { title, description, priority, status } = req.body;

  newTask.title = title;
  newTask.date = new Date();
  newTask.description = description;
  newTask.priority = priority;
  newTask.status = status;

  try {
    const createdTask: Task =
      await AppDataSource.getRepository(Task).save(newTask);
    res.status(201).json({
      message: 'Task created successfully',
      createdTask: instanceToPlain(createdTask),
    });
  } catch (errors) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

// UPDATE TASK
// @desc   Update existing Task
// @route  POST  /api/tasks/:id
// @access Public
const updateTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id, title, description, priority, status } =
    req.body;

  let task: Task | null;

  try {
    task = await AppDataSource.getRepository(Task).findOne({
      where: { id },
    });
  } catch (errors) {
    res
      .status(500)
      .json({ error: 'Internal Server Error' });
    return;
  }

  if (!task) {
    res.status(404).json({
      error: 'The task with given ID does not exist',
    });
    return;
  }

  const updatedTaskFields = plainToInstance(Task, {
    title: title || task.title,
    date: new Date(),
    description: description || task.description,
    priority: priority || task.priority,
    status,
  });

  try {
    await AppDataSource.getRepository(Task).update(
      id,
      updatedTaskFields,
    );

    const updatedTask = await AppDataSource.getRepository(
      Task,
    ).findOne({
      where: { id },
    });

    res.status(200).json({
      message: 'Task updated successfully',
      updatedTask: instanceToPlain(updatedTask),
    });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

export { getAllTasks, createTask, updateTask };
