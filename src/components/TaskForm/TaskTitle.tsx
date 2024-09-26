import React from 'react';
import { TextField } from '@mui/material';
import { TextFieldProps as TaskTitleProps } from '../../interfaces/TextField';

export function TaskTitle({
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
      onChange={onChange}
      disabled={disabled}
    />
  );
}
