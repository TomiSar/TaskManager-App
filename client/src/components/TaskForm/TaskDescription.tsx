import React from 'react';
import { TextField } from '@mui/material';
import { TaskText as TaskDescriptionProps } from '../../interfaces/TaskText';

export function TaskDescription({
  onChange = (e) => console.log(e),
  disabled = false,
}: TaskDescriptionProps) {
  return (
    <TextField
      id="description"
      name="description"
      label="Task Description"
      placeholder="Task Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      onChange={onChange}
      disabled={disabled}
    />
  );
}