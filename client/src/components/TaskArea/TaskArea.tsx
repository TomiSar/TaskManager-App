import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
} from '@mui/material';
import { format } from 'date-fns';
import { Status } from '../../enums/Status';
import { TaskCounter } from '../TaskCounter/TaskCounter';
import { Task } from '../Task/Task';
import { useMutation, useQuery } from 'react-query';
import { sendApiRequest } from '../../api/apiRequest';
import { TASK_BASEURL } from '../../constants/constants';
import { TaskGetRequest as AllTasks } from '../../interfaces/TaskGetRequest';
import { TaskPutRequest as UpdatedTask } from '../../interfaces/TaskPutRequest';
import { TaskStatusChangedContext } from '../../context';
import { countTotalTasks } from '../../helpers/helpers';

export function TaskArea() {
  const tasksUpdatedContext = useContext(
    TaskStatusChangedContext,
  );

  const { error, isLoading, data, refetch } = useQuery(
    'tasks',
    async () => {
      return await sendApiRequest<AllTasks[]>(
        TASK_BASEURL,
        'GET',
      );
    },
  );

  const updateTaskMutation = useMutation(
    (data: UpdatedTask) =>
      sendApiRequest(TASK_BASEURL, 'PUT', data),
  );

  const deleteTaskMutation = useMutation((id: string) =>
    sendApiRequest<void>(`${TASK_BASEURL}/${id}`, 'DELETE'),
  );

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: e.target.checked
        ? Status.inprogress
        : Status.todo,
    });
  }

  function markStatusCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    updateTaskMutation.mutate({
      id,
      status: Status.completed,
    });
  }

  function handleDeleteTask(id: string) {
    if (
      window.confirm(
        `Are you sure you want to delete Task: ${id} (This can't be undone)?`,
      )
    ) {
      deleteTaskMutation.mutate(id);
    }
  }

  useEffect(() => {
    refetch();
  }, [tasksUpdatedContext.updated]);

  useEffect(() => {
    if (
      updateTaskMutation.isSuccess ||
      deleteTaskMutation.isSuccess
    ) {
      tasksUpdatedContext.toggle();
    }
  }, [
    updateTaskMutation.isSuccess,
    deleteTaskMutation.isSuccess,
  ]);

  return (
    <Grid
      sx={{
        display: 'flex',
        backgroundColor: 'background.default',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      item
      md={8}
      px={4}
    >
      <Box mb={8} px={4}>
        <h2 data-testid="task-area-header-text">
          Status Of Your Tasks As On{' '}
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center' }}
        container
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          item
          md={10}
          xs={12}
          mb={8}
        >
          {!error &&
            Array.isArray(data) &&
            data.length !== 0 && (
              <>
                <TaskCounter
                  status={Status.todo}
                  count={
                    data
                      ? countTotalTasks(data, Status.todo)
                      : undefined
                  }
                />
                <TaskCounter
                  status={Status.inprogress}
                  count={
                    data
                      ? countTotalTasks(
                          data,
                          Status.inprogress,
                        )
                      : undefined
                  }
                />
                <TaskCounter
                  status={Status.completed}
                  count={
                    data
                      ? countTotalTasks(
                          data,
                          Status.completed,
                        )
                      : undefined
                  }
                />
              </>
            )}
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
          item
          xs={10}
          md={8}
        >
          <>
            {error && (
              <Alert severity="error">
                Error fetching tasks data from API
              </Alert>
            )}
            {!error &&
              Array.isArray(data) &&
              data.length === 0 && (
                <Alert
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'warning.dark',
                    boxShadow: 14,
                    fontSize: '20px',
                    borderRadius: '24px',
                  }}
                  severity="warning"
                >
                  TaskManager board is empty. Start using
                  board by creating new Task(s) from Sidebar
                  using Create new Task Form.
                </Alert>
              )}
            {isLoading ? (
              <LinearProgress />
            ) : (
              Array.isArray(data) &&
              data.length > 0 &&
              data.map((task) => {
                return task.status === Status.todo ||
                  task.status === Status.inprogress ? (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    creationDate={
                      new Date(task.creationDate)
                    }
                    dueDate={new Date(task.dueDate)}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markStatusCompleteHandler}
                    onDelete={handleDeleteTask}
                  />
                ) : (
                  false
                );
              })
            )}
          </>
        </Grid>
      </Grid>
    </Grid>
  );
}
