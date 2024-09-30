import { Request, Response } from 'express';
// import { UpdateResult } from 'typeorm';
import { validationResult } from 'express-validator';
import { instanceToPlain } from 'class-transformer';
import { AppDataSource } from '../connection/db';
import { Task } from '../models/taskEntity';

// @desc   Fetch all tasks
// @route  GET  /api/tasks
// @access Public
const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Fetch tasks ordered by date
    const allTasks = await AppDataSource.getRepository(
      Task,
    ).find({
      order: {
        date: 'ASC',
      },
    });
    // Convert tasks to plain objects and return in response
    res.status(200).json(instanceToPlain(allTasks));
  } catch (errors) {
    // Return error in case of failure
    res.status(500).json({ err: 'Internal server error' });
  }
};

const createTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  //Create a new instance of the Task
  const newTask = new Task();
  //     // Add the required properties to the Task object
  const { title, date, description, priority, status } =
    req.body;
  newTask.title = title;
  newTask.date = date;
  newTask.description = description;
  newTask.priority = priority;
  newTask.status = status;

  let createdTask: Task;
  try {
    createdTask =
      await AppDataSource.getRepository(Task).save(newTask);
    createdTask = instanceToPlain(createdTask) as Task;

    res.status(201).json(createdTask);
  } catch (errors) {
    res.status(500).json({ err: 'Internal server error' });
  }
};

export { getAllTasks, createTask };
