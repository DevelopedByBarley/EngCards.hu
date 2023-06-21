import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { fetchAuthentication } from "../../helpers/AuthService";

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AiOutlinePlayCircle } from 'react-icons/ai'
import { Spinner } from "../../components/Spinner";
import { ThemeCard } from "../../components/themes/ThemeCard";

export function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false);


  const [themes, setThemes] = useState([]);
  const [cardsForRepeat, setCardsForRepeat] = useState([])

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


  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <>

          <Row>
            <Col><h1 className="display-5 mt-5 text-center"> Hello {user.userName} </h1></Col>
          </Row>

          <Row className="mt-3 mb-3">
            {cardsForRepeat.length !== 0 ?
              (
                <Col className="text-center">
                  <Link to={"/cards/repeat"}>
                    <AiOutlinePlayCircle size={50} style={{ cursor: "pointer" }} />
                  </Link>
                </Col>
              ) : ""}
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
              <Link to={`/themes/new`}>
                <Button variant="outline-primary">
                  + Téma
                </Button>
              </Link>


            </Col>

          </Row>
        </>

      )
      }
    </>
  );

}