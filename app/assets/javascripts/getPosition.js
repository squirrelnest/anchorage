// $(document).click(function() {
//   console.log("You clicked on me!")
// })

function getPosition() {

  // prevent redirecting
  event.preventDefault();

  // get position
  navigator.geolocation.getCurrentPosition(showPosition);

  // add position to DOM as form values
  function showPosition(position) {
      document.getElementById("lat").value = position.coords.latitude;
      document.getElementById("lon").value = position.coords.longitude;

  // reverse geocode coordinates into countries
  geocoder = $.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json?types=country&access_token=pk.eyJ1IjoiemVya29uaXVtIiwiYSI6ImNqY2NrY281dzAxeXUyeHBnZWo5a2t3YXkifQ.KeqRj11iwks2f6HVBvB3_Q');
    geocoder.done(function(data) {
      console.log("geocoded!");
      document.getElementById("country").value = data.features[0].place_name;
    });

  };
};

function getCountry() {

  // get position
  navigator.geolocation.getCurrentPosition(showPosition);

  // add position to DOM as form values
  function showPosition(position) {

  // reverse geocode coordinates into countries
  lon = document.getElementById("lon").value;
  lat = document.getElementById("lat").value;
  if (lat == "" || lon == "") {
    return  // Exit early if only one field has been filled
  }
  geocoder = $.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + lon + ',' + lat + '.json?types=country&access_token=pk.eyJ1IjoiemVya29uaXVtIiwiYSI6ImNqY2NrY281dzAxeXUyeHBnZWo5a2t3YXkifQ.KeqRj11iwks2f6HVBvB3_Q');
    geocoder.done(function(data) {
      console.log("geocoded!");
      document.getElementById("country").value = data.features[0].place_name;
    });

  };
};

function setCurrentLocation() {

  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
      document.cookie = `lat=${position.coords.latitude}`;
      document.cookie = `lon=${position.coords.longitude}`;
      // session['lat'] = position.coords.latitude;
      // session['lon'] = position.coords.longitude;
  }
}

setCurrentLocation();
