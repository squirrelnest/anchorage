function showLocations(event) {

  event.preventDefault();
  country = event.target.attributes['data-country'].nodeValue;

  // get by_country json
  locations = $.get(`/locations/by_country/${country}`);
  locations.done(function(data) {

    // clear div
    $('.country-list').empty();

    // instantiate a Location object, turn it into HTML, then append it to DOM
    data.locations.forEach(function(location) {
      var loc = new Location(location);
      $(`[id='country-list-${country}']`).append(loc.toHTML());
    });
  });
};

function showReviews(event, location_id) {
  // let location_id = event.target.attributes['data-id'].nodeValue;
  // get json, instantiate Review objects and append them to DOM
  reviewsOverlay(location_id);
}

function hideReviews() {
  $('#overlay').empty();
  $('#overlay-container').css("background-color", "#212121");
}
