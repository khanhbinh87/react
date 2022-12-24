import ModalUser from "./ModalUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc"

import axios from 'axios'
import TableUser from "./TableUser";
import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../../services/apiServices'


export default function ManageUser() {
  const [show, setShow] = useState(false)
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchAllUser();
  }, [])
  const fetchAllUser = async () => {
    let res = await getAllUser()

    if (res.EC === 0) {
      setListUser(res.DT)

    }
  }
  return (
    <div className='manage-user-container'>
      <div className='title'>
        ManageUser
      </div>
      <div className='user-content'>
        <div className="btn-new">
          <button
            className='btn btn-primary add-new '
            onClick={() => setShow(true)}
          ><FcPlus />Add new users</button>
        </div>
        <div className="table-users-container">
          <hr />
          <p>Table User : </p>
          <TableUser listUser={listUser} />
        </div>
        <ModalUser show={show} setShow={setShow} fetchAllUser={fetchAllUser}/>

      </div>
    </div>
  )
}
