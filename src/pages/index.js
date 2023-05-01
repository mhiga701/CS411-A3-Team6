import React from 'react'
import { createRoot } from 'react-dom/client'
import Gmap from './Gmap'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'

export { default as Login } from './Login';
export { default as Profile } from './Profile';
export { default as Artists } from './artists';
export { default as Playlists } from './playlists';
export { default as Tracks } from './tracks';
export { default as GoogMap } from './Gmap';

const root = createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary fallback={<p>Something went wrong</p>}>
    <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Gmap />
    </ChakraProvider>
  </React.StrictMode>
  </ErrorBoundary>
  
)


