import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import card from '../public/images/card.png';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { UserMenu } from './user/UserMenu';
import { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs'


export function Navigation({ user, setUser }) {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <span><img src={card} style={{ height: "35px", width: "35px" }} /></span> EngCards
        </Navbar.Brand>

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
              <Button variant="outline-primary" onClick={handleShow}>
                (<BsPersonCircle size={20} />)
              </Button>
            </>
          )}
        </Nav>

      </Container>
      <UserMenu show={show} handleClose={handleClose} setUser={setUser} user={user} />
    </Navbar >

  );
}
