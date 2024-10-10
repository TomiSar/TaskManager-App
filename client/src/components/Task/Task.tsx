import React from 'react';
import { Box } from '@mui/material';
import { TaskContent as TaskProps } from '../../interfaces/TaskContent';
import { Status } from '../../enums/Status';
import { Priority } from '../../enums/Priority';
import { setTaskPriorityBorderColor } from '../../helpers/helpers';
import { TaskHeader } from './TaskHeader';
import { TaskDescription } from './TaskDescription';
import { TaskFooter } from './TaskFooter';

export function Task({
  title,
  creationDate = new Date(),
  dueDate = new Date(),
  description = 'Task Description',
  priority = Priority.medium,
  id,
  status = Status.completed,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
  onDelete = (e) => console.log(e),
}: TaskProps) {
  return (
    <Box
      data-testid="task-box"
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
      <TaskHeader
        title={title}
        creationDate={creationDate}
        dueDate={dueDate}
        priority={priority}
      />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onStatusChange={onStatusChange}
        onClick={onClick}
        onDelete={onDelete}
      />
    </Box>
  );
}
