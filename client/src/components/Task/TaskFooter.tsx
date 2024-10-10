import React from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { TaskContentFooter as TaskFooterProps } from '../../interfaces/TaskContentFooter';
import { Status } from '../../enums/Status';

export function TaskFooter({
  id,
  status,
  onStatusChange = (e) => console.log(e),
  onClick = (e) => console.log(e),
  onDelete = (e) => console.log(e),
}: TaskFooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            onChange={(e) => onStatusChange(e, id)}
            color="warning"
            checked={status === Status.inprogress}
          />
        }
      />
      <Button
        sx={{
          color: 'common.white',
          border: '1px solid',
          boxShadow: 19,
        }}
        color="success"
        size="small"
        variant="contained"
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
      <Button
        sx={{
          color: 'common.white',
          border: '1px solid',
          boxShadow: 19,
          width: '25%',
        }}
        variant="contained"
        color="error"
        size="small"
        onClick={() => onDelete(id)}
      >
        Delete Task
      </Button>
    </Box>
  );
}
