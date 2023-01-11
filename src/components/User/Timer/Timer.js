import React, { useRef } from 'react'
import CountDown from '../Count/CountDown'
import './Time.scss'

export default function Timer(props) {
    const { dataQuiz, handleFinish, setIndex } = props
    const refDiv = useRef([])

    const onTimeUp = () => {
        handleFinish()
    }
    const getClassQuestion = (question) => {

        if (question && question.answers.length > 0) {
            let isSelected = question.answers.find(item => item.isSelected === true)

            if (isSelected) {
                return "content selected"
            }
        }
        return "content"
    }
    const handleClickQuestion = (question, index) => {

        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === 'content clicked') {
                    item.className = 'content'
                }
            })
        }
        if (question && question.answers.length > 0) {
            let isSelected = question.answers.find(item => item.isSelected === true)
            setIndex(index)
            if (isSelected) {
                return;
            }
        }
        refDiv.current[index].className = 'content clicked'
        
    }
    return (
        <div className='timer-container'>
            <div className='timer'>
                <CountDown onTimeUp={onTimeUp} />
            </div>
            <div className='content-main'>
                {
                    dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item, index) => {
                        return (
                            <div key={`${item}-${index}`}
                                className={getClassQuestion(item, index)}
                                onClick={() => handleClickQuestion(item, index)}
                                ref={element => {

                                    refDiv.current[index] = element
                                }}
                            >{index + 1}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
