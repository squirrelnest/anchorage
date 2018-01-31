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
      html = `<div id='review' data-id='${location.id}' onmouseover='showReviews(event)' onmouseout='hideReviews(event)'><strong><a href='/locations/${location.id}' data-id='${location.id}'>${location.nickname}</a></strong> ${location.lat}, ${location.lon} <br /></div>`;
      $(`[id='country-list-${country}']`).append(html);
    });
  });
};

function showReviews(event) {
  let location_id = event.target.attributes['data-id'].nodeValue;
  $.get(`/locations/${location_id}.json`, function(data) {
    console.log(data);
    $('#overlay').html(JSON.stringify(data));
  });
}

function hideReviews(event) {
  $('#overlay').empty();
}
