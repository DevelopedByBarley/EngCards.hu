import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAuthentication } from '../../helpers/AuthService';

export function ThemeUpdate() {

  const navigate = useNavigate();
  const { themeId } = useParams();

  function updateTheme(event) {
    event.preventDefault();

    let newThemForUpdate = {
      title: event.target.elements.title.value,
      color: event.target.elements.color.value
    };




    fetchAuthentication
      .put(`/themes/${themeId}`, newThemForUpdate)
      .then(() => {
        navigate(`/cards/${themeId}`)
      })

  }


  return (
    <Row>
      <Col className="theme-container d-flex align-items-center justify-content-center flex-column">
        <h1 className="display-4 text-center mb-5">Téma Frissitése</h1>

        <Form className="theme-form" onSubmit={updateTheme}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Név</Form.Label>
            <Form.Control type="text" placeholder="Téma neve" name='title' required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Szín kiválasztása</Form.Label>
            <div className="select-wrapper">
              <Form.Select name="color" required>
                <option selected disabled value={''}>
                  Választ
                </option>
                <option value="hsla(201, 100%, 46%, 1)">Kék</option>
                <option value="hsla(139, 100%, 46%, 1)">Zöld</option>
                <option value="hsla(234, 100%, 54%, 1)">Lila</option>
                <option value="hsla(282, 100%, 49%, 1)">Rózsaszín</option>
                <option value="hsla(349, 100%, 46%, 1)">Piros</option>
              </Form.Select>
              <span className="select-arrow"></span>
            </div>
          </Form.Group>
          <Button variant="primary" type="submit" >
            Mentés
          </Button>
        </Form>
      </Col>
    </Row>
  )
}