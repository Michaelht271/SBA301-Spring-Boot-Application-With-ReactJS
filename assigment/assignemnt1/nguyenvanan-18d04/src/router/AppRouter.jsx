

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage.jsx';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import NewsManagementPage from '../pages/news/NewsManagementPage.jsx';
import CategoryManagementPage from '../pages/category/CategoryManagementPage.jsx';
import UserManagementPage from '../pages/users/UserManagementPage.jsx';
import SettingsPage from '../pages/setting/SettingsPage.jsx';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/news" element={<NewsManagementPage />} />
          <Route path="/categories" element={<CategoryManagementPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Redirect root path to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;