import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchAuthentication } from '../../helpers/AuthService';
import { Spinner } from '../Spinner';
import { Container, Row, Col, Table, Button, ButtonGroup } from 'react-bootstrap';

export function CardList({ setFlashMessage }) {
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const { themeId } = useParams();

  const [cards, setCards] = useState([]);
  const [theme, setTheme] = useState('');





  useEffect(() => {
    setPending(true);
    fetchAuthentication
      .get(`/cards/${themeId}`)
      .then(res => {
        setCards(res.data.cards);
      })
      .catch((err) => {
        navigate('/user/login');
        setFlashMessage({
          isFlashActive: true,
          message: err.response.data.errorMessage,
          variant: "danger"
        })
      })
      .finally(() => {
        setTimeout(() => {
          setPending(false);
        }, 100);
        setTimeout(() => {
          setFlashMessage({
            isFlashActive: false,
            message: "",
            variant: ""
          })
        }, 2500)
      });


    fetchAuthentication.get(`/themes/${themeId}`)
      .then(res => setTheme(res.data.theme))
  }, []);


  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <Container className="mt-5">
          <Row className='mb-5'>
            <Col className='border p-3'>
              <span>Téma: <h3>{theme.title}</h3></span>
              <Button variant="outline-primary">Téma törlése</Button>{' '}
              <Link to={`/themes/update/${themeId}`}>
                <Button variant="outline-secondary">Téma szerkesztése</Button>{' '}
              </Link>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Szó</th>
                <th>Forditás</th>
                <th>Hozzáadva</th>
                <th>Lejárat</th>
                <th>Müveletek</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{card.word}</td>
                  <td>{card.translate}</td>
                  <td>{new Date(card.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(card.expiresIn).toLocaleDateString()}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Link to={`/cards/update/${card._id}`}>
                        <Button style={{ marginRight: ".5rem" }} variant='outline-warning'>Szerkesztés</Button>
                      </Link>
                      <Button style={{ marginLeft: ".5rem" }} variant='outline-danger'>Törlés</Button>
                    </ButtonGroup>
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col xs={12}>
              <Link className="btn btn-primary" to={`/cards/new/${themeId}`}>
                Új szó hozzáadása
              </Link>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
