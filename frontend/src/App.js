import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

import { fetchAuthentication } from './helpers/AuthService';
import { FlashMessage } from './components/alert/FlashMessage'
import { Navigation } from './components/Navigation';
import { Login } from './pages/user/Login';
import { Registration } from './pages/user/Registration';
import { Dashboard } from './pages/dashboard/Dashboard';
import { CardList } from './components/cards/CardList';
import { CardForm } from './pages/cards/CardForm';
import { MainPage } from './pages/MainPage';
import { ThemeNew } from './components/themes/ThemeNew';
import { ThemeUpdate } from './components/themes/ThemeUpdate';
import { CardsForRepeat } from './pages/cards/CardsForReapeat'


function App() {

  const [user, setUser] = useState(false);

  const [flashMessage, setFlashMessage] = useState(
    {
      isFlashActive: false,
      message: "",
      variant: ""
    }
  );

  useEffect(() => {
    if (localStorage.getItem('accessToken') !== null) {
      fetchAuthentication.get('/user/getMe')
        .then(res => {
          setUser(res.data.user)
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
        })
    }
  }, [])

  useEffect(() => {
    if (flashMessage.isFlashActive) {
      const timeout = setTimeout(() => {
        setFlashMessage({
          isFlashActive: false,
          message: "",
          variant: ""
        });
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [flashMessage.isFlashActive]);

  return (
    <>
      <Navigation user={user} setUser={setUser} />
      <Container>
        {flashMessage.isFlashActive ? <FlashMessage message={flashMessage.message} variant={flashMessage.variant} /> : ""}
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/user'>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
          </Route>
          <Route path='/themes'>
            <Route path='new' element={<ThemeNew />} />
            <Route path='update/:themeId' element={<ThemeUpdate />} />
          </Route>
          <Route path='/cards'>
            <Route path='repeat' element={<CardsForRepeat setFlashMessage={setFlashMessage} />} />
            <Route path=':themeId' element={<CardList setFlashMessage={setFlashMessage} />} />
            <Route path='new/:themeId' element={<CardForm setFlashMessage={setFlashMessage} isCardForUpdate={false} />} />
            <Route path='update/:themeId' element={<CardForm setFlashMessage={setFlashMessage} isCardForUpdate={true} />} />
          </Route>
          <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser} />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;

