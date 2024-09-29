import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface ProfileProps {
  firstName: string;
  lastName: string;
}

export function Profile({
  firstName = 'John',
  lastName = 'Doe',
}: ProfileProps) {
  const setAvatarLetters = (): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{
          height: '85px',
          width: '85px',
          backgroundColor: 'primary.main',
          marginBottom: '16px',
        }}
      >
        <Typography variant="h4" color="text.primary">
          {setAvatarLetters()}
        </Typography>
      </Avatar>
      <Typography variant="h6" color="text.primary">
        {`Welcome ${firstName} ${lastName}!`}
      </Typography>
      <Typography variant="body1" color="text.primary">
        This is your personal tasks manager
      </Typography>
    </Box>
  );
}
