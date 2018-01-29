$(document).ready(function() {
  // Set mapbox token
  mapboxgl.accessToken = 'pk.eyJ1IjoiemVya29uaXVtIiwiYSI6ImNqY2NrY281dzAxeXUyeHBnZWo5a2t3YXkifQ.KeqRj11iwks2f6HVBvB3_Q';

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
  map.on('mousemove', function (e) {
    document.getElementById('info').innerHTML =
      // e.point is the x, y coordinates of the mousemove event relative
      // to the top-left corner of the map
      JSON.stringify(e.point) + '<br />' +
      // e.lngLat is the longitude, latitude geographical position of the event
      JSON.stringify(e.lngLat);
  });

  // Define points to mark with markers
  // const url = 'https://api.mapbox.com/datasets/v1/zerkonium/cjcv56iq008bh2yo5f7ar1m5a/features?access_token=pk.eyJ1IjoiemVya29uaXVtIiwiYSI6ImNqY2NrY281dzAxeXUyeHBnZWo5a2t3YXkifQ.KeqRj11iwks2f6HVBvB3_Q';
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
        window.location.href = 'http://localhost:3000/locations/' + location.id;
      });

      // add marker element to map
      new mapboxgl.Marker(el)
          .setLngLat(location.geometry.coordinates)
          .addTo(map);
    });

  });

});
