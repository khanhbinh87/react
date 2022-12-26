import React, { useState } from 'react'
import './Login.scss'
export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = () => {
        alert('me')
    }
    return (
        <div className='login-container'>
            <div className='header'>
                Don't have an account yet ?
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
               

            </div>
        </div>
    )
}
