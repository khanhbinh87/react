import ModalUser from "./ModalUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc"

import TableUser from "./TableUser";
import React, { useEffect, useState } from 'react'
import { getAllUser, getAllUserPaginate } from '../../../services/apiServices'
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";

import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

export default function ManageUser() {
  const [show, setShow] = useState(false)
  const [listUser, setListUser] = useState([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
  const [showModalViewUser, setShowModalViewUser] = useState(false)
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})
  const [dataDelete, setDataDelete] = useState({})
  const [pageCount, setPageCount] = useState(0)
  const [currentPage,setCurrentPage] = useState(1)
  const LIMIT_PAGE = 4;
  useEffect(() => {
    // fetchAllUser();
    fetchAllUserPaginate(1)
  }, [])
  const fetchAllUser = async () => {
    let res = await getAllUser()
    if (res.EC === 0) {
      setListUser(res.DT)
    }
  }

  const fetchAllUserPaginate = async (page ) => {
    let res = await getAllUserPaginate(page,LIMIT_PAGE)
    if (res.EC === 0) {
      setListUser(res.DT.users)
      setPageCount(res.DT.totalPages)
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
  const handleDeleteUser = (item) => {

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
          {/* <TableUser
            listUser={listUser}
            handleUpdateUser={handleUpdateUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
          /> */}
          <TableUserPaginate
            listUser={listUser}
            handleUpdateUser={handleUpdateUser}
            handleViewUser={handleViewUser}
            handleDeleteUser={handleDeleteUser}
            pageCount={pageCount}
            fetchAllUserPaginate={fetchAllUserPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalUser
          show={show}
          setShow={setShow}
          fetchAllUser={fetchAllUser} 
          fetchAllUserPaginate={fetchAllUserPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchAllUser={fetchAllUser}
          fetchAllUserPaginate={fetchAllUserPaginate}
          setDataUpdate={setDataUpdate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
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
          fetchAllUser={fetchAllUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          fetchAllUserPaginate={fetchAllUserPaginate}
         
        />

      </div>
    </div>
  )
}
