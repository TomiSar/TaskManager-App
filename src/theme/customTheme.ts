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
    },
  });
}
