import React, { useState } from 'react'
import './ManaQuestions.scss'
import Select from 'react-select';

import { AiFillPlusCircle } from 'react-icons/ai'
import { FiMinusCircle } from 'react-icons/fi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import Lightbox from "react-awesome-lightbox";

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

export default function ManageQuestions() {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState([
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ])
    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                desciption: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const [imagePreview, setImagePreview] = useState(false)
    const [dataImgPreview, setDataImgPreview] = useState({
        title: '',
        url: ''
    })
    const handlePreviewImage = (questionId) => {
        let cloneAnswers = _.cloneDeep(questions)
        
        let index = cloneAnswers.findIndex(answer => answer.id === questionId)
        
        if(index > -1){
            setDataImgPreview({
                url: URL.createObjectURL(cloneAnswers[index].imageFile),
                title: cloneAnswers[index].imageName,
            })
            setImagePreview(true)

        }
    }
    const handleAddRemoveQuestion = (type, questionId) => {

        if (type === 'ADD') {

            let newQuestions = {
                id: uuidv4(),
                desciption: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestions])
        }
        if (type === 'REMOVE') {
            let cloneQuestions = _.cloneDeep(questions)

            cloneQuestions = cloneQuestions.filter(question => question.id !== questionId)
            setQuestions(cloneQuestions)
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {

        let cloneAnswers = _.cloneDeep(questions)
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = cloneAnswers.findIndex(answer => answer.id === questionId)
            cloneAnswers[index].answers.push(newAnswer)
            setQuestions(cloneAnswers)
        }
        if (type === 'REMOVE') {
            let index = cloneAnswers.findIndex(answer => answer.id === questionId)
            cloneAnswers[index].answers = cloneAnswers[index].answers.filter(answer => answer.id !== answerId)

            setQuestions(cloneAnswers)


        }
    }
    const handleOnchange = (type, questionId, value) => {

        let cloneQuestions = _.cloneDeep(questions)
        if (type === 'QUESTION') {

            let index = cloneQuestions.findIndex(question => question.id === questionId)
            if (index > -1) {

                cloneQuestions[index].desciption = value
                setQuestions(cloneQuestions)
            }
        }
    }

    const handleOnchangeFileQuestion = (questionId, e) => {

        let cloneQuestions = _.cloneDeep(questions)
        let index = cloneQuestions.findIndex(question => question.id === questionId)

        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            cloneQuestions[index].imageFile = e.target.files[0]
            cloneQuestions[index].imageName = e.target.files[0].name

            setQuestions(cloneQuestions)
        }
    }
    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let cloneQuestions = _.cloneDeep(questions)
        let index = cloneQuestions.findIndex(question => question.id === questionId)
        if (index > -1) {
            cloneQuestions[index].answers = cloneQuestions[index].answers.map((answer, index) => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value

                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer
            })
            setQuestions(cloneQuestions)
        }

    }
    const handleSubmitQuestionForQuiz = () => {

        console.log(questions)
    }

    return (
        <div className='question-container'>
            <div className='title'>Manage question</div>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label>Select quiz :</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                    />
                </div>
                <div className='my-3'>
                    Add questions :
                </div>
                {
                    questions && questions.length > 0 && questions.map((question, index) => {
                        return (
                            <div key={`Question - ${question.id}`}>
                                <div className='questions' >

                                    <div className="form-floating mb-3 col-6">
                                        <input type="text"
                                            className="form-control"
                                            placeholder={`${index + 1}`}
                                            value={question.desciption}
                                            onChange={(e) => handleOnchange('QUESTION', question.id, e.target.value)}
                                        />
                                        <label >Question {index + 1} 's description</label>
                                    </div>
                                    <div className='upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='label-up' />
                                        </label>
                                        <input
                                            type={'file'}
                                            hidden
                                            id={`${question.id}`}
                                            onChange={(e) => handleOnchangeFileQuestion(question.id, e)}

                                        />
                                        <span style={{ cursor: 'pointer' }}> {question.imageName ?
                                            <span onClick={() => {
                                                handlePreviewImage(question.id)

                                            }}>
                                                {question.imageName}
                                            </span> : '0 file is update'}</span>
                                    </div>

                                    <div className='add-questions'>
                                        <span className='add' onClick={() => handleAddRemoveQuestion('ADD', '')}><AiFillPlusCircle /></span>
                                        {
                                            questions.length > 1 && <span className='remove' onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><FiMinusCircle /></span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0
                                    && question.answers.map((answer, index) => {
                                        return (
                                            <div className='anser-content mb-3' key={`Answer - ${answer.id}`}>
                                                <input
                                                    type={"checkbox"}
                                                    className="form-check-input"
                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                />
                                                <div className="form-floating answer">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={`Answer ${index + 1}`}
                                                        onChange={(e) => handleAnswerQuestion('INPUT', question.id, answer.id, e.target.value)}

                                                    />
                                                    <label >{`Answer ${index + 1}`} </label>
                                                </div>
                                                <div className='add-questions'>
                                                    <span className='add' onClick={() => handleAddRemoveAnswer('ADD', question.id)}><AiOutlinePlusCircle /></span>
                                                    {
                                                        question.answers.length > 1 && <span className='remove' onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><FiMinusCircle /></span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                        
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button className='btn btn-warning' onClick={() => handleSubmitQuestionForQuiz()}>Save questions</button>
                    </div>
                }
            </div>
            {
                imagePreview && <Lightbox  zoomStep="0.6" image={dataImgPreview.url} title={dataImgPreview.title} onClose={() => setImagePreview(false)} />
            }
        </div>
    )
}

