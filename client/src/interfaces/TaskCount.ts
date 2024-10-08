import { Status } from '../enums/Status';

export type TaskCountStatusType =
  | Status.todo
  | Status.inprogress
  | Status.completed;

export interface TaskCount {
  status?: TaskCountStatusType;
  count?: number;
}
