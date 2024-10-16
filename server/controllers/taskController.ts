import { Request, Response } from 'express';
import {
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { AppDataSource } from '../connection/db';
import { Task } from '../models/taskEntity';
import { User } from '../models/userEntity';

// GET ALL JOBS
// @desc   Fetch all tasks
// @route  GET  /api/tasks
// @access Private (protected)
const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const allTasks = await AppDataSource.getRepository(
      Task,
    ).find({
      order: {
        dueDate: 'ASC',
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
// @access Private (protected)
const createTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    title,
    creationDate,
    dueDate,
    description,
    priority,
    status,
  } = req.body;

  const user = req.user as User;

  if (!user) {
    res
      .status(401)
      .json({ message: 'User is not authorized' });
    return;
  }

  const newTask = new Task();
  newTask.title = title;
  newTask.creationDate = creationDate
    ? new Date(creationDate)
    : new Date();
  newTask.dueDate = dueDate
    ? new Date(dueDate)
    : new Date();
  newTask.description = description;
  newTask.priority = priority;
  newTask.status = status;
  newTask.user = user;

  try {
    const createdTask: Task =
      await AppDataSource.getRepository(Task).save(newTask);
    res.status(201).json({
      message: 'Task created successfully',
      createdTask: instanceToPlain(createdTask),
    });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

// UPDATE TASK
// @desc   Update existing Task
// @route  PUT  /api/tasks
// @access Private (protected)
const updateTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    id,
    title,
    dueDate,
    description,
    priority,
    status,
  } = req.body;

  let task: Task | null;

  try {
    task = await AppDataSource.getRepository(Task).findOne({
      where: { id },
    });

    if (!task) {
      res.status(404).json({
        error: 'The task with given ID does not exist',
      });
      return;
    }

    if (task.user.id !== req.user?.id) {
      res.status(403).json({
        message: 'User not authorized to update this task',
      });
      return;
    }
  } catch (errors) {
    res
      .status(500)
      .json({ error: 'Internal Server Error' });
    return;
  }

  const updatedTaskFields = plainToInstance(Task, {
    title: title || task.title,
    dueDate: dueDate || task.dueDate,
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

// DELETE TASK
// @desc   DELETE existing Task
// @route  DELETE /api/tasks/:id
// @access Private (protected)
const deleteTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  let task: Task | null;

  try {
    task = await AppDataSource.getRepository(Task).findOne({
      where: { id },
    });

    if (!task) {
      res.status(404).json({
        error: 'The task with given ID does not exist',
      });
      return;
    }

    if (task.user.id !== req.user?.id) {
      res.status(403).json({
        message: 'User not authorized to delete this task',
      });
      return;
    }
  } catch (errors) {
    res
      .status(500)
      .json({ error: 'Internal Server Error' });
    return;
  }

  try {
    await AppDataSource.getRepository(Task).delete({ id });
    res
      .status(200)
      .json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

export { getAllTasks, createTask, updateTask, deleteTask };
