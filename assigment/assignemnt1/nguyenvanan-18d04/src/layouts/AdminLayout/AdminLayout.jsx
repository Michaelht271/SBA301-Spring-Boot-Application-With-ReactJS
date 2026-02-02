import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={`d-flex ${isToggled ? 'toggled' : ''}`} id="wrapper">
      <Sidebar />
      <div id="page-content-wrapper" className="flex-grow-1 d-flex flex-column page-content-bg"> {/* Added class */}
        <Header handleToggle={handleToggle} />
        <div className="container-fluid flex-grow-1 py-4">
          <Outlet /> {/* Renders the nested route's component */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;