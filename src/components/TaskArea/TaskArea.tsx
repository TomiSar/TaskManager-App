import React from 'react';
import { Box, Grid } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../TaskCounter/TaskCounter';
import { Status } from '../../enums/Status';

export function TaskArea() {
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
          <Box>Tasks Will come here</Box>
          <Box>Tasks Will come here</Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
