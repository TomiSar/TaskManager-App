import {
  body,
  param,
  ValidationChain,
} from 'express-validator';

export const registerUserValidator: ValidationChain[] = [
  body('firstName')
    .notEmpty()
    .withMessage('User firstName is required'),
  body('lastName')
    .notEmpty()
    .withMessage('User lastName is required'),
  body('email')
    .notEmpty()
    .withMessage('User email is required')
    .isEmail()
    .withMessage(
      'User email needs to be valid email format',
    ),
  body('password')
    .notEmpty()
    .withMessage('User password is required')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be at least 6 characters long',
    ),
];

export const loginUserValidator: ValidationChain[] = [
  body('email')
    .notEmpty()
    .withMessage('User email is required')
    .isEmail()
    .withMessage(
      'User email needs to be valid email format',
    ),
  body('password')
    .notEmpty()
    .withMessage('User password is required'),
];

export const getUserByIdValidator = [
  param('id')
    .isUUID()
    .withMessage('Valid user ID (uuid format) is required'),
];
