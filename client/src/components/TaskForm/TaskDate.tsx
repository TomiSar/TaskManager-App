import React from 'react';
import { TextField } from '@mui/material';
import { TaskDate as TaskDateProps } from '../../interfaces/TaskDate';
import {
  LocalizationProvider,
  DesktopDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export function TaskDate({
  date = new Date(),
  onChange = (date) => console.log(date),
  disabled = false,
}: TaskDateProps) {
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
