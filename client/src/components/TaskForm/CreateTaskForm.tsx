import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { TaskTitle } from './TaskTitle';
import { TaskDescription } from './TaskDescription';
import { TaskDueDate } from './TaskDueDate';
import { TaskSelect } from './TaskSelect';
import {
  API_URL,
  taskPriority,
  taskStatus,
} from '../../constants/constants';
import { useMutation } from 'react-query';
import { TaskStatusChangedContext } from '../../context';
import { sendApiRequest } from '../../api/apiRequest';
import { TaskPostRequest as CreateNewTask } from '../../interfaces/TaskPostRequest';

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
  const [showSuccess, setShowSuccess] =
    useState<boolean>(false);

  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  // Create task mutation
  const createTaskMutation = useMutation(
    (data: CreateNewTask) =>
      sendApiRequest(API_URL, 'POST', data),
  );

  function createTaskHandler() {
    if (!title || !description || !date) {
      return;
    }

    const newTask = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };
    createTaskMutation.mutate(newTask);

    // Clear Form values
    setTitle('');
    setDescription('');
    setDate(new Date());
    setStatus(taskStatus[0].value);
    setPriority(taskPriority[1].value);
  }

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      tasksUpdatedContext.toggle();
    }

    const successTimeout = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => {
      clearTimeout(successTimeout);
    };
  }, [createTaskMutation.isSuccess]);

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
      {showSuccess && (
        <Alert
          sx={{
            width: '100%',
            marginBottom: '16px',
          }}
          severity="success"
        >
          <AlertTitle>Success</AlertTitle>
          Task created successfully
        </Alert>
      )}
      <Typography component="h2" variant="h6" mb={2}>
        Create new task
      </Typography>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <TaskTitle
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDescription
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isLoading}
        />
        <TaskDueDate
          date={date}
          onChange={(date) => setDate(date)}
          disabled={createTaskMutation.isLoading}
        />

        <Stack
          sx={{ width: '100%' }}
          spacing={2}
          direction="row"
        >
          <TaskSelect
            label="Status"
            name="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as string)
            }
            items={taskStatus}
            disabled={createTaskMutation.isLoading}
          />
          <TaskSelect
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as string)
            }
            items={taskPriority}
            disabled={createTaskMutation.isLoading}
          />
        </Stack>
        {createTaskMutation.isLoading && <LinearProgress />}
        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={createTaskHandler}
          disabled={
            !title ||
            !description ||
            !date ||
            !status ||
            !priority
          }
        >
          Create new task
        </Button>
      </Stack>
    </Box>
  );
}
