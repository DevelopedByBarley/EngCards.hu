import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import card from '../public/images/card.png';
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { BsPersonVideo } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';


export function Navigation({ user, setUser }) {

  const navigate = useNavigate();

  function logout() {
    if (localStorage.getItem('accessToken') !== null) {
      localStorage.removeItem('accessToken');
      setUser(false);
      navigate('/')
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
        <span><img src={card} style={{ height: "35px", width: "35px" }} /></span> EngCards
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user ? (
              <>
                <Nav.Item className='text-center'>
                </Nav.Item>
                <Nav.Item className='text-center'>
                  <Link to="/user/registration" className="btn border m-1">Regisztráció</Link>
                  <Link to="/user/login" className="btn border m-1">Bejelentkezés</Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Dropdown className='text-center'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    <BsPersonVideo size={20} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profil</Dropdown.Item>
                    <Dropdown.Item href="/dashboard">Irányitópult</Dropdown.Item>
                    <Dropdown.Item href="/dashboard">Kártyák</Dropdown.Item>
                    <Dropdown.Item href="/dashboard">Témák</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Item className='text-center'>
                  <Button className="btn border m-1" onClick={logout}>Kijelentkezés</Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
