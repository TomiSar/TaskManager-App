import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { setAvatarLetters } from '../../helpers/helpers';

interface ProfileProps {
  firstName?: string;
  lastName?: string;
}

export function Profile({
  firstName = 'John',
  lastName = 'Doe',
}: ProfileProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" color="text.primary">
        {`Welcome ${firstName} ${lastName}`}
      </Typography>
      <Typography
        mb={4}
        variant="body1"
        color="text.primary"
      >
        Personal Task Manager
      </Typography>
      <Avatar
        data-testid="profile-avatar"
        sx={{
          height: '85px',
          width: '85px',
          backgroundColor: 'primary.dark',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h4" color="text.primary">
          {setAvatarLetters(firstName, lastName)}
        </Typography>
      </Avatar>
      <Typography
        data-testid="profile-name"
        mt={1}
        variant="h5"
        color="info.light"
      >
        {firstName} {lastName}
      </Typography>
    </Box>
  );
}
