import {useState} from "react";
import {PATHS } from "../../constants/Path.js";
import {NavLink} from 'react-router-dom'
import {Button, Container, Form, FormControl, InputGroup, Nav, Navbar} from "react-bootstrap";
import PropTypes from "prop-types";


export default function Header ({onSearchChange}) {
    const [keyword, setKeyword] = useState("")
    const {user, logout} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        onSearchChange(keyword)
        navigate(PATHS.HOME)
    }
    const handleClear = () => {
        setKeyword("")
        onSearchChange("")
    }

    const handleLogout  = () => {
        logout()
        navigate(PATHS.LOGIN)
    }
    return (
        <>
            <Navbar bg ="dark" variant ="dark" expand = "lg" stick ="top">
                <Container className={"py-2"} fluid = "md">
                    <Navbar.Brand as = {NavLink} to ={PATHS.HOME}>
                        Michael Dev
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={"main-navbar"}/>
                    <Nav.Collapse id ="main-navbar">
                        <Nav className = {"me-auto"}>
                            <Nav.Link as = {NavLink} to = {PATHS.HOME}>Home</Nav.Link>
                            <Nav.Link as = {NavLink} to = {PATHS.ABOUT}>About</Nav.Link>
                            <Nav.Link as = {NavLink} to = {PATHS.PROJECT}>Project</Nav.Link>
                            <Nav.Link as = {NavLink} to = {PATHS.CONTACT}>Contact</Nav.Link>
                        </Nav>

                        <Form >
                            <InputGroup>
                                <FormControl />
                                <Button>                                    x
                                </Button>
                                <Button>Search</Button>
                            </InputGroup>
                        </Form>
                    </Nav.Collapse>
                    <Nav>
                        {user ? (    <Nav.Link >
                                Logout
                            </Nav.Link>
                        ) :(
                            <Nav.Link >
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

Header.proTypes = {
    onSearchChange: PropTypes.func.isRequired

}