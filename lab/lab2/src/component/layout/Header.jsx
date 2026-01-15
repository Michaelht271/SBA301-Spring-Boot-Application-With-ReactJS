import {Navbar, Nav, Container, Form, Button, InputGroup} from 'react-bootstrap'
import {NavLink, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import { useAuth } from '../../context/AuthContext'

function Header({onSearchChange}) {
    const [keyword, setKeyword] = useState("")
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearchChange(keyword)
        navigate('/')  // Redirect về Home
    }

    const handleClear = () => {
        setKeyword("")
        onSearchChange("")
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container className="py-2">
                <Navbar.Brand as={NavLink} to="/">
                    MichaelDev
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar"/>
                <Navbar.Collapse id="main-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/projects">Projects</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                    </Nav>

                    {/* SEARCH BAR - Responsive */}
                    <Form className="d-flex ms-lg-3 my-2 my-lg-0 flex-grow-1 flex-lg-grow-0" onSubmit={handleSubmit}>
                        <InputGroup style={{ maxWidth: '300px' }}>
                            <Form.Control
                                type="search"
                                placeholder="Search orchids..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {keyword && (
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleClear}
                                    title="Clear search"
                                >
                                    ✕
                                </Button>
                            )}
                            <Button variant="outline-light" type="submit">
                                Search
                            </Button>
                        </InputGroup>
                    </Form>

                    {/* AUTH BUTTON */}
                    <Nav className="ms-lg-3">
                        {user ? (
                            <Nav.Link onClick={handleLogout} className="cursor-pointer">
                                Logout
                            </Nav.Link>
                        ) : (
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header