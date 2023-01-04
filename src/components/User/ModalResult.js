
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export default function ModalResult(props) {

    const { show, setShow, dataModalResult } = props;
    const handleClose = () => setShow(false);
   
    return (

        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Your result ... </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Total question :<b>{dataModalResult.countTotal}</b> </p>
                    <p>Total Correct answers : <b>{dataModalResult.countCorrect}</b> </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answer
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}
