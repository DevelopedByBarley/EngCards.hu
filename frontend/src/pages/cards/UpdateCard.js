import { useNavigate, useParams } from "react-router-dom";
import { fetchAuthentication } from "../../helpers/AuthService";

import { Form } from "react-bootstrap";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export function UpdateCard({ setFlashMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardForUpdate, setCardForUpdate] = useState('');

  console.log(id);
  useEffect(() => {
    fetchAuthentication.get(`/cards/single/${id}`)
    .then(res => setCardForUpdate(res.data.card));
  }, [])
  
  const updateCard = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("word", event.target.elements.word.value);
    formData.append("translate", event.target.elements.translate.value);
    formData.append("sentence", event.target.elements.sentence.value);
    formData.append("image", event.target.elements.image.files[0]);



    fetchAuthentication.post(`/cards/update/${id}`, formData)
      .then(res => {
        navigate(`/cards/${res.data.updateCard.themeRefId}`);
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
          <Form className="w-100" onSubmit={updateCard} >
            <h1 className="display-4 text-center mb-5">Kártya szerkesztése</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Szó angolul</Form.Label>
              <Form.Control type="text" placeholder="Szó angolul" name="word" defaultValue={cardForUpdate.word}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Forditás</Form.Label>
              <Form.Control type="text" placeholder="Forditás" name="translate" defaultValue={cardForUpdate.translate}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Példa mondat</Form.Label>
              <Form.Control type="text" placeholder="Példa mondat" name="sentence" defaultValue={cardForUpdate.sentence}/>
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