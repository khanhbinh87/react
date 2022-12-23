import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom'
import './Header.scss'
function Header() {
    return (
        <Navbar bg="light" expand="lg" className="nav-container">
            <Container>
                <NavLink className="navbar-brand" to="/">KB</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="user">User</NavLink>
                        <NavLink className="nav-link" to="admin">Admin</NavLink>
                    </Nav>
                    <Nav>
                        <button className='log-in'>Log in</button>
                        <button className='sign-up'>Sign up</button>
                        {/* <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                            <NavDropdown.Item > Log in</NavDropdown.Item>
                            <NavDropdown.Item >Log out</NavDropdown.Item>

                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;