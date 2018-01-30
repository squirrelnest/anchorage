function showLocations(event) {

  event.preventDefault();
  event.stopPropagation();
  country = event.target.attributes['data-country'].nodeValue;
  locations = $.get(`/locations/by_country/${country}`);

  locations.done(function(data) {
    console.log(data);
    $('.country-list').empty();
    data.locations.forEach(function(location) {
      html = `<strong><a href='/locations/${location.id}'>${location.nickname}</a></strong> ${location.lat}, ${location.lon} <br />`;
      console.log($(`#country-list-${country}`))
      $(`[id='country-list-${country}']`).append(html);
    });
  });
};
