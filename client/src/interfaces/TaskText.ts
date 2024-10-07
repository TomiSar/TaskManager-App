import { TaskDisabled } from './TaskDisabled';

export interface TaskText extends TaskDisabled {
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
}
