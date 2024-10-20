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
import { TaskDate } from './TaskDate';
import { TaskSelect } from './TaskSelect';
import {
  TASK_BASEURL,
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
  const [creationDate] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [status, setStatus] = useState<string>(
    taskStatus[0].value,
  );
  const [priority, setPriority] = useState<string>(
    taskPriority[1].value,
  );
  const [showSuccess, setShowSuccess] =
    useState<boolean>(false);
  const [showDateError, setShowDateError] =
    useState<boolean>(false);

  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const createTaskMutation = useMutation(
    (data: CreateNewTask) =>
      sendApiRequest(TASK_BASEURL, 'POST', data),
  );

  function createTaskHandler() {
    if (!title || !description || !dueDate) {
      return;
    }

    const newTask = {
      title,
      description,
      creationDate: creationDate.toString(),
      dueDate: dueDate.toString(),
      status,
      priority,
    };

    const createdDate = new Date(newTask.creationDate);
    const taskDueDate = new Date(newTask.dueDate);

    if (taskDueDate <= createdDate) {
      setShowDateError(true);
      return;
    }

    createTaskMutation.mutate(newTask);

    setTitle('');
    setDescription('');
    setDueDate(new Date());
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

  useEffect(() => {
    if (showDateError) {
      const errorTimeout = setTimeout(() => {
        setShowDateError(false);
      }, 3000);
      return () => clearTimeout(errorTimeout);
    }
  }, [showDateError]);

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

      {showDateError && (
        <Alert
          sx={{
            width: '100%',
            marginBottom: '16px',
          }}
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          Task Due date has to be today or in the future
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
        <TaskDate
          date={dueDate ?? new Date()}
          onChange={(date) => setDueDate(date)}
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
            !dueDate ||
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
