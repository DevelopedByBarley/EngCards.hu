import '../../public/css/Form.css';
import axios from 'axios';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export function Registration() {
  const navigate = useNavigate();
  const [error,setError] = useState('');

  function registration(event) {
    event.preventDefault();

    let newUser = {
      userName: event.target.elements.userName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      limit: event.target.elements.limit.value
    }

    axios.post('/user/register', newUser)
      .then(res => {
        console.log(res.data);
        navigate('/user/login');
      })
      .catch(error => {
        if (error.response || error.response && error.response.status === 409) {
          navigate('/user/registration');
          event.target.elements.userName.value = ''
          event.target.elements.email.value = ''
          event.target.elements.password.value = ''
          event.target.elements.limit.value = ''
        }

        setError("Ezekkel az adatokkal már regisztráltak!");
      });

  }

  return (
    <Form className='mt-5 sub-form p-3' onSubmit={registration}>
      <h1 className='display-5 text-center'>Regisztráció</h1>
      <p className='error text-danger text-center'>{error.length !== 0 ? error : ''}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Felhasználó név</Form.Label>
        <Form.Control type="text" placeholder="Felhasználó név" name='userName' required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email cim</Form.Label>
        <Form.Control type="email" placeholder="Email" name='email' required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Jelszó</Form.Label>
        <Form.Control type="password" placeholder="Jelszó" name='password' required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mennyit tanulnál naponta?</Form.Label>
        <Form.Select name='limit' required>
          <option value="3">Izelitő | 3 szó naponta</option>
          <option value="5">Normál | 5 szó naponta (Ajánlott)</option>
          <option value="10">Komoly | 10 szó naponta</option>
          <option value="15">Eszméletlen | 15 szó naponta</option>
        </Form.Select>
      </Form.Group>

      <div className='text-center'>
        <Button variant="primary" type="submit" className='mt-5'>
          Regisztráció
        </Button>
      </div>

      <div className='text-center mt-5'>
        <Link to="/user/login">
          Van bár fiókod? Bejelentkezés itt!
        </Link>
      </div>
    </Form>
  );
}