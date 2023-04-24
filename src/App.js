import './App.css';
import { useEffect, useState } from 'react';
import { accessToken, logout, getProfile } from './spotify';
import { errCatch } from './utils';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Artists from './components/artists';
import Tracks from './components/tracks';
import Playlists from './components/playlists';
import Home from './components/home';


function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    setToken(accessToken);
    
    const fetchData = async () => {
        const { data } = await getProfile();
        setProfile(data);
    
    }
    errCatch(fetchData());

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
        {!token ? (
         <a
            className="App-link"
            href="http://localhost:3001/login">Login with Spotify!</a>
        ) : (
          <Router>
            <Routes>
              <Route path='/top-artists'  element={<Artists />}>
              </Route>

              <Route path='/top-tracks' element={<Tracks />}>
              </Route>

              <Route path='/playlists/:id' element={<Playlists />}>
              </Route>
              <Route path='/playlists' element={<Playlists />}>
              </Route>
           <Route path='/' element={<Home />}> 
        </Route>  
      </Routes>
    </Router>
  )}
     </header>
    </div>
  );
}

export default App;
