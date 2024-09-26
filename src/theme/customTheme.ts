import { createTheme, Theme } from '@mui/material';

export function customTheme(): Theme {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#a855f7cc',
        light: '#a855f7cc',
        dark: '#a855f747',
      },
      background: {
        paper: '#151515',
        default: '#000000f5',
      },
      success: {
        main: '#66bb6a',
        light: '#81c784',
        dark: '#388e3c',
      },
      info: {
        main: '#29b6f6',
        light: '#4fc3f7',
        dark: '#0288d1',
      },
      warning: {
        main: '#ffa726',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
      },
    },
  });
}
