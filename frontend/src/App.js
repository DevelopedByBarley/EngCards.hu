import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';

import { fetchAuthentication } from './helpers/AuthService';
import { FlashMessage } from './components/alert/FlashMessage'
import { Navigation } from './components/Navigation';
import { Login } from './pages/user/Login';
import { Registration } from './pages/user/Registration';
import { Dashboard } from './pages/dashboard/Dashboard';
import { CardList } from './pages/cards/CardList';
import { MainPage } from './pages/MainPage';
import { AddTheme } from './components/themes/AddTheme';
import { ThemeUpdate } from './components/themes/ThemeUpdate';
import { CardsForRepeat } from './pages/cards/CardsForReapeat'
import { AddCard } from './pages/cards/AddCard';
import { UpdateCard } from './pages/cards/UpdateCard';
import { Profile } from './pages/profile/Profile';


function App() {

  const [user, setUser] = useState(false);
  const navigate = useNavigate();

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
          navigate('/');
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
          <Route path='/profile' element={<Profile user={user} />}>

          </Route>
          <Route path='/user'>
            <Route path='login' element={<Login setFlashMessage={setFlashMessage} />} />
            <Route path='registration' element={<Registration setFlashMessage={setFlashMessage} />} />
          </Route>
          <Route path='/themes'>
            <Route path='new' element={<AddTheme />} />
            <Route path='update/:themeId' element={<ThemeUpdate />} />
          </Route>
          <Route path='/cards'>
            <Route path='repeat' element={<CardsForRepeat setFlashMessage={setFlashMessage} />} />
            <Route path=':themeId' element={<CardList setFlashMessage={setFlashMessage} />} />
            <Route path='new/:id' element={<AddCard setFlashMessage={setFlashMessage} />} />
            <Route path='update/:id' element={<UpdateCard setFlashMessage={setFlashMessage} />} />
          </Route>
          <Route path='/dashboard' element={<Dashboard user={user} setUser={setUser} />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;

