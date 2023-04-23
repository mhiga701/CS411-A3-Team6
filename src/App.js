import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { accessToken, logout } from './spotify';

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(accessToken);

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        
        {!token ? (
          <><img src={logo} className="App-logo" alt="logo" /><><p>
            Welcome to Tripmixer!
          </p><a
            className="App-link"
            href="http://localhost:3001/login">Login with Spotify!</a></></>
        ) : (
          <><h1>Login success!</h1>
          <button onClick={logout()}>Log Out</button></>
        )}
      </header>
    </div>
  );
}

export default App;
