import { Navbar, Nav, Container } from 'react-bootstrap'

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#">MichaelDev</Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />

                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">About</Nav.Link>
                        <Nav.Link href="#">Projects</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
