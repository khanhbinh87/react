import React, { useState ,useEffect} from 'react'
import './ManageQuiz.scss'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { postCreateNewQuiz, getAllQuizAdmin } from '../../../../services/apiServices'
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz'
import QuizQA from './QuizQA'
import AssignQuiz from './AssignQuiz'
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]
export default function ManageQuiz() {
    const [name, setName] = useState('')
    const [description, setDesciption] = useState('')
    const [type, setType] = useState('EASY')
    const [image, setImage] = useState(null)
    const [listQuiz, setListQuiz] = useState([])
    useEffect(() => {
        fetchAllQuiz()
    }, [])
    const fetchAllQuiz = async () => {
        let res = await getAllQuizAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])

        }
    }
    const handleSubmitQuiz = async (e) => {
        if (!name || !description) {
            toast.error("Name/Des is required")
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
       
        if (res && res.EC === 0) {

            toast.success(res.EM)
            setName('')
            setDesciption('')
            setImage(null)
            fetchAllQuiz()
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>ManageQuiz</Accordion.Header>
                    <Accordion.Body>
                        <fieldset className="border p-2">
                            <legend className='float-none w-auto p-2'>Add new quiz</legend>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Quiz"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label >Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDesciption(e.target.value)}
                                />
                                <label >Description</label>
                            </div>
                            <div className="form-floating mb-3">

                                <Select

                                    options={options}
                                    defaultValue={type}
                                    onChange={setType}
                                    placeholder={"Quiz type"}
                                />
                            </div>
                        </fieldset>
                        <div className='more-actions my-2 '>
                            <label className='mb-1'>Upload Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => handleChangeFile(e)} />

                        </div>
                        <div>
                            <button className='btn btn-warning' onClick={(e) => handleSubmitQuiz(e)}>Save</button>
                        </div>
                        <div className='list-detail'>
                            <TableQuiz listQuiz={listQuiz}  fetchAllQuiz={fetchAllQuiz}/>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                       <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign to Users</Accordion.Header>
                    <Accordion.Body>
                       <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>


        </div>
    )
}
