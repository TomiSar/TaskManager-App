import { TaskDisabled } from './TaskDisabled';

export interface TaskDate extends TaskDisabled {
  date?: Date | null;
  onChange?: (date: Date | null) => void;
}
