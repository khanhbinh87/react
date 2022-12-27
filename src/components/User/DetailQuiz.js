import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuiz } from '../../services/apiServices'
export default function DetailQuiz() {
    const params = useParams();
    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        console.log(res)
    }
    return (
        <div className='detail-quiz-container'>DetailQuiz</div>
    )
}
