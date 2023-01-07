import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getAllQuizAdmin, getAllUser } from '../../../../services/apiServices'


export default function AssignQuiz() {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})

    const [listUser,setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    useEffect(() => {
        fetchAllQuiz();
        fetAllUser()
    }, [])
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
    const fetAllUser = async() =>{
        let res = await getAllUser();
        console.log(res)
        if (res && res.EC === 0) {
            setListUser(res.DT)
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }
    return (
        <div className='assign-container row'>
            <div className='col-6 form-group'>
                <label>Select quiz :</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label>Select User :</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
        </div>
    )
}
