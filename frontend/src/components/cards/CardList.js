import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchAuthentication } from '../../helpers/AuthService';

export function CardList() {
    const navigate = useNavigate();
    const [isPending, setPending] = useState(false);
    const [cards, setCards] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        setPending(true);
        fetchAuthentication
            .get(`/cards/${id}`)
            .then(res => {
                setCards(res.data.cards);
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

    return (
        <>
            <Container className="mt-5">
                <Row>
                    {cards.length === 0 ? (
                        <Col>
                            <h1 className="display-3 text-center">Jelenleg még nincs egyetlen szókártyád sem!</h1>
                            <div className="text-center mt-4">
                                <Button> Hozzáadás </Button>
                            </div>
                        </Col>
                    ) : (
                        <Col>
                            {cards.map((card) => {

                                return (
                                    <h1>{card.word}</h1> 
                               )

                            })}
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}
