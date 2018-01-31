//   /locations/new/${e.lngLat.lng}/${e.lngLat.lat}

function createReview() {
  event.preventDefault();
  $('#review-form').css("left", "50%");
}

function closeForm() {
  event.preventDefault();
  $('#review-form').css("left", "100%");
}
