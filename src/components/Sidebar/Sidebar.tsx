import React from 'react';
import { Grid } from '@mui/material';
import { CreateTaskFrom } from '../TaskFrom/CreateTaskFrom';
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
        backgroundColor: 'background.paper',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Profile firstName="Chuck" lastName="Norris" />
      <CreateTaskFrom />
    </Grid>
  );
}
