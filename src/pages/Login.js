import styled from 'styled-components/macro';

const StyledLoginContainer = styled.main`
  display: flex;
  padding: 150px;
  padding-top: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  background-image: linear-gradient(black, white);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-md);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Login = () => (
  <StyledLoginContainer>
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="title page-title">WELCOME TO</h1>
      <h1><strong><font size="+7">TRIPMIXER</font></strong></h1>
      <br></br>
      <p>
        TRIPMIXER is a playlist generator that creates unique Spotify playlists personalized to your travel needs and music taste. 
      </p> 
      <p>
        You can enter your map details for a perfectly timed playlist with all your favorite artists.
      </p> 
      <p>
        Good music until you reach your destination. Perfect for any kind of trip.
      </p>
      <br></br>
      <br></br>
      <p><small>Click the button below to get started with TRIPMIXER.</small></p>
      <br></br>
      <br></br>
    </div>
    <StyledLoginButton href="http://localhost:3001/login">
      Log in to Spotify
    </StyledLoginButton>
  </StyledLoginContainer>
);



export default Login;
