import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getQuizbyUser } from '../../services/apiServices'
import './ListQuiz.scss'
export default function ListQuiz() {
    const [arrQuiz, setArrQuiz] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getQuizData()
    }, [])
    const getQuizData = async () => {
        let data = await getQuizbyUser();
        if (data && data.EC === 0)
            setArrQuiz(data.DT)
    }
    return (
        <div className='list-quiz-container container'>
            {
                arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`${index}-quiz`} className="card" >
                            <img src={`data: image/png; base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                >Start Now</button>
                            </div>
                        </div>)
                })
            }
            {
                arrQuiz && arrQuiz.length === 0 && <div>You don't have any quiz now ...</div>
            }

        </div>
    )
}
