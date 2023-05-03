import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
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

  const center = {lat: 42.3601, lng: -71.0589};

  function GoogMap() {
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
        return <SkeletonText />; //display while loading can change
    }
    async function getDist() {
        if (originRef.current.value === '' || destRef.current.value === '') {
            return
        }
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destRef.current.value,
            travelMode: travRef.current.value    
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.value);
    }

function clearFields() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destRef.current.value = '';
}
    return (
      <React.Fragment>
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
          p={4}
          borderRadius='lg'
          m={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='modal'
          w='20%'
          h='15%'
        >
          <HStack spacing={4}>
            <Autocomplete>
                <Input type='text' placeholder='Origin' ref={originRef}/>
            </Autocomplete>
            
            <Autocomplete>
                <Input type='text' placeholder='Destination' ref={destRef}/>
            </Autocomplete>
            
            <select id="mode" ref={travRef}>
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="BICYCLING">Biking</option>
                <option value="TRANSIT">Public Transport</option>
            </select>

            <ButtonGroup>
              <Button colorScheme='green' type='submit' onClick={getDist}>
                Send It!
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={clearFields}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance}</Text>
            <Text>Duration: {duration}</Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => map.panTo(center) }
            
            />
          </HStack>
        </Box>
      </Flex>
      </React.Fragment>
 
    )
  }
  
  export default GoogMap









