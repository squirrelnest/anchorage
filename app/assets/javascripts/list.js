function showLocations(event) {

  event.preventDefault();
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
    // add DOM element for nickname to overlay div
    let heading = `<h2>${data.nickname.toUpperCase()}</h2>`
    $('#overlay').append(heading);
    // add DOM element for each review to overlay div
    data.reviews.forEach(function(review) {
      html = `<div class="review-preview">
      <p class="review-content">"${review.content}"</p>
      <p>Stability rating: ${review.stability}</p>
      <p>Reviewed: ${review.date_visited}</p>
      </div>`;
      $('#overlay').append(html);
    });
    let buttons = `<button onClick="createReview(event)">Add Review</button>`
    $('#overlay').append(buttons);
  });
}

function hideReviews(event) {
  $('#overlay').empty();
  $('#overlay-container').css("background-color", "#212121");
}
