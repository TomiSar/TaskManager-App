import { SelectChangeEvent } from '@mui/material';
import { Disabled } from './Disabled';

export interface SelectItems {
  value: string;
  label: string;
}

export interface SelectFieldProps extends Disabled {
  name?: string;
  label?: string;
  value?: string;
  items?: SelectItems[];
  onChange?: (e: SelectChangeEvent) => void;
}
