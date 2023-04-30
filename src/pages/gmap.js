import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
  import { useState } from 'react'
  const center = {lat: 42.3601, lng: -71.0589};
  //const GOOGLE_MAPS = process.env.GOOGLE_MAPS
  function GoogMap() {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    })

    const [map, setCenter] = useState( /** @type google.maps.Map */ (null));

    if (!isLoaded) {
        return   //display while loading can change
    }
    return (
        
      <Flex
        position='relative'
        flexDirection='column'
        alignItems='center'
        bgColor='blue.200'
        // bgImage='https://images.unsplash.com/photo-1647117181799-0ac3e50a548a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        bgPos='bottom'
        h='100vh'
        w='100vw'
      >
        <Box position='absolute' left={0} top={0} h='100%' w='100%'></Box>
            {/*Box for map */}
            <GoogleMap center={center} zoom={12} mapContainerStyle={{width: '100%', height:'100%'}}>
                {/*Display directions and markers on selected locations */}
                <Marker position={center} />
                onLoad = {(map => setCenter(map))}
            </GoogleMap>
        <Box
          p={4}
          borderRadius='lg'
          mt={4}
          bgColor='white'
          shadow='base'
          minW='container.md'
          zIndex='modal'
        >
          <HStack spacing={4}>
            <Input type='text' placeholder='Origin' />
            <Input type='text' placeholder='Destination' />
            <ButtonGroup>
              <Button colorScheme='pink' type='submit'>
                Send It!
              </Button>
              <IconButton
                aria-label='center back'
                icon={<FaTimes />}
                onClick={() => alert(123)}
              />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: </Text>
            <Text>Duration: </Text>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => map.panTo(center)}
            />
          </HStack>
        </Box>
      </Flex>
    )
  }
  
  export default GoogMap
























// //set center of map to boston
// var mapOptions = {
//     center: {lat: 42.3601, lng: -71.0589},
//     zoom: 12,

// }
// //init new map object
// map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

// const directionsService = new google.maps.DirectionsService();
// const directionsRenderer = new google.maps.DirectionsRenderer();

// directionsRenderer.setMap(map);

// //calculates the distance between too endpoints
// function getDist() {
// var request = {
//     origin: document.getElementById('from').value,
//     destination: document.getElementById('to').value,
//     travelType: document.getElementById('mode').value,
//     unitSystem: google.maps.UnitSystem.IMPERIAL
// }
// directionsService.route(request, (result, status) => {
//     if (status === google.maps.DirectionsStatus.OK) {
//         const output = document.querySelector('output');
//         output.innerHTML= 
//         "<div class='alert-info'> From: " + 
//         document.getElementById('from').value +
//         ".<br />To :" +
//         document.getElementById('to').value +
//         ".<br /> Distance: " +
//         result.routes[0].legs[0].distance.text +
//         ".<br />Duration: " +
//         result.routes[0].legs[0].duration.text + ".</div>";

//         directionsRenderer.setDirections(result);
//     }
//     else {
//         directionsRenderer.setDirections({ routes: []});
//         map.setCenter(mapOptions.center);
//         output.innerHTML = "<div class='alert-danger'> Unable to retrieve distance of your trip. </div>";
//     }
// });
// }

// //autocomplete for origin field
// var field1 = document.getElementById('from');
// var auto1 = new google.maps.places.Autocomplete(field1);

// //autocomplete for destination field
// var field2 = document.getElementById('to');
// var auto2 = new google.maps.places.Autocomplete(field2);

// function initMap() {
    
//     const directionsRenderer = new google.maps.DirectionsRenderer();
//     const directionsService = new google.maps.DirectionsService();
//     const map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
//     directionsRenderer.setMap(map);

//     getDist(directionsRenderer, directionsService);
//     document.getElementById('mode').addEventListener("change", () => {
//         getDist(directionsRenderer, directionsService);
//     });
// }



// function getDist(directionsRenderer, directionsService) {
//     const selectedMode = document.getElementById('mode').value;

//     directionsService.route ({
//         origin: document.getElementById('from').value,
//         destination: document.getElementById('to').value,

//         travelType: google.maps.TravelMode[selectedMode],
//     })
//     .then((response) => {
//         directionsRenderer.setDirections(response);
//     })
//     .catch((e) => window.alert("Direction request failed due to " + window.status));




// function autoComp() {//autocomplete for origin field

// }


