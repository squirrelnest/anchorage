function showLocations(event) {

  event.preventDefault();
  country = event.target.attributes['data-country'].nodeValue;

  // get by_country json
  locations = $.get(`/locations/by_country/${country}`);
  locations.done(function(data) {

    // clear div
    $('.country-list').empty();

    // add DOM element for each review to country-list div
    data.locations.forEach(function(location) {

      // instantiate a Location object, turn it into HTML, then append it to DOM
      var loc = new Location(location);
      $(`[id='country-list-${country}']`).append(loc.toHTML());
    });
  });
};

function showReviews(event) {

  let location_id = event.target.attributes['data-id'].nodeValue;
  $('#overlay-container').css("background-color", "#8495a5");

  // get json, instantiate Review objects and append them to DOM
  reviewsOverlay(location_id);
}

function hideReviews() {
  $('#overlay').empty();
  $('#overlay-container').css("background-color", "#212121");
}

$("#toggle-review-form").on('click', function() {
  $("#overlay").toggle();
});
