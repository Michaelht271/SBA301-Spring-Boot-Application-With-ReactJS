import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

const Sidebar = () => {
  return (
    <div className="bg-dark border-right" id="sidebar-wrapper" data-bs-theme="dark">
      <div className="sidebar-heading border-bottom">Admin Panel</div>
      <Nav className="flex-column list-group list-group-flush">
        <Nav.Link as={NavLink} to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Nav.Link>
        <Nav.Link as={NavLink} to="/news" className="list-group-item list-group-item-action">News Management</Nav.Link>
        <Nav.Link as={NavLink} to="/categories" className="list-group-item list-group-item-action">Category Management</Nav.Link>
        <Nav.Link as={NavLink} to="/users" className="list-group-item list-group-item-action">User Management</Nav.Link>
        <Nav.Link as={NavLink} to="/settings" className="list-group-item list-group-item-action">Settings</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;