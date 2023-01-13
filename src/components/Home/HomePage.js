import React from 'react'
import videoHomePage from "../../assets/video.mp4"
import './HomePage.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
export default function HomePage() {


  let isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()

  const { t } = useTranslation();

  return (
    <div className='homepage-container'>
      <video autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className='homepage-content'>

        <h3 className='homepage-title'>{t('homepage.title')}</h3>
        <p className='homepage-desc'>{t('homepage.description')}</p>
        {
          isAuthenticated  === false ?
          <button 
              onClick={() => navigate('/login')}
              href='https://github.com/khanhbinh87/react/tree/pro' className='homepage-start'>{t('homepage.content.login')}</button>
          :
          <button onClick={()=> navigate('/user')} className="btn btn-info">Doing quiz now</button>
        }

      </div>
    </div>
  )
}
