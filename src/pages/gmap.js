var mapOptions = {
    center: {lat: 42.3601, lng: -71.0589},
    zoom: 10,

}

map = new google.maps.Map(document.getElementById('gmap'), mapOptions);

const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();

directionsRenderer.setMap(map);


function getDist() {
var request = {
    origin: document.getElementById('from').value,
    destination: document.getElementById('to').value,
    travelType: document.getElementById('mode').value,
    unitType: google.maps.UnitSystem.CUSTOMARY
}
directionsService.route(request, (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
        const output = document.querySelector('output');
        output.innerHTML= 
        "<div class='alert-info'> From: " + 
        document.getElementById('from').value +
        ".<br />To :" +
        document.getElementById('to').value +
        ".<br /> Distance: " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duration: " +
        result.routes[0].legs[0].duration.text + ".</div>";

        directionsRenderer.setDirections(result);
    }
    else {
        directionsRenderer.setDirections({ routes: []});
        map.setCenter(mapOptions.center);
        output.innerHTML = "<div class='alert-danger'> Unable to retrieve distance of your trip. </div>";
    }
});
}

var field1 = document.getElementById('from');
var auto1 = new google.maps.places.Autocomplete(field1);

//autocomplete for destination field
var field2 = document.getElementById('to');
var auto2 = new google.maps.places.Autocomplete(field2);

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


