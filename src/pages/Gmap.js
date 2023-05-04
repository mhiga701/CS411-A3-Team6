import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Select,
  IconButton,
  Input,
  Text
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { React, useRef, useState } from 'react'
import axios from 'axios'
import { accessToken } from '../spotify'


const google = window.google = window.google ? window.google : {}
const center = {lat: 42.3601, lng: -71.0589};

function App() {
  const {isLoaded} = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places']
  })
  
  const [map, setMap] = useState( /** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)

  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')


/** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();

/** @type React.MutableRefObject<HTMLInputElement> */
  const destRef = useRef();

/** @type React.MutableRefObject<HTMLInputElement> */
  const travRef = useRef();

  if (!isLoaded) {
      return null; //display while loading can change
  }
  var songs;
  async function getDist() {
      if (originRef.current.value === '' || destRef.current.value === '') {
          return
      }
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destRef.current.value,
          travelMode: travRef.current.value    
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.value);

      songs = Math.floor(duration/197); //calculate the number of tracks that should be added using 197 seconds (average song length circa 2020)
  //   const getRecs = (limit= Math.floor(duration / 197)) => {
  //     // return axios.get(`/recommendations?limit=${limit}&market=US&seed_artists=${Ids.ids.id1}%${Ids.ids.id2}%${Ids.ids.id3}%${Ids.ids.id4}%${Ids.ids.id5}`);
  //     return axios.get(`/recommendations?limit=${limit}&market=US&seed_artists=1ybINI1qPiFbwDXamRtwxD`);
  // }
      return songs;
  }
  console.log(songs);
  

function clearFields() {
  setDirectionsResponse(null);
  setDistance('');
  setDuration('');
  originRef.current.value = '';
  destRef.current.value = '';
}

function handler(songs) {
  console.log(songs);
  try {
  const ENDPOINT = `https://api.spotify.com/v1/me/playlists?limit=1`;
  const makePlaylist = async () => {
      const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
              Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
              name: 'Your TripMix!',
              public: 'false',
              collaborative: 'false',
              description: 'A playlist for your upcoming trip!'

          }),
      });

      const resp = await response.json();
      console.log(resp['id'])
      let playlist_id = resp['id'];

      const tracks = axios.get(`/recommendations?limit=${songs}&market=US&seed_artists=1ybINI1qPiFbwDXamRtwxD`);
      console.log(tracks.data);
      

    return axios.post(`/playlists/${playlist_id}/tracks?uris=spotify%3Atrack%3A1OWGLpptXlHLw1yibeHiHa%2Cspotify%3Atrack%3A6efkcs2aUBMFKxl0cl2JWQ`);
  };
  return makePlaylist();
  } catch (error) {
      console.error("Something went wrong while making your playlist.", error);
    
  }
}
  return (
  
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      bgColor='blue.200'
      
      h='100vh'
      w='100vw'
    >

      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/*Box for map */}
          <GoogleMap center={center} zoom={15} mapContainerStyle={{width: '100%', height:'100%'}}  onLoad={map => setMap(map)}>
              {/*Display directions and markers on selected locations */}
             
              <Marker position={center} />
             {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
             )}
          </GoogleMap>
      </Box>
      <Box
        position='absolute' 
        borderRadius='lg'
        m={10}
        bgColor='whitesmoke'
        shadow='base'
        minW='400px'
        zIndex='auto'
        w='50%'
        h='15%'
      >
        <HStack spacing={4}>
          <Autocomplete>
              <Input color={'black'} type='text' placeholder='Origin' ref={originRef}/>
          </Autocomplete>
          
          <Autocomplete>
              <Input color={'black'} type='text' placeholder='Destination' ref={destRef}/>
          </Autocomplete>
          
          <Select id="mode" ref={travRef} color={'black'} w={'30%'}>
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Biking</option>
              <option value="TRANSIT">Public Transport</option>
          </Select>

          <ButtonGroup>
            <Button backgroundColor={'green'} type='submit' onClick={getDist}>
              Send It!
            </Button>
            <IconButton
              backgroundColor={'red'}
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearFields}
            />
          </ButtonGroup>
        </HStack>

        <HStack spacing={8} mt={4} justifyContent='space-between'>
      
            <Box><Text color={'black'} fontSize={18}>Distance: {distance}</Text></Box>
            <Box><Text color={'black'} fontSize={18}>Duration: {Math.floor(duration/60)} minutes</Text></Box> 
         
          
          <Button backgroundColor={'green'} color={'white'} type='submit' onClick={handler}>
              Generate {Math.floor(duration/197)} Song Playlist?
            </Button>
          <IconButton
            backgroundColor={'green'}
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center) }/>
        </HStack>
      </Box>
    </Flex>
  

  )
}

export default App









