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

    // Get coordinates at mouse position
    // map.on('mousemove', function (e) {
    //   document.getElementById('info').innerHTML =
    //     // e.point is the x, y coordinates of the mousemove event relative
    //     // to the top-left corner of the map
    //     JSON.stringify(e.point) + '<br />' +
    //     // e.lngLat is the longitude, latitude geographical position of the event
    //     JSON.stringify(e.lngLat);
    // });

    // Center the map on the coordinates of clicked mouse position
    map.on('click', function (e) {
      map.flyTo({
        center: e.lngLat,
        zoom: 3
      });

      // open a popup at location
      html = `<a href='/locations/new/${e.lngLat.lng}/${e.lngLat.lat}'>Create review here?<br />${e.lngLat}</a>`;
      new mapboxgl.Popup(e)
          .setLngLat(e.lngLat)
          .setHTML(html)
          .addTo(map);
    });

    // Define points to mark with markers
    const url = '/locations/geojson';
    foo = $.get(url);

    // create a DOM element for each point
    foo.done(function(geojson) {

      geojson.locations.forEach(function(location) {

        var el = document.createElement('div');
        el.className = 'marker';
        rand = Math.floor(Math.random() * 20);
        el.style.backgroundImage = 'url(https://placekitten.com/g/' + (rand + 40) + '/' + (rand + 40) + ')';
        el.style.width = '51px'; //location.properties.iconSize[0] + 'px';
        el.style.height = '51px'; //location.properties.iconSize[1] + 'px';

        el.addEventListener('click', function() {
          window.location.href = '/locations/' + location.id;
        });

        // add marker element to map
        new mapboxgl.Marker(el)
            .setLngLat(location.geometry.coordinates)
            .addTo(map);
      });

    });

  });

});
