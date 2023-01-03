import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'

import { useSelector } from 'react-redux'

function Header() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')

    }

    let isAuthenticated = useSelector(state => state.user.isAuthenticated)

    return (
        <Navbar bg="light" expand="lg" className="nav-container">
            <Container>
                <NavLink className="navbar-brand" to="/">
                    KB</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="user">User</NavLink>
                        <NavLink className="nav-link" to="admin">Admin</NavLink>
                    </Nav>
                    <Nav>

                        {
                            isAuthenticated === false ?

                                <>
                                    <button className='log-in' onClick={() => handleLogin()}>Log in</button>
                                    <button className='sign-up' onClick={() => navigate('/register')}>Sign up</button>
                                </> :
                                <>

                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        <NavDropdown.Item >Profile</NavDropdown.Item>

                                        <NavDropdown.Item >Log out</NavDropdown.Item>

                                    </NavDropdown>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;