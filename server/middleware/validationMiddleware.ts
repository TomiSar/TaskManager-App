import { ValidationChain, body } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createTaskValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('The task title is required')
    .trim()
    .isString()
    .withMessage(
      'Task title needs to be valid (text format)',
    ),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is required')
    .trim()
    .isString()
    .withMessage(
      'Task date needs to be valid (date format)',
    ),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Task description is required')
    .trim()
    .isString()
    .withMessage(
      'Task description needs to be valid (text format)',
    ),
  body('priority')
    .trim()
    .isIn([Priority.low, Priority.medium, Priority.high])
    .withMessage(
      'Task priority can only be Low, Medium or High',
    ),
  body('status')
    .trim()
    .isIn([
      Status.todo,
      Status.inprogress,
      Status.completed,
    ])
    .withMessage(
      'Task status can only be todo, inprogress or completed',
    ),
];
