import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../public/css/Form.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../helpers/AuthService';


export function Login() {
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    let user = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    }

    loginUser(user).then(() => {
      navigate('/dashboard');
    }).catch((error) => {
      navigate('/user/login');
      console.log(error);
    })



  }

  return (
    <Form className='mt-5 sub-form p-3' onSubmit={login}>
      <h1 className='display-5 mb-5 text-center'>Bejelentkezés</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email cim</Form.Label>
        <Form.Control type="email" placeholder="Email" name='email' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Jelszó</Form.Label>
        <Form.Control type="password" placeholder="Jelszó" name='password' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Maradjak bejelentkezve" />
      </Form.Group>
      <div className='text-center'>
        <Button variant="primary" type="submit" className='mt-5' name='remember'>
          Bejelentkezés
        </Button>
      </div>

      <div className='text-center mt-5'>
        <Link to="/user/registration">
          Nincs még fiókod? Regisztrálj itt!
        </Link>
      </div>
    </Form>
  );


}
