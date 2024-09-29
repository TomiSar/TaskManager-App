import { SelectChangeEvent } from '@mui/material';
import { TaskDisabled } from './TaskDisabled';

export interface TaskSelectItems {
  value: string;
  label: string;
}

export interface TaskSelect extends TaskDisabled {
  name?: string;
  label?: string;
  value?: string;
  items?: TaskSelectItems[];
  onChange?: (e: SelectChangeEvent) => void;
}
