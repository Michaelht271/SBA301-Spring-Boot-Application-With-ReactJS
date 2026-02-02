import {Container, Nav, NavDropdown, Navbar as BootstrapNavbar} from "react-bootstrap";
import './navbar.css';

export default function Navbar() {
    return (
        <BootstrapNavbar expand="lg" className="bg-body-tertiary navbar-orchid">
                <Container>
                    <BootstrapNavbar.Brand href="#home">Orchid Shop</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav"/>
                    <BootstrapNavbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
        </BootstrapNavbar>
    )
}