import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import authService from '../../services/authService';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from the auth service on component mount
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={`d-flex ${isToggled ? 'toggled' : ''}`} id="wrapper">
      <Sidebar user={user} />
      <div id="page-content-wrapper" className="flex-grow-1 d-flex flex-column page-content-bg">
        <Header handleToggle={handleToggle} user={user} />
        <div className="container-fluid flex-grow-1 py-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;