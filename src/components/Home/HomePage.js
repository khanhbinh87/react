import React from 'react'
import videoHomePage from "../../assets/video.mp4"
import './HomePage.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
  let isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  return (
    <div className='homepage-container'>
      <video autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className='homepage-content'>

        <h3 className='homepage-title'>There's a better way to ask</h3>
        <p className='homepage-desc'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</p>
        {
          isAuthenticated  === false ?
          <button 
              onClick={() => navigate('/login')}
          href='https://github.com/khanhbinh87/react/tree/pro' className='homepage-start'>Get started - it's free</button>
          :
          <button onClick={()=> navigate('/user')} className="btn btn-info">Doing quiz now</button>
        }

      </div>
    </div>
  )
}
