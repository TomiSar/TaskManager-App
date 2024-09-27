import React from 'react';
import { Box, Typography } from '@mui/material';
import { TaskContentDescription as TaskDescriptionProps } from '../../interfaces/TaskContentDescription';

export function TaskDescription({
  description = 'Task content description',
}: TaskDescriptionProps) {
  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
}
