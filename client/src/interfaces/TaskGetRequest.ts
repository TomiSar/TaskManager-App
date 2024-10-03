import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export interface TaskGetRequest {
  id: string;
  title: string;
  date: string;
  description: string;
  priority: `${Priority}`;
  status: `${Status}`;
}
