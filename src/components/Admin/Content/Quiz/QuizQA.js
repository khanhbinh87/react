import React, { useEffect, useState } from 'react'
import './ManaQuestions.scss'
import Select from 'react-select';

import { BsFillPatchPlusFill, BsPatchMinusFill } from 'react-icons/bs'

import { AiOutlineMinusCircle, AiFillPlusSquare } from 'react-icons/ai'
import { RiImageAddFill } from 'react-icons/ri'
import Lightbox from "react-awesome-lightbox";

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import { getAllQuizAdmin, getQuizQA, upsertQuizQA } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

export default function QuizQA() {

    const [selectedQuiz, setSelectedQuiz] = useState({})


    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
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
    const [questions, setQuestions] = useState(initQuestion)


    const [imagePreview, setImagePreview] = useState(false)
    const [dataImgPreview, setDataImgPreview] = useState({
        title: '',
        url: ''
    })
    const [listQuiz, setListQuiz] = useState([])
    useEffect(() => {
        fetchAllQuiz()
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetQuizWithAQ()
        }
    }, [selectedQuiz])
    const fetQuizWithAQ = async () => {
        let res = await getQuizQA(selectedQuiz.value)
        
        if (res && res.EC === 0) {
            //convert base 64 to file object

            //return a promise that resolves with a File instance
            function urltoFile(url, filename, mimeType) {
                return (fetch(url)
                    .then(function (res) { return res.arrayBuffer(); })
                    .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
                );
            }
            let newAQ = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]

                if (q.imageFile) {
                    q.imageName = `Question- ${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `{Question- ${q.id}.png}`, 'image/png')
                }

                newAQ.push(q)
            }

            setQuestions(newAQ)
        }

    }
    const fetchAllQuiz = async () => {
        let res = await getAllQuizAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} -${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, questionId) => {

        if (type === 'ADD') {

            let newQuestions = {
                id: uuidv4(),
                description: '',
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

                cloneQuestions[index].description = value
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
            cloneQuestions[index].answers = cloneQuestions[index].answers.map((answer) => {
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
    const handleSubmitQuestionForQuiz = async () => {
        //validate quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a quiz')
        }

        //validate answer
        let validAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    validAnswer = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i;
            if (validAnswer === false) break;
        }
        if (validAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return;
        }

        //validate question

        let validAQuestion = true;
        let indexQ1 = 0;

        for (let i = 0; i < questions.length; i++) {

            if (!questions[i].description) {
                validAQuestion = false;
                indexQ1 = i;
                break;
            }
        }
        if (validAQuestion === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`)
            return
        }

        //convert file to base64
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        let cloneQuestions = _.cloneDeep(questions)
        for (let i = 0; i < cloneQuestions.length; i++) {
            if (cloneQuestions[i].imageFile) {
                cloneQuestions[i].imageFile = await toBase64(cloneQuestions[i].imageFile)
            }
        }
        let res = await upsertQuizQA({
            quizId: selectedQuiz.value,
            questions: cloneQuestions
        })
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetQuizWithAQ()

        }



    }
    const handlePreviewImage = (questionId) => {
        let cloneAnswers = _.cloneDeep(questions)

        let index = cloneAnswers.findIndex(answer => answer.id === questionId)

        if (index > -1) {
            setDataImgPreview({
                url: URL.createObjectURL(cloneAnswers[index].imageFile),
                title: cloneAnswers[index].imageName,
            })
            setImagePreview(true)

        }
    }

    return (
        <div className='question-container'>
            <div className='title'>Update Q/A </div>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label>Select quiz :</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
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
                                        <input type={"text"}
                                            className="form-control"
                                            placeholder={`${index + 1}`}
                                            value={question.description}
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
                                            </span> : '0 file is upload'}</span>
                                    </div>

                                    <div className='add-questions'>
                                        <span className='add' onClick={() => handleAddRemoveQuestion('ADD', '')}><BsFillPatchPlusFill className='icon-add' /></span>
                                        {
                                            questions.length > 1 && <span className='remove' onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><BsPatchMinusFill className='icon-remove' /></span>
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
                                                    checked={answer.isCorrect}
                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                />
                                                <div className="form-floating answer">
                                                    <input
                                                        type="text"
                                                        value={answer.description}
                                                        className="form-control"
                                                        placeholder={`Answer ${index + 1}`}
                                                        onChange={(e) => handleAnswerQuestion('INPUT', question.id, answer.id, e.target.value)}

                                                    />
                                                    <label >{`Answer ${index + 1}`} </label>
                                                </div>
                                                <div className='add-questions'>
                                                    <span className='add'
                                                        onClick={() => handleAddRemoveAnswer('ADD', question.id)}><AiFillPlusSquare className='icon-add' /></span>
                                                    {
                                                        question.answers.length > 1 && <span className='remove' onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><AiOutlineMinusCircle className='icon-remove' /></span>
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
                imagePreview && <Lightbox zoomStep="0.6" image={dataImgPreview.url} title={dataImgPreview.title} onClose={() => setImagePreview(false)} />
            }
        </div>
    )
}

