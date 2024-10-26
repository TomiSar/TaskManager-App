import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ComposeContext } from './context/ComposeContext';
import { rootContext } from './context/rootContext';
import { ProtectedRoute } from './route/ProtectedRoute';
import { Auth } from './pages/auth/Auth';

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ComposeContext components={rootContext}>
        <ThemeProvider theme={customTheme()}>
          <CssBaseline />
          <Router>
            <Routes>
              {/* Auth */}
              <Route
                path="/auth"
                element={<Auth onLogin={handleLogin} />}
              />
              {/* Protected To DashBoard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    component={Dashboard}
                  />
                }
              />
              <Route
                path="*"
                element={<Auth onLogin={handleLogin} />}
              />
            </Routes>
          </Router>

          {/* <Dashboard /> */}
        </ThemeProvider>
      </ComposeContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
