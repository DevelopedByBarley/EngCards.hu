import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { fetchAuthentication } from '../../helpers/AuthService';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




export function AddTheme(props) {
    const navigate = useNavigate();


    function newTheme(event) {
        event.preventDefault();

        let newTheme = {
            title: event.target.elements.title.value,
            color: event.target.elements.color.value
        };

        fetchAuthentication
            .post('/themes/new', newTheme)
            .then((res) => {
                navigate(`/cards/new/${res.data.theme._id}`)
            })
    }



    return (
        <Row>
            <Col>
                <Form onSubmit={newTheme}>
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
                    <Button onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type="submit" >
                        Mentés
                    </Button>
                </Form>
            </Col>
        </Row>
    );
}


