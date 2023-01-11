import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function PrivateRoute(props) {
    let isAuthenticated = useSelector(state => state.user.isAuthenticated)
    
    if (!isAuthenticated) {
        return <Navigate to="/login"/>
    }

    return (
        <div>{props.children}</div>
    )
}
