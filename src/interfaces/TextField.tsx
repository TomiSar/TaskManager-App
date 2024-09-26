import { Disabled } from './Disabled';

export interface TextFieldProps extends Disabled {
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => void;
}
