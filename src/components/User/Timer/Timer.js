import React from 'react'
import CountDown from '../Count/CountDown'
import './Time.scss'

export default function Timer(props) {
    const { dataQuiz, handleFinish } = props
    const onTimeUp = () =>{
        handleFinish()
    }
  return (
    <div className='timer-container'>
          <div className='timer'>
              <CountDown onTimeUp={onTimeUp}/>
          </div>
          <div className='content'>
            {
                dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item,index) =>{
                    return (
                        <div key={`${item}-${index}`} className="content-child">{index + 1}</div>
                    )
                })
            }
          </div>
    </div>
  )
}
