import {
  ValidationChain,
  body,
  param,
} from 'express-validator';
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
      'Task title needs to be valid text format',
    ),
  body('date')
    .not()
    .isEmpty()
    .withMessage('The task date is required')
    .trim()
    .isString()
    .withMessage('Task date needs to be valid date format'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('Task description is required')
    .trim()
    .isString()
    .withMessage(
      'Task description needs to be valid text format',
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
      'Task status can only be ToDo, InProgress or Completed',
    ),
];

export const updateTaskValidator: ValidationChain[] = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required')
    .trim()
    .isUUID()
    .withMessage('Task id needs to be valid UUID format'),
  body('title')
    .optional()
    .isString()
    .withMessage('The task title is required')
    .trim()
    .isString()
    .withMessage(
      'Task title needs to be valid text format',
    ),
  body('description')
    .optional()
    .isString()
    .withMessage('Task description is required')
    .trim()
    .isString()
    .withMessage(
      'Task description needs to be valid text format',
    ),
  body('priority')
    .optional()
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
      'Task status can only be ToDo, InProgress or Completed',
    ),
];

export const deleteTaskValidator: ValidationChain[] = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('The task id is required')
    .trim()
    .isUUID()
    .withMessage('Task id needs to be valid UUID format'),
];
