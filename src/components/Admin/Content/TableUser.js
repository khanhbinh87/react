import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../../services/apiServices'
export default function TableUser(props) {
    const { listUser } = props
    return (
        <>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        listUser && listUser.length > 0 && listUser.map((item, index) => {
                            return (
                                <tr key={`table users - ${index}`}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className='btn btn-secondary'>View</button>
                                        <button className='btn btn-warning mx-2'>Update</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    {
                        listUser && listUser.length === 0 &&
                        <tr>
                            <th colSpan={'4'}>Not found data</th>

                        </tr>

                    }
                </tbody>
            </table>
        </>
    )
}
