import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { TaskCount as TaskCounterProps } from '../../interfaces/TaskCount';
import {
  setTaskCounterStatusBorderColor,
  setTaskCounterLabel,
} from '../../helpers/helpers';
import { Status } from '../../enums/Status';

export function TaskCounter({
  status = Status.todo,
  count = 0,
}: TaskCounterProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'transparent',
            border: '5px solid',
            width: '96px',
            height: '96px',
            marginBottom: '16px',
            borderColor: `${setTaskCounterStatusBorderColor(status)}`,
          }}
          data-testid="task-counter-border"
        >
          <Typography color="#ffffff" variant="h4">
            {count}
          </Typography>
        </Avatar>
        <Typography
          sx={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '20px',
          }}
          variant="h5"
        >
          {setTaskCounterLabel(status)}
        </Typography>
      </Box>
    </>
  );
}
