import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { TaskContentHeader as TaskHeaderProps } from '../../interfaces/TaskContentHeader';
import { format } from 'date-fns';

export function TaskHeader({
  title = 'Task Header title',
  date = new Date(),
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
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip
          variant="outlined"
          label={format(date, 'PPP')}
        />
      </Box>
    </Box>
  );
}
