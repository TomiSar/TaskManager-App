import React from 'react';
import { Box } from '@mui/material';
import { TaskContent as TaskProps } from '../../interfaces/TaskContent';
import { Status } from '../../enums/Status';
import { Priority } from '../../enums/Priority';
import { setTaskPriorityBorderColor } from '../../helpers/helpers';

export function Task({
  title = 'Task Title',
  date = new Date(),
  description = 'Task Description',
  priority = Priority.medium,
  id,
  status = Status.completed,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
}: TaskProps) {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          border: '1px solid',
          borderColor: setTaskPriorityBorderColor(priority),
        }}
        mb={4}
        p={2}
      >
        Task
        {/* TODO */}
        {/* Task Header */}
        {/* Task Description */}
        {/* Task Footer */}
      </Box>
    </div>
  );
}
