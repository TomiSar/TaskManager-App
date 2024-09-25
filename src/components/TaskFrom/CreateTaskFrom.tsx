import React from 'react';
import { Box, Typography } from '@mui/material';

// Task contains: Title, Description, DueDate, Status: [ToDo, InProgress, Done], Priority: [Low, Medium, High]
export function CreateTaskFrom() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
      }}
      px={4}
      my={6}
    >
      <Typography component="h2" variant="h6" mb={2}>
        Create new task
      </Typography>
    </Box>
  );
}
