import './App.css';
import { useEffect, useState } from 'react';
import { accessToken, logout } from './spotify';

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"
import { Login, Profile, Artists, Tracks, Playlists } from './components';

import styled from 'styled-components/macro';
import GlobalStyle from './styles/GlobalStyle';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;


function App() {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
  setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        
        {!token ? (
        <Login/>
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
          <Router>
            <backToTop />
                <Routes>
                  <Route path='/top-artists' element={<Artists />}>
                  </Route>

                  <Route path='/top-tracks' element={<Tracks />}>
                  </Route>

                  <Route path='/playlists/:id' element={<Playlists />}>
                  </Route>
                  <Route path='/playlists' element={<Playlists />}>
                  </Route>
                  <Route path='/' element={<Profile />}></Route>
                </Routes>
                
              </Router>
             

              </>
  )}
     </header>
    </div>
  );
}

export default App;
