import { Router } from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController';
import {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
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

taskRouter
  .route('/:id')
  .delete(
    deleteTaskValidator,
    handleValidationErrors,
    deleteTask,
  );
