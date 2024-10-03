import React from 'react';
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
import { useQuery } from 'react-query';
import { sendApiRequest } from '../../api/apiRequest';
import { API_URL } from '../../constants/constants';
import { TaskGetRequest as AllTasks } from '../../interfaces/TaskGetRequest';

export function TaskArea() {
  const { error, isLoading, data, refetch } = useQuery(
    'tasks',
    async () => {
      return await sendApiRequest<AllTasks[]>(
        API_URL,
        'GET',
      );
    },
  );

  console.log(data);

  return (
    <Grid item md={8} sx={{ px: 4 }}>
      <Box mb={8} px={4}>
        <h2>
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
          <TaskCounter count={1} status={Status.todo} />
          <TaskCounter
            count={3}
            status={Status.inprogress}
          />
          <TaskCounter
            count={4}
            status={Status.completed}
          />
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
                Error fetching tasks data
              </Alert>
            )}

            {!error &&
              Array.isArray(data) &&
              data.length === 0 && (
                <Alert severity="warning">
                  You do not have created any tasks. Start
                  by creating a new Tasks.
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
                    id={task.id}
                    title={task.title}
                    date={new Date(task.date)}
                    description={task.description}
                    status={task.status}
                    priority={task.priority}
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
