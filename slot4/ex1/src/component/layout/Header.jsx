import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

function Header({ onSearchChange }) {

    const [keyword, setKeyword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearchChange(keyword)
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container className="py-2 ">
                <Navbar.Brand as={NavLink} to="/">
                    MichaelDev
                </Navbar.Brand>



                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                {/* SEARCH BAR */}
                <Form className="d-flex  " onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Search orchids..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button variant="outline-light" type="submit" className="ms-2">
                        Search
                    </Button>
                </Form>
            </Container>
        </Navbar>
    )
}

export default Header
