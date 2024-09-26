import React from 'react';
import { TextField } from '@mui/material';
import { DateField as TaskDueDateProps } from '../../interfaces/DateField';
import {
  LocalizationProvider,
  DesktopDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export function TaskDueDate({
  date = new Date(),
  onChange = (date) => console.log(date),
  disabled = false,
}: TaskDueDateProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Task Due Date"
          inputFormat="dd/MM/yyyy"
          value={date}
          disabled={disabled}
          onChange={onChange}
          renderInput={(params) => (
            <TextField key={params.key} {...params} />
          )}
        />
      </LocalizationProvider>
    </>
  );
}
