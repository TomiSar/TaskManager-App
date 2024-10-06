import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { TaskContentHeader as TaskHeaderProps } from '../../interfaces/TaskContentHeader';
import { Priority } from '../../enums/Priority';
import { setHeaderPriorityFontColor } from '../../helpers/helpers';
import { format } from 'date-fns';

export function TaskHeader({
  title = 'Task Header Title',
  date = new Date(),
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
      <Box>
        <Chip
          variant="outlined"
          label={format(date, 'PPP')}
        />
      </Box>
    </Box>
  );
}
