import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAuthentication } from "../../helpers/AuthService";
import { Spinner } from "../../components/Spinner";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThemeForm } from "../../components/themes/ThemeForm";
import { ThemeCard } from "../../components/themes/ThemeCard";

export function Dashboard({ user, setUser }) {
  const [themes, setThemes] = useState([]);
  const [isPending, setPending] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [cardsForRepeat, setCardsForRepeat] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setPending(true);
    fetchAuthentication
      .get('/themes')
      .then(res => {
        setUser(res.data.user);
        setThemes(res.data.themes);
      })
      .catch(() => {
        navigate('/user/login');
      })
      .finally(() => {
        setTimeout(() => {
          setPending(false)
        }, 100)
      });

      fetchAuthentication
      .get('/cards')
      .then(res => {
        setCardsForRepeat(res.data.cardsForRepeat)
      })
      .catch(() => {
        navigate('/user/login');
      })
      .finally(() => {
        setTimeout(() => {
          setPending(false)
        }, 100)
      });
  }, [])

  console.log(cardsForRepeat);

  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>
          <Row>
            <Col><h1 className="display-2 mt-5 text-center"> Hello {user.userName} </h1></Col>
          </Row>
          <Row className="p-3">
            {themes?.map((theme) => {
              return (
                <ThemeCard theme={theme} />
              );
            })}

          </Row>
          <Row>
            <Col className="text-center">
              <Button variant="primary" onClick={() => setModalShow(true)}>
                + Téma
              </Button>

              <ThemeForm
                themes={themes}
                setThemes={setThemes}
                setModalShow={setModalShow}
                show={modalShow}
                onHide={() => setModalShow(false)}
              />

            </Col>

          </Row>
        </>

      )
      }
    </>
  );

}