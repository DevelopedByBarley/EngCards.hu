import axios from 'axios';
import { useEffect } from 'react';


function App() {
  const newUser = {
    userName: "asd",
    email: "asd.asd.com",
    limit: 5,
    password: "Csak1enter"
  }

  useEffect(() => {
    axios.post('/user/login', newUser)
    .then(res => console.log(res.data))
  }, [])

  return (
    <></>
  );
}

export default App;
