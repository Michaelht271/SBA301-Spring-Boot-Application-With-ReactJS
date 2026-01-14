import {Navbar, Nav, Container, Form, Button} from 'react-bootstrap'
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
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container className="py-2 ">
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
                                </Navbar.Collapse>
                                {/* SEARCH BAR */}
                                <Form className="d-flex ms-3" onSubmit={handleSubmit}>
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
                                {user ? (
                                    <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer', color: 'rgba(255,255,255,.55)' }} className="ms-3">Logout</Nav.Link>
                                ) : (
                                    <Nav.Link as={NavLink} to="/login" className="ms-3" style={{ color: 'rgba(255,255,255,.55)' }}>Login</Nav.Link>
                                )}
            </Container>
        </Navbar>
    )
}
export default Header
