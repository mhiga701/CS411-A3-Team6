import React from 'react'
import ReactDOM from 'react-dom'
import Gmap from './Gmap'
import { ChakraProvider, theme } from '@chakra-ui/react'

export { default as Login } from './Login';
export { default as Profile } from './Profile';
export { default as Artists } from './artists';
export { default as Playlists } from './playlists';
export { default as Tracks } from './tracks';
export { default as GoogMap } from './Gmap';



ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Gmap />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


