import { TaskDisabled } from './TaskDisabled';

export interface TaskText extends TaskDisabled {
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
}
