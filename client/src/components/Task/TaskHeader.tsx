import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { TaskContentHeader as TaskHeaderProps } from '../../interfaces/TaskContentHeader';
import { Priority } from '../../enums/Priority';
import { setHeaderPriorityFontColor } from '../../helpers/helpers';
import { format } from 'date-fns';

export function TaskHeader({
  title = 'Task Header Title',
  creationDate = new Date(),
  dueDate = new Date(),
  priority = Priority.low,
}: TaskHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
      mb={3}
    >
      <Box>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            alignItems: 'center',
            color: setHeaderPriorityFontColor(priority),
          }}
          variant="h6"
        >
          {priority} priority
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Chip
          sx={{
            marginBottom: '10px',
            fontSize: '12px',
            color: 'success.light',
          }}
          variant="outlined"
          color="success"
          label={`Created: ${format(creationDate, 'dd/MM/yyyy')}`}
        />
        <Chip
          sx={{
            fontSize: '12px',
          }}
          variant="outlined"
          color="info"
          label={`DueDate: ${format(dueDate, 'dd/MM/yyyy')}`}
        />
      </Box>
    </Box>
  );
}
