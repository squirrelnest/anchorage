// $(document).click(function() {
//   console.log("You clicked on me!")
// })

function getPosition() {

  // prevent redirecting
  event.preventDefault();

  // get user's position
  navigator.geolocation.getCurrentPosition(showPosition);

  // add user's position to DOM as form values
  function showPosition(position) {
      document.getElementById("lat").value = position.coords.latitude;
      document.getElementById("lon").value = position.coords.longitude;

      lat = position.coords.latitude;
      lon = position.coords.longitude;
  // reverse geocode coordinates to country
    geocoder = $.get(`/locations/get_country/${lon}/${lat}`);
    geocoder.done(function(data) {

      // autofill form field with country
      console.log("geocoded!");
      if (data.features[0].place_name == null) {
        document.getElementById("country").value = "None";
      } else {
        document.getElementById("country").value = data.features[0].place_name;
      }
    });

  };
};

function getCountry() {

  // get current position
  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {

  // retrieve longitude and latitude from form values
  lon = document.getElementById("lon").value;
  lat = document.getElementById("lat").value;

  // reverse geocode coordinates to country
  if (lon == "" || lat == "") {
    return  // Exit early if only one field has been filled
  }
  geocoder = $.get(`/locations/get_country/${lon}/${lat}`);
    geocoder.done(function(data) {

      // autofill form field with country
      console.log("geocoded!");
      if (data.features[0] == null) {
        document.getElementById("country").value = "None";
      } else {
        document.getElementById("country").value = data.features[0].place_name;
      }
    });

  };
};

function setCurrentLocation() {

  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
      document.cookie = `lat=${position.coords.latitude}`;
      document.cookie = `lon=${position.coords.longitude}`;
  }
}

setCurrentLocation();
