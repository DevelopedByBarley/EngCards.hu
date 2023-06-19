import { Button, Modal } from "react-bootstrap";
import { fetchAuthentication } from "../../helpers/AuthService";
import { useNavigate } from "react-router-dom";


export function DeleteThemeModal({ showThemeModal, handleThemeClose ,themeId }) {
  const navigate = useNavigate();

  function action(event) {
    event.preventDefault();

   fetchAuthentication.delete(`/themes/${themeId}`)
      .then(res => {
        console.log(res);
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