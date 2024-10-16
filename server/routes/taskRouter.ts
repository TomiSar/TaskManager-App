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
} from '../middleware/taskValidator';
import { handleValidationErrors } from '../utils/validationHandler';
import { protect } from '../middleware/authMiddleware';

export const taskRouter: Router = Router();

taskRouter.route('/').get(protect, getAllTasks);
taskRouter
  .route('/')
  .post(
    protect,
    createTaskValidator,
    handleValidationErrors,
    createTask,
  );
taskRouter
  .route('/')
  .put(
    protect,
    updateTaskValidator,
    handleValidationErrors,
    updateTask,
  );

taskRouter
  .route('/:id')
  .delete(
    protect,
    deleteTaskValidator,
    handleValidationErrors,
    deleteTask,
  );
