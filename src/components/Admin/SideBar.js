import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaTachometerAlt, FaGem  } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';

import { GiAbstract007 } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate()
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <GiAbstract007 size={'2em'} color={'00bfff'} /> 
                        <span onClick={() => navigate('/')} style={{cursor:'pointer'}}>KB</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        >
                            Dashboard
                            <Link to="/admin"/>
                        </MenuItem>

                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu

                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem> Quản lý User
                                <Link to="/admin/manage-users" />

                            </MenuItem>
                            <MenuItem> Quản lý  Quiz
                                <Link to="/admin/manage-quizzes" />

                            </MenuItem>
                            <MenuItem>
                                <Link to="/admin/manage-questions" />
                             Quản lý Câu Hỏi</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <Link
                            to="/"
                            
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                           
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169;KB
                            </span>
                        </Link>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;