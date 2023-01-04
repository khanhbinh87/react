import React, { useState } from 'react'
import './ManaQuestions.scss'
import Select from 'react-select';

import { AiFillPlusCircle } from 'react-icons/ai'
import { FiMinusCircle } from 'react-icons/fi'
import { AiOutlinePlusCircle } from 'react-icons/ai'
export default function ManageQuestions() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className='question-container'>
            <div className='title'>Manage quetion</div>
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
                <div className='questions'>
                    <div class="form-floating mb-3 col-6">
                        <input type="text" class="form-control" placeholder="Description" />
                        <label >Description</label>
                    </div>
                    <div className='upload'>
                        <label>Upload image : </label>
                        <input type={'file'} hidden />
                        <span> 0 file is update</span>
                    </div>

                    <div className='add-questions'>
                        <span className='add'><AiFillPlusCircle /></span>
                        <span className='remove'><FiMinusCircle /></span>
                    </div>
                </div>
                <div className='anser-content'>
                    <input type={"checkbox"} className="form-check-input"/>
                    <div class="form-floating answer">
                        <input type="text" class="form-control" placeholder="Answer" />
                        <label >Answer</label>
                    </div>
                    <div className='add-questions'>
                        <span className='add'><AiOutlinePlusCircle /></span>
                        <span className='remove'><FiMinusCircle /></span>
                    </div>
                </div>

            </div>
        </div>
    )
}
