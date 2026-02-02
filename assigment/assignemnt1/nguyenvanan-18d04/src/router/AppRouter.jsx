import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import NewsManagementPage from '../features/news/pages/NewsManagementPage';
import CategoryManagementPage from '../features/categories/pages/CategoryManagementPage';
import UserManagementPage from '../features/users/pages/UserManagementPage';
import SettingsPage from '../features/settings/pages/SettingsPage'; // New import
import AdminLayout from '../layouts/AdminLayout/AdminLayout'; // Assuming AdminLayout will be created

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Routes that use the AdminLayout */}
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="news" element={<NewsManagementPage />} />
        <Route path="categories" element={<CategoryManagementPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="settings" element={<SettingsPage />} /> {/* New route */}
        {/* Add more admin routes here */}
      </Route>

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;