
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalDeleteUser(props) {

    const { show, setShow ,dataDelete} = props;
    const handleClose = () => setShow(false);
    const handleSubmitDeleteUser =()=>{
        console.log('delete')
    }

    return (

        <>
        

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the user </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user.email <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}
