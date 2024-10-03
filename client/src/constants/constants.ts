import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

// ENDPOINTS
export const API_URL = 'http://localhost:5000/api/tasks';

export const taskStatus = [
  {
    value: Status.todo,
    label: Status.todo,
  },
  {
    value: Status.inprogress,
    label: Status.inprogress,
  },
  {
    value: Status.completed,
    label: Status.completed,
  },
];

export const taskPriority = [
  {
    value: Priority.low,
    label: Priority.low,
  },
  {
    value: Priority.medium,
    label: Priority.medium,
  },
  {
    value: Priority.high,
    label: Priority.high,
  },
];
