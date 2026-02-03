import React from 'react';
import { Navbar, Container, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const Header = ({ handleToggle, user }) => {

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      authService.logout();
      window.location.href = '/login'; // Redirect and reload to clear all state
    }
  };

  const userName = user ? user.accountName : 'Guest';

  return (
    <Navbar bg="light" expand="lg" className="border-bottom" fixed="top">
      <Container fluid>
        <Button variant="outline-secondary" onClick={handleToggle}>
          <span className="navbar-toggler-icon"></span>
        </Button>
        <Navbar.Brand as={Link} to="/dashboard" className="ms-2">News Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title={`Welcome, ${userName}!`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;