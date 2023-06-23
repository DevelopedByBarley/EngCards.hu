import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function UserMenu({ show, handleClose, setUser, user }) {
  const navigate = useNavigate();


  function logout() {
    if (localStorage.getItem('accessToken') !== null) {
      localStorage.removeItem('accessToken');
      setUser(false);
      navigate('/')
    }
  }

  return (
    <>


      <Offcanvas show={show} onHide={handleClose} placement={'end'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1 className="display-6">{user.userName}</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex  flex-column">
          <ListGroup className="w-100 mb-3">
            <ListGroup.Item> <Link to="/profile" onClick={handleClose}>Profil</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/dashboard" onClick={handleClose}>Irányitópult</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/dashboard" onClick={handleClose}>Kártyák</Link></ListGroup.Item>
            <ListGroup.Item><Link to="/dashboard" onClick={handleClose}>Témák</Link></ListGroup.Item>
          </ListGroup>
          <Button className="btn m-1 rounded-0" variant="outline-danger" onClick={()  => {
            logout();
            handleClose();
          }}>Kijelentkezés</Button>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
}
