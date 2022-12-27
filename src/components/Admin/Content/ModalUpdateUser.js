import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalUser.scss'
import { FcPlus } from "react-icons/fc"
import _ from 'lodash'
import { toast } from 'react-toastify';
import { updateUser } from '../../../services/apiServices';


const ModalUpdateUser = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState('USER')
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const { show, setShow, dataUpdate, setDataUpdate, currentPage,
         } = props;

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setEmail(dataUpdate.email)
            setRole(dataUpdate.role)
            setImage('')
            if (dataUpdate.image) {
                setPreview(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])
    const handleClose = () => {
        setEmail('')
        setPassword('')
        setUsername('')
        setRole('USER')
        setImage('')
        setPreview('')
        setShow(false)
        setDataUpdate({})
    };


    const handleUploadFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        }

    }

    const handleSubmitCreateUser = async () => {

        let data = await updateUser(dataUpdate.id, username, role, image)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchAllUser()
            await props.fetchAllUserPaginate(currentPage)

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)

        }
    }

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
                    <Modal.Title> Update a user</Modal.Title>
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
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled

                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                onChange={(e) => setRole(e.target.value)}>
                                <option defaultValue="USER">USER</option>
                                <option defaultValue='ADMIN'>ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'><FcPlus />Upload file image</label>
                            <input
                                onChange={(e) => handleUploadFile(e)}
                                type="file" hidden id="labelUpload" />
                        </div>
                        <div className="col-md-12 text-center img-preview">
                            {
                                preview ? <img src={preview} alt="" /> : <span>Preview Image</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;

