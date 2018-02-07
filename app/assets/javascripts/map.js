$(document).on('turbolinks:load', function() {
  // Set mapbox token
   $.get('/locations/mapbox_token').done(function(data) {

    mapboxgl.accessToken = data;

    // Create map
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
        center: [-65.017, -16.457], // starting position [lng, lat]
        zoom: 1 // starting zoom
    });

    // Add geolocate control to the map
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    // Center the map on the coordinates of clicked mouse position
    map.on('click', function (e) {
      map.flyTo({
        center: e.lngLat
        // zoom: 3
      });

      // Clear overlay div if you click off a marker
      // TODO: refactor to use best practice: removeClass() and addClass() to change css styles, animate, show/reveal
      $('#overlay').empty();
      $('#overlay-container').css('background-color', '#212121');

      // open a popup at location if an anchorage does not already exist here
        html = `<a href='#' onClick='createReview(event)' data-lon='${e.lngLat.lng}' data-lat='${e.lngLat.lat}'>Create review here?<br />${e.lngLat}</a>`;
        popup = new mapboxgl.Popup(e)
            .setLngLat(e.lngLat)
            .setHTML(html)
            .addTo(map);

      // TODO: when user clicks X button to close popup, form should slide away if it was opened
    });

    // Define points to mark with markers
    const url = '/locations/geojson';
    foo = $.get(url);

    // create a DOM element for each point
    foo.done(function(geojson) {

      geojson.locations.forEach(function(location) {

        var el = document.createElement('div');
        el.className = 'marker';

        // show info overlay when marker gets clicked
        el.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          // clear popups if they exist
          if (typeof popup !== "undefined") {
            popup.remove();
          }
          // window.location.href = '/locations/' + location.id; <--- assigning a URL to window.location.href causes the browser to navigate to that URL
          $('#overlay-container').css("background-color", "#8495a5");
          $.get(`/locations/${location.id}.json`, function(data) {
            $('#overlay').empty();
            // add DOM element for nickname to overlay div
            let heading = `<h2>${data.nickname.toUpperCase()}</h2><div class="add-review"></div>`
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
            let buttons = `<button onClick="addReview(event)"
            data-nickname="${data.nickname}"
            data-country="${data.country}"
            data-lat="${data.lat}"
            data-lon="${data.lon}"
            data-id="${data.id}">
            Add Review
            </button>`
            $('#overlay').append(buttons);
          });
        });

        // add marker element to map
        new mapboxgl.Marker(el)
            .setLngLat(location.geometry.coordinates)
            .addTo(map);
      });

    });

  });

});
