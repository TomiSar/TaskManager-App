import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export interface TaskGetRequest {
  id: string;
  title: string;
  creationDate: string;
  dueDate: string;
  description: string;
  priority: `${Priority}`;
  status: `${Status}`;
}
