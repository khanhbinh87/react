
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiServices';
import { toast } from 'react-toastify';

export default function ModalDeleteUser(props) {

    const { show, setShow, dataDelete, currentPage } = props;
    const handleClose = () => setShow(false);
   
    const handleSubmitDeleteUser = async () => {

        let data = await deleteUser(dataDelete.id)

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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete the user </Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user.email <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}
