import ModalUser from "./ModalUser";
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc"
import { useState } from "react";

export default function ManageUser() {
  const [show,setShow] = useState(false)
 
  return (
    <div className='manage-user-container'>
      <div className='title'>
        ManageUser
      </div>
      <div className='user-content'>
        <div>
          <button 
          className='btn btn-primary add-new'
            onClick={() => setShow(true)}
          ><FcPlus />Add new users</button>
        </div>
        <div>
          <ModalUser show={show} setShow={setShow}/>

        </div>
      </div>
    </div>
  )
}
