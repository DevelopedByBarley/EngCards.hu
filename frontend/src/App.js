import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Login } from './pages/user/Login';
import { Registration } from './pages/user/Registration';
import { Dashboard } from './pages/dashboard/Dashboard';
import Container from 'react-bootstrap/esm/Container';
import { useState } from 'react';
import { CardForm } from './components/cards/CardForm';
import { CardList } from './components/cards/CardList';
function App() {

  const [user, setUser] = useState([]);

  return (
    <>
      <Navigation user={user} />
      <Container>
        <Routes>
          <Route path='/user'>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
          </Route>
          <Route path='/cards'>
            <Route path=':id' element={<CardList />} />
            <Route path='new' element={<CardForm />} />
          </Route>
          <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser} />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;

