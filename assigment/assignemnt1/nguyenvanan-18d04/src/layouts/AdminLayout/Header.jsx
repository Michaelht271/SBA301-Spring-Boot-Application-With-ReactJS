import React from 'react';
import { Navbar, Container, Button, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = ({ handleToggle }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      // In a real application, you would clear auth tokens/session here
      navigate('/'); // Redirect to login page
    }
  };

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
            <NavDropdown title="Welcome, Admin!" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> {/* Updated logout */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;