import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { fetchAuthentication } from "../../helpers/AuthService";
import { Spinner } from "../../components/Spinner";
import flash from '../../public/images/flash.png'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Dashboard() {
  const [user, setUser] = useState([]);
  const [themes, setThemes] = useState([]);
  const [isPending, setPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPending(true);
    fetchAuthentication
      .get('/themes')
      .then(res => {
        setUser(res.data.user);
        setThemes(res.data.themes.reverse());
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
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
            <Col><h1 className="display-2 mt-5 text-center"> Hello {user.userName} </h1></Col>
          </Row>
          <Row className="p-3">
            {themes.map((theme) => {
              return (
                <Col xs={12} md={6} lg={3} 
                style={{ background: `${theme.color}`, minHeight: "200px" }}
                className="mt-1 text-center border text-light rounded rounded-lg p-4 d-flex  align-items-center justify-content-center flex-column"
                >
                  <h5>{theme.title}</h5>
                  <div className="mt-5">
                    <img src={flash} style={{ height: "30px", width: "30px", }} />
                    <span><strong>
                        {theme.cards.length}
                    </strong></span>
                  </div>
                </Col>

              );
            })}

          </Row>
        </>

      )
      }
    </>
  );

}