import React from 'react'
import videoHomePage from "../../assets/video.mp4"
import './HomePage.scss'
export default function HomePage() {
  return (
    <div className='homepage-container'>
      <video  autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className='homepage-content'>
       
          <h3 className='homepage-title'>There's a better way to ask</h3>
          <p className='homepage-desc'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</p>
          <a href='#' className='homepage-start'>Get started - it's free</a>
        
      </div>
    </div>
  )
}
