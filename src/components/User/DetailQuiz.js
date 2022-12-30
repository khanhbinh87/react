import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDataQuiz, postSubmitQuiz } from '../../services/apiServices'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question'

import ModalResult from './ModalResult'
export default function DetailQuiz() {
    const params = useParams();
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [showModalResult, setShowModalResult] = useState(false)
    const [dataModalResult,setDataModalResult] = useState({})
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
                        item.answers.isSelected = false
                        answers.push(item.answers)
                    })

                    return { questionId: key, answers, questionDes, image }

                })
                .value()
            setDataQuiz(data)
        }

    }

    const handleCheck = (answerId, questionId) => {

        let dataQuizClone = _.cloneDeep(dataQuiz)

        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let result = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = result

        }
        let index = dataQuizClone.findIndex(item => {
            return +item.questionId === +questionId
        })

        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }
    const handleFinish = async () => {

        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = []
                question.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId

                })

            })
            payload.answers = answers
        }
        console.log(payload)
        let res = await postSubmitQuiz(payload)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setShowModalResult(true)
        } else {
            alert('Something wrongs')
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
                        handleCheck={handleCheck}
                    />
                </div>
                <hr />
                <div className='footer'>
                    <button className='btn btn-info' disabled={index <= 0} onClick={() => handlePrev()}>Prev</button>
                    <button className='btn btn-primary' onClick={() => handleNext()}>Next</button>
                    <button className='btn btn-success' onClick={() => handleFinish()}>Finish</button>
                </div>
            </div>
            <div className='right-content'>coudntodung</div>
            <ModalResult show={showModalResult} setShow={setShowModalResult} dataModalResult={dataModalResult}/>
        </div>
    )
}
