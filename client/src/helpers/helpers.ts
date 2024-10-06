import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';
import { TaskCountStatusType } from '../interfaces/TaskCount';
import { TaskGetRequest as Tasks } from '../interfaces/TaskGetRequest';
import { customTheme } from '../theme/customTheme';

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
  const theme = customTheme();
  switch (priority) {
    case Priority.low:
      return theme.palette.success.light;
    case Priority.medium:
      return theme.palette.warning.light;
    case Priority.high:
      return theme.palette.error.light;
    default:
      return theme.palette.success.light;
  }
};

export const setHeaderPriorityFontColor = (
  priority: string,
): string => {
  const theme = customTheme();
  switch (priority) {
    case Priority.low:
      return theme.palette.success.main;
    case Priority.medium:
      return theme.palette.warning.main;
    case Priority.high:
      return theme.palette.error.main;
    default:
      return theme.palette.success.main;
  }
};

export const countTotalTasks = (
  tasks: Tasks[],
  status: TaskCountStatusType,
): number => {
  if (!Array.isArray(tasks)) return 0;

  const totalTasks = tasks.filter((task) => {
    return task.status === status;
  });

  return totalTasks.length;
};

export const setAvatarLetters = (
  firstName: string,
  lastName: string,
): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const convertHexToRgbColor = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : hex;
};
