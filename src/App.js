import './App.css';
import { useEffect, useState } from 'react';
import { accessToken, logout, getProfile } from './spotify';


function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    setToken(accessToken);
    
    const fetchData = async () => {
      try {
        const { data } = await getProfile();
        setProfile(data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();

  }, []);
  return (
    <div className="App">
      <header className="App-header">
        
        {!token ? (
         <a
            className="App-link"
            href="http://localhost:3001/login">Login with Spotify!</a>
        ) : (
          <>
          <h1>Login success!</h1>
          <button onClick={logout}>Log Out</button>

          {profile && (
            <div>
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>
            {profile.images.length && profile.images[0].url &&
              <img src={profile.images[0].url} alt="Avatar"/>
            }
          
          </div>
    )}
    </>
  )}
     </header>
    </div>
  );
}

export default App;
