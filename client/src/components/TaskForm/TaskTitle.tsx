import React from 'react';
import { TextField } from '@mui/material';
import { TaskText as TaskTitleProps } from '../../interfaces/TaskText';

export function TaskTitle({
  value = '',
  onChange = (e) => console.log(e),
  disabled = false,
}: TaskTitleProps) {
  return (
    <TextField
      id="title"
      name="title"
      label="Task Title"
      placeholder="Task Title"
      variant="outlined"
      size="small"
      fullWidth
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}
