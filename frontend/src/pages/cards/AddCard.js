import { useNavigate, useParams } from "react-router-dom";
import { fetchAuthentication } from "../../helpers/AuthService";

import { Form } from "react-bootstrap";
import { Button, Col, Container, Row } from "react-bootstrap";

export function AddCard({ setFlashMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const sendNewCard = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("word", event.target.elements.word.value);
    formData.append("translate", event.target.elements.translate.value);
    formData.append("sentence", event.target.elements.sentence.value);
    formData.append("image", event.target.elements.image.files[0]);



    fetchAuthentication.post(`/cards/new/${id}`, formData)
      .then(res => {
        navigate(`/cards/${id}`);
        setFlashMessage({
          isFlashActive: true,
          message: res.data.message,
          variant: "info"
        })
      })
      .catch((err) => {
        console.log(err);
        setFlashMessage({
          isFlashActive: true,
          message: err.response.data.errorMessage,
          variant: "danger"
        })
        navigate(`/cards/${id}`);
      })
      .finally(() => {
        setTimeout(() => {
          setFlashMessage({
            isFlashActive: false,
            message: "",
            variant: ""
          })
        }, 2500)
      });
  };





  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
          <Form className="w-100" onSubmit={sendNewCard} >
            <h1 className="display-4 text-center mb-5">Kártya hozzáadása</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Szó angolul</Form.Label>
              <Form.Control type="text" placeholder="Szó angolul" name="word" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Forditás</Form.Label>
              <Form.Control type="text" placeholder="Forditás" name="translate" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Példa mondat</Form.Label>
              <Form.Control type="text" placeholder="Példa mondat" name="sentence"/>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Fényképes illusztráció</Form.Label>
              <Form.Control type="file" name="image" />
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