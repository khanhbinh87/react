import ModalUser from "./ModalUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc"
import { useEffect, useState } from "react";
import axios from 'axios'
import TableUser from "./TableUser";
export default function ManageUser() {
  const [show, setShow] = useState(false)
 
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
          <TableUser />
        </div>
        <ModalUser show={show} setShow={setShow} />

      </div>
    </div>
  )
}
