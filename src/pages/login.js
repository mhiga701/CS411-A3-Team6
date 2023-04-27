import styled from 'styled-components/macro';

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const Login = () => (
  <StyledLoginContainer>
    <div>
      <h1 class="title page-title">WELCOME TO TRIPMIXER!</h1>
      <p>Generate a personalized playlist that is as long as you want with all your favorite artists. Perfect for trips and timed events.</p>
      <p>Click the button below to get started with TRIPMIXER.</p>
    </div>
    <StyledLoginButton href="http://localhost:3001/login">
      Log in to Spotify
    </StyledLoginButton>
  </StyledLoginContainer>
);

export default Login;