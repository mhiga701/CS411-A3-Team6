import './App.css';
import { useState, useEffect } from 'react';
import { accessToken, logout } from './server/spotify';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login, Profile, GoogMap } from './pages';

import styled from 'styled-components/macro';
import { GlobalStyle } from './styles';

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
          
                <Routes>
                  <Route path='/' element={<Profile />}></Route>
                  <Route path='/gmap' element={<GoogMap />}></Route>
                  <Route path='/database'></Route>
                </Routes>
                
              </Router>
             

              </>
  )}
     </header>
    </div>
  );
}

export default App;
