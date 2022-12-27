import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss'
import _ from 'lodash'



const ModalViewUser = (props) => {
    const [email, setEmail] = useState("")
  
    const [username, setUsername] = useState("")
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage('')
            if (dataUpdate.image) {
                setPreview(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])
    const handleClose = () => {
        setEmail('')
       
        setUsername('')
        setRole('USER')
        setImage('')
        setPreview('')
        setShow(false)
        setDataUpdate({})
    };





    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title> View user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                disabled
                                value={role}
                                className="form-select"
                                onChange={(e) => setRole(e.target.value)}>
                                <option defaultValue="USER">USER</option>
                                <option defaultValue='ADMIN'>ADMIN</option>
                            </select>
                        </div>

                        <div className="col-md-12 text-center img-preview">
                            {
                                preview ? <img src={preview} alt="" value={image}/> : <span>Preview Image</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;

