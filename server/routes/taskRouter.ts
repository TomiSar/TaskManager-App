import { Router } from 'express';
import {
  createTask,
  getAllTasks,
} from '../controllers/taskController';
import { createTaskValidator } from '../middleware/validationMiddleware';

export const taskRouter: Router = Router();

// Define the route for fetching all tasks
taskRouter.route('/').get(getAllTasks);
taskRouter.route('/').post(createTaskValidator, createTask);

// taskRouter.get('/tasks', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
