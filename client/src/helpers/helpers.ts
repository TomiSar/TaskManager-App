import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
import { TaskCountStatusType } from '../interfaces/TaskCount';

export const setTaskCounterStatusBorderColor = (
  status: TaskCountStatusType,
): string => {
  switch (status) {
    case Status.todo:
      return 'error.main';
    case Status.inprogress:
      return 'warning.main';
    case Status.completed:
      return 'success.main';
  }
};

export const setTaskCounterLabel = (
  status: TaskCountStatusType,
): string => {
  switch (status) {
    case Status.todo:
      return 'ToDo tasks';
    case Status.inprogress:
      return 'In Progress tasks';
    case Status.completed:
      return 'Completed tasks';
  }
};

export const setTaskPriorityBorderColor = (
  priority: string,
): string => {
  switch (priority) {
    case Priority.low:
      return 'success.light';
    case Priority.medium:
      return 'warning.light';
    case Priority.high:
      return 'error.light';
    default:
      return 'success.light'; // 'grey.900';
  }
};

export const setHeaderPriorityFontColor = (
  priority: string,
): string => {
  switch (priority) {
    case Priority.low:
      return 'success.dark';
    case Priority.medium:
      return 'warning.main';
    case Priority.high:
      return 'error.main';
    default:
      return 'success.dark';
  }
};
