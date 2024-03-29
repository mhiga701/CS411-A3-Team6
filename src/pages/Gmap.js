import { Box, Button, ButtonGroup, Flex, HStack, Select, IconButton, Input, Text } from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'
import { React, useRef, useState } from 'react'
import axios from 'axios'
import { getArtistsIds, makePlaylist, getTracks } from '../server/spotify'
import { Link } from 'react-router-dom'

const google = window.google = window.google ? window.google : {}
const center = {lat: 42.351066015799084, lng: -71.10302128849169}; //map centered at cds

//global variables to be used when calculating units and songs
var convert = 0;
var hours = 0;
var minutes = 0;
var units = [];

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
  //var songs;
  async function getDist() {
      if (originRef.current.value === '' || destRef.current.value === '') {
          return
      }
      //call maps,places,distance matrix api to get route and time and distance from user input
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destRef.current.value,
          travelMode: travRef.current.value    
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.value);

      //mathmetical conversions to hours & minutes, google returns time seconds for some reason 
      if (results.routes[0].legs[0].duration.value / 3600 < 1) {
         minutes = (Math.floor(results.routes[0].legs[0].duration.value/60));
         units.push(hours, minutes);

      } else {
        hours = (Math.floor(results.routes[0].legs[0].duration.value / 3600));
        minutes = (Math.floor(results.routes[0].legs[0].duration.value / 60) % 60);
        units.push(hours, minutes);
      }
     
      /*(calculate rough number of songs to span the durationn of the 
      trip, 197 seconds is average song length according to spotify (2020)*/
      convert = Math.ceil(results.routes[0].legs[0].duration.value/197);
      units.push(convert);
      return units;

    }
//clears all fields upon hitting the red x
function clearFields() {
  setDirectionsResponse(null);
  setDistance('');
  setDuration('');
  originRef.current.value = '';
  destRef.current.value = '';
  units = [];
}

//generates the playlist using imported api calls + calls recommendations api and posts playlist to account
async function genPlaylist() {
  try {
/**Lines 91-101 call functions written in spotify.js to reach various api endpoints */
        const createEmpty = makePlaylist();
        const playlist_id = (await createEmpty);

        const songs = units[2];
      
        const topArtistsIds =  getArtistsIds();
        const artistIdString = await topArtistsIds;

        const topTrackIds = getTracks();
        const trackIdString = await topTrackIds;
      
        
        //make recs more accurate by doing 1 call for top 5 artists and 1 for top 5 songs, max 5 seeds per call 
        const artistRecs = axios.get(`/recommendations?limit=${songs}&market=US&seed_artists=${artistIdString}`);
        const trackRecs = axios.get(`/recommendations?limit=${songs}&market=US&seed_tracks=${trackIdString}`);
        let x = 0;
       //split the recommendations between ones from artist seeds and track seeds 

        let uris1 = [];
        while (x < Math.ceil(songs / 2)) {
          uris1[x] = ((await artistRecs).data.tracks[x].uri).replaceAll(':', '%3A');
          x++;
        }
        let y = 0;
        let uris2 = [];
        while (y < Math.floor(songs / 2)) {
          uris2[y] = ((await trackRecs).data.tracks[y].uri).replaceAll(':', '%3A');
          y++;

        }
        //parsing and manipulating data to be properly formatted in api calls
        uris1 = uris1.join('%2C');
        uris2 = uris2.join('%2C');

        //the uris of all the tracks that will be added using the following post request in line 129
        const uris = uris1 + '%2C' + uris2;

  return axios.post(`playlists/${playlist_id}/tracks?uris=${uris}`);
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
        m={2}
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

        <HStack spacing={20} ml={4} mt={6} justifyContent='start'>
      
          <Box><Text color={'black'} fontSize={16}>Distance: {distance}</Text></Box>
          <Box><Text color={'black'} fontSize={16}>Duration: {units[0]} Hours and {units[1]} minutes</Text></Box> 
         
        </HStack>
      </Box>

      <Link to='/playlist'>
      <Button mt={675} backgroundColor={'green'} color={'white'} type='submit' fontSize={22} onClick={genPlaylist}>
        Generate {convert} Song Playlist!
      </Button>

      </Link>
      <IconButton
              position='absolute'
              justifyContent='center'
              ml={1100}
              mt={350}
              backgroundColor={'green'}
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => map.panTo(center) }/>
    </Flex>
  )
}

export default App









