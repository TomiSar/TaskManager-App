import React from 'react';
import Grid from '@mui/material/Grid';
import { TaskArea } from '../../components/TaskArea/TaskArea';
import { Sidebar } from '../../components/Sidebar/Sidebar';

export function Dashboard() {
  return (
    <Grid container sx={{ minHeight: '100vh', p: 0, m: 0 }}>
      <TaskArea />
      <Sidebar />
    </Grid>
  );
}
