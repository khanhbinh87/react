import ModalUser from "./ModalUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc"

import axios from 'axios'
import TableUser from "./TableUser";
import React, { useEffect, useState } from 'react'
import { getAllUser } from '../../../services/apiServices'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import { deleteUser } from "../../../services/apiServices";
import { toast } from 'react-toastify';
import ModalDeleteUser from "./ModalDeleteUser";

export default function ManageUser() {
  const [show, setShow] = useState(false)
  const [listUser, setListUser] = useState([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataDelete, setDataDelete] = useState({})
  useEffect(() => {
    fetchAllUser();
  }, [])
  const fetchAllUser = async () => {
    let res = await getAllUser()

    if (res.EC === 0) {
      setListUser(res.DT)

    }
  }
  const handleUpdateUser = (user) => {
    setShowModalUpdateUser(true)
    setDataUpdate(user)
  }
  const handleViewUser = (user) => {

    setShowModalViewUser(true)
    setDataUpdate(user)
  }
   const handleDeleteUser =  (item) => {
   
      setShowModalDeleteUser(true)
      setDataDelete(item)
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
          <TableUser
            listUser={listUser}
            handleUpdateUser={handleUpdateUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser  }
          />
        </div>
        <ModalUser
          show={show}
          setShow={setShow}
          fetchAllUser={fetchAllUser} />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchAllUser={fetchAllUser}
          setDataUpdate={setDataUpdate}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          fetchAllUser={fetchAllUser}
          setDataUpdate={setDataUpdate}
          dataUpdate={dataUpdate}

        />
        <ModalDeleteUser 
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
        
        />
      </div>
    </div>
  )
}
