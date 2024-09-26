import { Status } from '../enums/Status';
import { TaskCounterStatusType } from '../interfaces/TaskCounterField';

export const setTaskCounterBorderStatusColor = (
  status: TaskCounterStatusType,
): string => {
  switch (status) {
    case Status.todo:
      return 'error.light';
    case Status.inprogress:
      return 'warning.light';
    case Status.completed:
      return 'success.light';
  }
};

export const setTaskCounterLabel = (
  status: TaskCounterStatusType,
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
