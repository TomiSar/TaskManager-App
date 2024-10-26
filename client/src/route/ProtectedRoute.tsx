import React from 'react';
import { ProtectedRouteProps } from '../interfaces/ProtectedRoute';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({
  isAuthenticated,
  component: Component,
}: ProtectedRouteProps) {
  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/auth" />
  );
}
