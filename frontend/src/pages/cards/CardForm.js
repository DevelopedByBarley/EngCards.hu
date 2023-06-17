import { useNavigate, useParams } from "react-router-dom";
import { fetchAuthentication } from "../../helpers/AuthService";

import { Form } from "react-bootstrap";
import { Button, Col, Container, Row } from "react-bootstrap";

export function CardForm({ setFlashMessage, isCardForUpdate }) {
  const { themeId } = useParams();
  const navigate = useNavigate();

  console.log(isCardForUpdate);

  const sendNewCard = (event) => {
    event.preventDefault();

    const newCard = {
      word: event.target.elements.word.value,
      translate: event.target.elements.translate.value
    }

    fetchAuthentication.post(`/cards/new/${themeId}`, newCard)
      .then(res => {
        navigate(`/cards/${themeId}`);
      })
      .catch((err) => {
        console.log(err);
        setFlashMessage({
          isFlashActive: true,
          message: err.response.data.errorMessage,
          variant: "danger"
        })
        navigate(`/cards/${themeId}`);
      })
      .finally(() => {
        setTimeout(() => {
          setFlashMessage({
            isFlashActive: false,
            message: "",
            variant: ""
          })
        }, 2500)
      })

  }


  const updateCard  = (event) => {
    event.preventDefault();

    const newCard = {
      word: event.target.elements.word.value,
      translate: event.target.elements.translate.value
    }

    console.log(newCard);

  }

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
          <Form className="w-100" onSubmit={isCardForUpdate ? updateCard : sendNewCard}>
            <h1 className="display-4 text-center mb-5">Új kártya hozzáadása</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Szó angolul</Form.Label>
              <Form.Control type="text" placeholder="Szó angolul" name="word" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Forditás</Form.Label>
              <Form.Control type="text" placeholder="Forditás" name="translate" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}