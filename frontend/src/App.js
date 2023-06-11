import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Login } from './pages/user/Login';
import { Registration } from './pages/user/Registration';
import { Dashboard } from './pages/dashboard/Dashboard';
import Container from 'react-bootstrap/esm/Container';
function App() {

  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path='/user'>
            <Route path='login' element={<Login />} />
            <Route path='registration' element={<Registration />} />
          </Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
