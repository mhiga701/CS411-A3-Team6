import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Tripmixer!
        </p>
        <a
          className="App-link"
          href="http://localhost:3001/login"
          rel="noopener noreferrer"
        >
          Login with Spotify!
        </a>
      </header>
    </div>
  );
}

export default App;
