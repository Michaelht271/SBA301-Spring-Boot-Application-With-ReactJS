import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROLES } from '../core/constants';

// Layouts
import PublicLayout from '../shared/layouts/PublicLayout';
import CustomerLayout from '../shared/layouts/CustomerLayout';
import StaffLayout from '../shared/layouts/StaffLayout';

// Pages
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ProfilePage from '../pages/customer/ProfilePage';
import BookingPage from '../pages/customer/BookingPage';
import BookingHistoryPage from '../pages/customer/BookingHistoryPage';
import DashboardPage from '../pages/staff/DashboardPage';
import CustomersPage from '../pages/staff/CustomersPage';
import RoomsPage from '../pages/staff/RoomsPage';
import BookingsPage from '../pages/staff/BookingsPage';
import PrivateRoute from "../shared/components/common/PrivateRoute.jsx";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes with PublicLayout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Customer Routes with CustomerLayout */}
      <Route
        element={
          <PrivateRoute roles={[ROLES.CUSTOMER]}>
            <CustomerLayout />
          </PrivateRoute>
        }
      >
        <Route path="/customer/profile" element={<ProfilePage />} />
        <Route path="/customer/booking" element={<BookingPage />} />
        <Route path="/customer/booking-history" element={<BookingHistoryPage />} />
      </Route>

      {/* Staff Routes with StaffLayout */}
      <Route
        element={
          <PrivateRoute roles={[ROLES.STAFF]}>
            <StaffLayout />
          </PrivateRoute>
        }
      >
        <Route path="/staff/dashboard" element={<DashboardPage />} />
        <Route path="/staff/customers" element={<CustomersPage />} />
        <Route path="/staff/rooms" element={<RoomsPage />} />
        <Route path="/staff/bookings" element={<BookingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
