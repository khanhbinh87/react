
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc'
import './ModalEditQuiz.scss'
import Select from 'react-select'
import _ from 'lodash'
import { toast } from 'react-toastify';

import { updateQuiz } from '../../../../services/apiServices';

export default function ModalEditQuiz(props) {
    const { show, setShow, dataUpdate, fetchAllQuiz } = props;

    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [difficulty, setDifficulty] = useState('EASY')
    const [image, setImage] = useState(null)
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ]

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setDes(dataUpdate.description)
            setDifficulty(dataUpdate.difficulty)
            setImage('')
            if (dataUpdate.image) {
                setImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleUploadFile = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))

        }
    }
    const handleSubmitQuiz = async () => {
        
        let data = await updateQuiz(dataUpdate.id,des,name,difficulty.value,image)


        if (data && data.EC === 0) {
            toast.success(data.EM)
            setShow(false)
           
            await fetchAllQuiz()

        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)

        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                size="xl"
                backdrop="static"

            >
                <Modal.Header closeButton>
                    <Modal.Title> Update a quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}


                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input type="text" className="form-control"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}


                            />
                        </div>
                        <div className="col-md-6">
                            
                            <Select

                                options={options}
                                defaultValue={difficulty}
                                onChange={ setDifficulty}
                                placeholder={"Quiz type"}
                            />
                        </div>


                        <div className="col-md-12">
                            <label className="form-label label-upload" htmlFor='labelUpload'><FcPlus />Upload file image</label>
                            <input
                                onChange={(e) => handleUploadFile(e)}
                                type="file" hidden id="labelUpload" />
                        </div>
                        <div className="col-md-12 text-center image">
                            {
                                image ? <img src={image} alt="" className='img' /> : ""
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

