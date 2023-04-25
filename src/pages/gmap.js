//center map in boston
var myLatLng = {
    lat: 42.3601,
    lng: -71.0589
}
    
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function getDist() {
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelType: google.maps.TravelMode.WALKING,
        unitType: google.maps.UnitSystem.CUSTOMARY
    }
    DirectionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
            const output = document.querySelector('#output');
            output.innerHTML() = 
            "<div class='alert-info'> From: " + 
            document.getElementById('from').value +
            ".<br />To :" +
            document.getElementById('to').value +
            ".<br /> Walking distance: " +
            result.routes[0].legs[0].distance.text +
            ".<br />Duration: " +
            result.routes[0].legs[0].duration.text + ".</div>";

            directionsDisplay.setDirections(result);
        }
        else {
            directionsDisplay.setDirections({ routes: []});
            map.setCenter(myLatLng);
            output.innerHTML() = "<div class='alert-danger'> Could not retrieve walking distance. </div>";
        }
    });
}

//autocomplete for origin field
var field1 = document.getElementById('from');
var auto1 = new google.maps.places.Autocomplete(field1);

//autocomplete for destination field
var field2 = document.getElementById('to');
var auto2 = new google.maps.places.Autocomplete(field2);

