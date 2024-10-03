import { Router } from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
} from '../controllers/taskController';
import {
  createTaskValidator,
  updateTaskValidator,
} from '../middleware/validationMiddleware';
import { handleValidationErrors } from '../utils/validationHandler';

export const taskRouter: Router = Router();

taskRouter.route('/').get(getAllTasks);
taskRouter
  .route('/')
  .post(
    createTaskValidator,
    handleValidationErrors,
    createTask,
  );
taskRouter
  .route('/')
  .put(
    updateTaskValidator,
    handleValidationErrors,
    updateTask,
  );
