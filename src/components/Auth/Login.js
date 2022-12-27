import React, { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiServices'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async() => {
        let data = await postLogin(email,password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            dispatch(doLogin(data))
            navigate('/')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)

        }
    }
    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet ?</span>
                <button 
                className='btn btn-secondary mx-2'
                onClick={() => navigate('/register')}
                >Sign up</button>
            </div>

            <div className='title'>
                Khanh Binh
            </div>
            <div className='welcome'>
                Hello, who’s this?
            </div>
            <div className='content-form'>

                <div className='form-group col-4'>
                    <label htmlFor="email">Email : </label>
                    <input
                        type={'email'}
                        className="form-control my-2"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group col-4 my-2' >
                    <label htmlFor="password">Password : </label>
                    <input
                        type={'password'}
                        className="form-control my-2"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="on"
                    />
                </div>
                <div className='form-group col-4'>
                    <span>Forgot password ? </span>
                    <button className='btn btn-login d-block w-100 color-black my-2' onClick={() => handleLogin()}>Login</button>
                </div>
                <div className='form-group col-4 text-center'>
                    <span className='back' onClick={() => { navigate ('/')}}>&#60; &#60; Go to Homepage </span>

                </div>

            </div>
        </div>
    )
}
