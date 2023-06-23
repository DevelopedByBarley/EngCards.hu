import { Button, Modal } from "react-bootstrap";
import { fetchAuthentication } from "../../helpers/AuthService";
import { useNavigate } from "react-router-dom";


export function DeleteThemeModal({ showThemeModal, handleThemeClose, themeId, setFlashMessage }) {
  const navigate = useNavigate();

  console.log(themeId);

  function action(event) {
    event.preventDefault();

    fetchAuthentication.delete(`/themes/${themeId}`)
      .then(res => {
        setFlashMessage({
          isFlashActive: true,
          message: res.data.message,
          variant: "info"
        })
        navigate('/dashboard')
      })

  }

  return (
    <>
      <Modal show={showThemeModal} onHide={handleThemeClose}>
        <Modal.Header closeButton>
          <Modal.Title>Téma törlése!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Biztosan törlöd ezt a témát?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleThemeClose}>
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