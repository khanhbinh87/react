import React  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiServices';


export default function ModalDeleteQuiz(props) {
    const { show, setShow, dataDelete, fetchAllQuiz } = props
    
   
    const handleSubmitDeleteQuiz = async ()=>{
        let res = await deleteQuiz(dataDelete.id)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setShow(false)
            fetchAllQuiz()
         }
        if (res && res.EC !== 0) {
            toast.error(res.EM)

         }
    }

    return (
        <>
           

            <Modal show={show} onHide={() => setShow(false)} size="xl"
                backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete quiz ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure delete quiz id =
                    <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

