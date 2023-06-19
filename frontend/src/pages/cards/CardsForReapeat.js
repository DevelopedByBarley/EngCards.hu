import React, { useEffect, useState } from "react";
import { fetchAuthentication } from "../../helpers/AuthService";
import { useNavigate } from "react-router-dom";
import { Spinner } from '../../components/Spinner';
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Form } from "react-bootstrap";

export function CardsForRepeat({ setFlashMessage }) {
  const navigate = useNavigate();

  const [cardsForRepeat, setCardsForRepeat] = useState([]);
  const [isPending, setPending] = useState(false);
  const [cardStep, setCardStep] = useState(0);


  useEffect(() => {
    setPending(true);
    fetchAuthentication
      .get('/cards')
      .then(res => {
        setCardsForRepeat(res.data.cardsForRepeat);
      })
      .catch(() => {
        navigate('/user/login');
      })
      .finally(() => {
        setTimeout(() => {
          setPending(false);
        }, 100);
      });
  }, []);


  function compareCard(event) {
    event.preventDefault();
    const id = event.target.dataset.id;
    const cardForCompare = {
      word: event.target.elements.word.value
    }
    fetchAuthentication.post(`/cards/compare/${id}`, cardForCompare)
      .then(res => {
        if (res.data.isSuccess) {
          setFlashMessage({
            isFlashActive: true,
            message: res.data.message,
            variant: res.data.variant
          })

          setTimeout(() => {
            setCardStep(prevStep => prevStep + 1);
          }, 2000)
        }
      })

    event.target.elements.word.value = '';

  }

  
  console.log(cardsForRepeat[cardStep]?.imageName);

  return (
    <>
      {isPending ? (<Spinner />) : (
        <>
          {cardsForRepeat.length > cardStep ? (
            <Row id="cards-for-repeat">
              <Col xs={12}>
                <ListGroup className="mt-3">
                  {cardsForRepeat.map((card, index) => (
                    <ListGroupItem key={index} className={cardStep === index ? 'active' : ''}>{card.translate}</ListGroupItem>
                  ))}
                </ListGroup>
              </Col>
              <Col xs={12} className="mt-5 d-flex align-items-center justify-content-center">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" className="p-2" src={cardsForRepeat[cardStep]?.imageName ? `/images/${cardsForRepeat[cardStep]?.imageName}` : "https://fakeimg.pl/300/"} style={{ width: "50%", margin: "0 auto" }} />
                  <Card.Body>
                    <Card.Title className="mt-2">{cardsForRepeat[cardStep]?.translate}</Card.Title>
                    <Card.Text>
                      {cardsForRepeat[cardStep]?.sentence}
                    </Card.Text>
                    <Form onSubmit={compareCard} data-id={`${cardsForRepeat[cardStep]?._id}`}>
                      <Form.Control type="text" placeholder="Angol szó" name="word" required  autocomplete="off" />
                      <Button type="submit" className="mt-4" variant="primary">Go somewhere</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <h1>Nincs több kártyád mára!</h1>
          )}
        </>
      )}
    </>
  );
}
