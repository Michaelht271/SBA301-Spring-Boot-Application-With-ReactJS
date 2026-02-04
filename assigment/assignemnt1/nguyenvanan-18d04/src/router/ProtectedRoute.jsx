import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    // If no user is found in localStorage, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If user is found, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
