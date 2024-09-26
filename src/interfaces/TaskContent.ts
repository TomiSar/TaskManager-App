import { TaskContentDescription } from './TaskContentDescription';
import { TaskContentFooter } from './TaskContentFooter';
import { TaskContentHeader } from './TaskContentHeader';

export interface TaskContent
  extends TaskContentHeader,
    TaskContentDescription,
    TaskContentFooter {
  priority?: string;
}
