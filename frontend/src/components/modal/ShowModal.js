import { Button, Modal } from "react-bootstrap";
import { fetchAuthentication } from "../../helpers/AuthService";


export function ShowModal({ showModal, handleClose, title, body, cardIdForDelete, setCards, setFlashMessage }) {


  function action(event) {
    event.preventDefault();
    handleClose();
    fetchAuthentication.delete(`/cards/${cardIdForDelete}`)
      .then(res => {
        setCards((prev) => {
          const next = [...prev];
          const index = prev.findIndex(card => card._id === res.data.deletedCard._id)
          next.splice(index, 1)
          return next;
        })
        setFlashMessage({
          isFlashActive: true,
          message: res.data.message,
          variant: "info"
        })
      })
      .catch((err) => {
        setFlashMessage({
          isFlashActive: true,
          message: err.response.data.errorMessage,
          variant: "danger"
        })
      })
  }

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={action}>
            Törlés
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}