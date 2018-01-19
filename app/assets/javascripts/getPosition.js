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
