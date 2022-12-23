import ModalUser from "./ModalUser";

export default function ManageUser() {
  return (
    <div classNameName='manage-user-container'>
      <div classNameName='title'>
        ManageUser
      </div>
      <div classNameName='user-content'>
        <div>
          {/* <button classNameName='btn btn-success'>Add new users</button> */}
          <ModalUser />
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
