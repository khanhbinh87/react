import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './components/User/User'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="user" element={<User />} />
                    </Route>
                    <Route path="/admin" element={<Admin />} >
                        <Route index element={<Dashboard />} />
                        <Route path="manage-users" element={<ManageUser />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </>
    )
}
