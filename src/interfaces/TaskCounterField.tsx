import { Status } from '../enums/Status';

export type TaskCounterStatusType =
  | Status.todo
  | Status.inprogress
  | Status.completed;

export interface TaskCounterProps {
  count?: number;
  status?: TaskCounterStatusType;
}
