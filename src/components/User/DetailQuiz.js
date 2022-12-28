import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDataQuiz } from '../../services/apiServices'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question'
export default function DetailQuiz() {
    const params = useParams();
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    const handlePrev = () => {
        if (index - 1 < 0) { return; }
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {

            setIndex(index + 1)
        }
    }
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDes, image = null

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDes = item.description;
                            image = item.image
                        }
                        answers.push(item.answers)
                    })

                    return { questionId: key, answers, questionDes, image }

                })
                .value()
            setDataQuiz(data)
        }

    }
    return (
        <div className='detail-quiz-container '>
            <div className='left-content'>
                <div className='title'>Quiz {quizId} : {location?.state?.quizTitle}</div>
                <hr />
                <div className='q-body'>
                    {/* <img src={`data:image/jpeg;base64,${image}`} /> */}

                </div>
                <div className='q-content'>
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                    />
                </div>
                <hr />
                <div className='footer'>
                    <button className='btn btn-info' disabled={index <= 0} onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary'  onClick={() => handleNext()}>Next</button>
                </div>
            </div>
            <div className='right-content'>coudntodung</div>
        </div>
    )
}
