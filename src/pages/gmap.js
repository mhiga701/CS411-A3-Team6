import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react'
  import { FaLocationArrow, FaTimes } from 'react-icons/fa'
  
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'

  const center = {lat: 42.3601, lng: -71.0589};
  
  //const GOOGLE_MAPS = process.env.GOOGLE_MAPS
  const google = window.google;
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
        const directionsService = new google.maps.DirectionsService();
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
            
            <select id="mode">
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


