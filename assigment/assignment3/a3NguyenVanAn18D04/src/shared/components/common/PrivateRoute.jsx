import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuth} from "../../../core/auth/useAuth.js";


const PrivateRoute = ({ children, roles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // or a loading spinner

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // If user doesn't have required role, redirect to their default page
    const redirectPath = user.role === 'STAFF' ? '/staff/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
