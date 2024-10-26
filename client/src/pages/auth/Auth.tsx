/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  AlertTitle,
  Stack,
  LinearProgress,
} from '@mui/material';
import { useMutation } from 'react-query';
import { sendApiRequest } from '../../api/apiRequest';
import { AUTH_BASEURL } from '../../constants/constants';
import {
  UserRegister as UserRegisterProps,
  UserLogin as UserLoginProps,
  UserAuth as UserAuthProps,
} from '../../interfaces/UserInfo';

export function Auth({ onLogin }: UserAuthProps) {
  const [isRegistering, setIsRegistering] =
    useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<
    string | null
  >(null);

  const navigate = useNavigate();

  const registerMutation = useMutation(
    (data: UserRegisterProps) =>
      sendApiRequest(
        `${AUTH_BASEURL}/register`,
        'POST',
        data,
      ),
  );

  const loginMutation = useMutation(
    (data: UserLoginProps) =>
      sendApiRequest(`${AUTH_BASEURL}/login`, 'POST', data),
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(null);

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    navigate('/dashboard');
    registerMutation.mutate(data, {
      onSuccess: () => {
        setShowSuccess('User Registration successful!');
        setIsRegistering(false);
      },
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(null);

    const data = {
      email,
      password,
    };

    loginMutation.mutate(data, {
      onSuccess: () => {
        setShowSuccess('User Login successful');
        onLogin();
        navigate('/dashboard');
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
        px: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>

      {/* Success Message */}
      {showSuccess && (
        <Alert
          severity="success"
          sx={{ width: '100%', mb: 2 }}
        >
          <AlertTitle>Success</AlertTitle>
          {showSuccess}
        </Alert>
      )}

      {/* Error Messages for Register/Login */}
      {(registerMutation.isError ||
        loginMutation.isError) && (
        <Alert
          severity="error"
          sx={{ width: '100%', mb: 2 }}
        >
          <AlertTitle>Error</AlertTitle>
          {(registerMutation.error as any)?.message ||
            (loginMutation.error as any)?.message}
        </Alert>
      )}

      <form
        style={{ width: '100%' }}
        onSubmit={
          isRegistering ? handleRegister : handleLogin
        }
      >
        <Stack spacing={2}>
          {isRegistering && (
            <>
              <TextField
                label="First name"
                placeholder="First name"
                variant="outlined"
                fullWidth
                size="small"
                value={firstName}
                required
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                disabled={registerMutation.isLoading}
              />

              <TextField
                label="Last name"
                placeholder="Last name"
                variant="outlined"
                fullWidth
                size="small"
                value={lastName}
                required
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                disabled={registerMutation.isLoading}
              />
            </>
          )}
          <TextField
            label="Email"
            placeholder="Email address"
            type="email"
            variant="outlined"
            fullWidth
            size="small"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            disabled={
              registerMutation.isLoading ||
              loginMutation.isLoading
            }
          />
          <TextField
            label="Password"
            placeholder="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            disabled={
              registerMutation.isLoading ||
              loginMutation.isLoading
            }
          />

          {/* Loading Indicator */}
          {(registerMutation.isLoading ||
            loginMutation.isLoading) && <LinearProgress />}

          <Button
            type="submit"
            variant="outlined"
            fullWidth
            disabled={
              registerMutation.isLoading ||
              loginMutation.isLoading
            }
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </Stack>
      </form>

      <Typography sx={{ mt: 2 }} variant="body2">
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <Link
              to="/login"
              onClick={() => setIsRegistering(false)}
            >
              Login here
            </Link>
          </>
        ) : (
          <>
            Need new account?{' '}
            <Link
              to="/register"
              onClick={() => setIsRegistering(true)}
            >
              Register here
            </Link>
          </>
        )}
      </Typography>
    </Box>
  );
}

// useEffect(() => {
//   if (registerMutation.isSuccess) {
//     setShowSuccess('User Registration successful!');
//     setIsRegistering(false);
//   }
// }, [registerMutation.isSuccess]);

// useEffect(() => {
//   if (loginMutation.isSuccess) {
//     setShowSuccess('User Login successful');
//     navigate('/dashboard');
//   }
// }, [loginMutation.isSuccess, navigate, onLogin]);
