import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { fetchAuthentication } from '../../helpers/AuthService';


export function ThemeForm(props) {



    function newTheme(event) {
        event.preventDefault();

        let newTheme = {
            title: event.target.elements.title.value,
            color: event.target.elements.color.value
        };

        fetchAuthentication
            .post('/themes/new', newTheme)
            .then((res) => {;
                props.setThemes(currentThemes => [...currentThemes, res.data.theme]);
                props.setModalShow(false)
            })
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Téma hozzáadása
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>

        </Modal>
    );
}


