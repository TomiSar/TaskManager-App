import { Disabled } from './Disabled';

export interface DateField extends Disabled {
  date?: Date | null;
  onChange?: (date: Date | null) => void;
}
