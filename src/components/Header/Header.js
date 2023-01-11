import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.scss'

import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';

function Header() {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    let isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let account = useSelector(state => state.user.account)

    const handleLogin = () => {
        navigate('/login')

    }
    const handleLogout = async () => {
        let res = await logOut(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(doLogout())
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }


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

                                    {
                                        isAuthenticated && <div> Xin chao : <b>{`${account.username}`}</b></div>
                                    }
                                    <NavDropdown title="Setting" id="basic-nav-dropdown">
                                        <NavDropdown.Item >Profile</NavDropdown.Item>

                                        <NavDropdown.Item ><span onClick={() => handleLogout()}>Log out</span></NavDropdown.Item>

                                    </NavDropdown>
                                    <Language />
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;