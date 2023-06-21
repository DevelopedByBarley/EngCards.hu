import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchAuthentication } from '../../helpers/AuthService';
import { Spinner } from '../../components/Spinner';
import { Container, Row, Col, Table, Button, ButtonGroup, ToggleButton, } from 'react-bootstrap';
import { DeleteThemeModal } from '../../components/themes/DeleteThemeModal';
import { CardsIsLearned } from '../../components/cards/CardsIsLearned';
import { CardsForLearnTable } from '../../components/cards/CardsForLearnTable';


export function CardList({ setFlashMessage }) {
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);


  const [showThemeModal, setShowThemeModal] = useState(false);
  const handleThemeClose = () => setShowThemeModal(false);
  const handleThemeShow = () => setShowThemeModal(true);

  const [checked, setChecked] = useState(1);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Tanulandó szavak', value: '1' },
    { name: 'Megtanult szavak', value: '2' },
  ];



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
              <ButtonGroup aria-label="Basic example">
                <Link to={`/themes/update/${themeId}`}>
                  <Button variant="outline-secondary" className='m-1 rounded-0'>Szerkesztés</Button>
                </Link>
                <Button variant="outline-primary" className='m-1 rounded-0' style={{ marginLeft: ".5rem" }} themeId={themeId} onClick={() => {
                  handleThemeShow();
                }}>
                  Törlés
                </Button>
                <DeleteThemeModal showThemeModal={showThemeModal} handleThemeClose={handleThemeClose} themeId={themeId}/>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col className='text-center'>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant="outline-primary"
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                      setRadioValue(e.currentTarget.value);
                      setChecked(e.currentTarget.value)
                    }}

                    className='m-1'
                  >
                    {radio.name}
                  </ToggleButton>
                ))}

              </ButtonGroup>
            </Col>
          </Row>
          <Row>
            <Col className='mt-5 mb-5'>
              {console.log(checked)}
              {parseInt(checked) === 1 ? (
                <CardsForLearnTable cards={cards} setCards={setCards} />
              ) : (
                <CardsIsLearned cards={cards} setCards={setCards} />
              )}

            </Col>
          </Row>

        </Container >
      )
      }
    </>
  );
}
