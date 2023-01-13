import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import ManageQuestions from './components/Admin/Content/Quiz/ManageQuestions';
import PrivateRoute from './routes/PrivateRoute';
const NotFound = () => {
    return (
        <div className='alert alert-danger text-center'> Not found data with your current URL</div>
    )
}
export default function Layout() {
    return (

        <Suspense fallback="...is loading">
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="user" element={
                            <PrivateRoute>
                                <ListQuiz />
                            </PrivateRoute>
                        } />
                    </Route>
                    <Route path="/quiz/:id" element={<DetailQuiz />} />

                    <Route path="/admin" element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                    } >
                        <Route index element={<Dashboard />} />
                        <Route path="manage-users" element={<ManageUser />} />
                        <Route path="manage-quizzes" element={<ManageQuiz />} />
                        <Route path="manage-questions" element={<ManageQuestions />} />

                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer />
            </BrowserRouter>
        </Suspense>

    )
}
