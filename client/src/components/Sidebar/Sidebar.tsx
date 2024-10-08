import React from 'react';
import { Grid } from '@mui/material';
import { CreateTaskForm } from '../TaskForm/CreateTaskForm';
import { Profile } from '../Profile/Profile';

export function Sidebar() {
  return (
    <Grid
      item
      md={4}
      sx={{
        height: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        width: '100%',
        display: 'flex',
        backgroundColor: 'background.paper',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Profile firstName="Chuck" lastName="Norris" />
      <CreateTaskForm />
    </Grid>
  );
}
