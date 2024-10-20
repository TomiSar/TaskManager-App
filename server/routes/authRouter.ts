import { Router } from 'express';
import { handleValidationErrors } from '../utils/validationHandler';
import {
  registerUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
} from '../controllers/authController';
import {
  getUserByIdValidator,
  loginUserValidator,
  registerUserValidator,
} from '../middleware/authValidator';
import { protect } from '../middleware/authMiddleware';

export const authRouter: Router = Router();

authRouter.post(
  '/auth/register',
  registerUserValidator,
  handleValidationErrors,
  registerUser,
);
authRouter.post(
  '/auth/login',
  loginUserValidator,
  handleValidationErrors,
  loginUser,
);
authRouter.post('/auth/logout', logoutUser);
authRouter.get('/auth/all', protect, getAllUsers);
authRouter.get(
  '/auth/:id',
  protect,
  getUserByIdValidator,
  handleValidationErrors,
  getUserById,
);
