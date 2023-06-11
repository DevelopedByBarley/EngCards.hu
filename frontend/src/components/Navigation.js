import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import card from '../public/images/card.png';
import { Link } from 'react-router-dom';


export function Navigation() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          EngCards <span><img src={card} style={{ height: "35px", width: "35px" }} /></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Item className='text-center'>
              <Link to="/user/registration" className="btn border m-1">Regisztráció</Link>
              <Link to="/user/login" className="btn border m-1">Bejelentkezés</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
