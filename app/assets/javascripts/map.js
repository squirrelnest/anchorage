$(document).on('turbolinks:load', function() {
  // Set mapbox token
   $.get('/locations/mapbox_token').done(function(data) {

    mapboxgl.accessToken = data;

    // Create map
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/satellite-v9', // stylesheet location
        center: [14, 47], // starting position [lng, lat]
        zoom: .5 // starting zoom
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

    // Define points to mark
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
          // close list
          $('.review').each(function() { this.remove() });

          // get json, instantiate Review objects and append them to DOM
          reviewsOverlay(location.id);

          // window.location.href = '/locations/' + location.id; <--- assigning a URL to window.location.href causes the browser to navigate to that URL
        });

        // add marker element to map
        new mapboxgl.Marker(el)
            .setLngLat(location.geometry.coordinates)
            .addTo(map);
      });

    });

  });

});
