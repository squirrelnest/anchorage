function showLocations(event) {

  event.preventDefault();
  event.stopPropagation();
  country = event.target.attributes['data-country'].nodeValue;
  locations = $.get(`/locations/by_country/${country}`);

  locations.done(function(data) {
    console.log(data);
    $('.country-list').empty();
    data.locations.forEach(function(location) {
      // location = new Location(locationData);
      // html = location.toHtml();
      html = `<div id='review' data-id='${location.id}' onmouseover='showReviews(event)' onmouseout='hideReviews(event)'><p><strong><a href='/locations/${location.id}' data-id='${location.id}'>${location.nickname}</a></strong><br /> ${location.lat}, ${location.lon} </p></div>`;
      $(`[id='country-list-${country}']`).append(html);
    });
  });
};

function showReviews(event) {
  let location_id = event.target.attributes['data-id'].nodeValue;
  $('#overlay-container').css("background-color", "#8495a5");
  $.get(`/locations/${location_id}.json`, function(data) {
    console.log(data)
    data.reviews.forEach(function(review) {
      html = `<div class="review-preview row"><p class="review-content">"${review.content}"</p><p>Stability rating: ${review.stability}</p><p>Reviewed: ${review.date_visited}</p></div>`;
      $('#overlay').append(html);
    });
  });
}

function hideReviews(event) {
  $('#overlay').empty();
  $('#overlay-container').css("background-color", "#212121");
}
