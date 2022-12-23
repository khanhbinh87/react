import ModalUser from "./ModalUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc"
import { useState } from "react";

export default function ManageUser() {
  const [show,setShow] = useState(false)
  const handleShow =()=> {
    setShow(true)
  }
  return (
    <div className='manage-user-container'>
      <div className='title'>
        ManageUser
      </div>
      <div className='user-content'>
        <div>
          <button 
          className='btn btn-success add-new'
          onClick={()=> handleShow()}
          ><FcPlus />Add new users</button>
        </div>
        <div>
          <ModalUser show={show} setShow={setShow}/>

        </div>
      </div>
    </div>
  )
}
