import styled from 'styled-components/macro';
import { HStack } from '@chakra-ui/react';

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

const Playlist = () => (
  <StyledLoginContainer>
    <div>
      <br></br>
      <br></br>
      <br></br>
      <h1><strong><font size="+7">THANKS FOR USING TRIPMIXER!</font></strong></h1>
      <br></br>
      <p>
        Your playlist has been created. Our accuracy is not perfect, so we're sorry if your playlist is a little short.
      </p> 
      <p>
      Thank you again! Hopefully you'll like at least a few of these songs, and most importantly, enjoy your TRIP!
      </p> 
      <p>
        Check out your brand new TripMix on your Spotify account! If you don't see it right away, just sort by 'Recents'.
      </p>
      <br></br>
      <br></br>
      <p><small>Or, you can head back to your profile to mix another trip.</small></p>
      <br></br>
      <br></br>
    </div>
    <HStack>
    <StyledLoginButton target='_blank' href="https://open.spotify.com/?">
      Go to your Spotify
    </StyledLoginButton>
    <StyledLoginButton href="/">
      Mix another Trip!
    </StyledLoginButton>
    </HStack>
  </StyledLoginContainer>
);

export default Playlist