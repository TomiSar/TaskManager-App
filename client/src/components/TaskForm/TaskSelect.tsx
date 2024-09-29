import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { TaskSelect as TaskSelectProps } from '../../interfaces/TaskSelect';

export function TaskSelect({
  name = '',
  label = '',
  value = '',
  items = [{ value: '', label: 'Add Items' }],
  onChange = (e: SelectChangeEvent) => console.log(e),
  disabled = false,
}: TaskSelectProps) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        value={value}
        label={label}
        name={name}
        onChange={onChange}
        disabled={disabled}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
