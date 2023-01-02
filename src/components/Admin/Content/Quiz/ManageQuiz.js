import React, { useState } from 'react'
import './ManageQuiz.scss'
import Select from 'react-select'

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

    const handleChangeFile = (e) => {

    }
    return (
        <div className='quiz-container'>
            <div className='quiz-title'>ManageQuiz</div>
            <hr />
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
                        value={type}
                        options={options}
                        placeholder={"Quiz type"}
                    />
                </div>
                <div className='more-actions my-2 form-control'>
                    <label className='mb-1'>Upload Image</label>
                    <input type="file" className="form-control" onChange={(e) => handleChangeFile(e)} />

                </div>
            </fieldset>
            <div className='list-detail'>

            </div>
        </div>
    )
}
