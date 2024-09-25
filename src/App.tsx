import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider theme={customTheme()}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
