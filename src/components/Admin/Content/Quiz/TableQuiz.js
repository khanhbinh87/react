import React, { useEffect, useState } from 'react'
import { getAllQuizAdmin } from '../../../../services/apiServices'

export default function TableQuiz() {
    const [listQuiz, setListQuiz] = useState('')
    useEffect(() => {
        fetchAllQuiz()
    }, [])
    const fetchAllQuiz = async () => {
        let res = await getAllQuizAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }
    return (
        <>
            
            <h3 className='my-1'>List Quizzes :</h3>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.length > 0 && listQuiz.map((item, index) => {
                        return (
                            <tr key={`listQuiz-${index}`}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "5px" }}>
                                    <button className='btn btn-warning'>Edit</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody></table>
        </>
    )
}
