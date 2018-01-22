// $(document).click(function() {
//   console.log("You clicked on me!")
// })

function getPosition() {

  event.preventDefault()
  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
      document.getElementById("lat").value = position.coords.latitude;
      document.getElementById("lon").value = position.coords.longitude;
  }
}

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
