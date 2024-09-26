import React, { useState } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { TaskTitle } from './TaskTitle';
import { TaskDescription } from './TaskDescription';
import { TaskDueDate } from './TaskDueDate';
import { TaskSelect } from './TaskSelect';
import {
  taskPriority,
  taskStatus,
} from '../../constants/constants';

export function CreateTaskForm() {
  const [title, setTitle] = useState<string | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<
    string | undefined
  >(undefined);
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(
    taskStatus[0].value,
  );
  const [priority, setPriority] = useState<string>(
    taskPriority[1].value,
  );

  function createTaskHandler() {
    if (!title || !description || !date) {
      return;
    }
    console.log(title);
    console.log(description);
    console.log(date);
    console.log(status);
    console.log(priority);
  }

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
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitle
          onChange={(e) => setTitle(e.target.value)}
        />
        <TaskDescription
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDueDate
          date={date}
          onChange={(date) => setDate(date)}
        />

        <Stack
          sx={{ width: '100%' }}
          spacing={2}
          direction="row"
        >
          <TaskSelect
            name="status"
            label="Status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as string)
            }
            items={taskStatus}
          />
          <TaskSelect
            name="priority"
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as string)
            }
            items={taskPriority}
          />
        </Stack>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={createTaskHandler}
        >
          Create new task
        </Button>
      </Stack>
    </Box>
  );
}
