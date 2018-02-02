// Create new location and review
function createReview(event) {
  event.preventDefault();

  // prefill form fields
  if (event.target.attributes['data-lat'] !== undefined) {
    $('#lat').val(event.target.attributes['data-lat'].nodeValue);
    $('#lon').val(event.target.attributes['data-lon'].nodeValue);
  }

  // slide out form
  $('#review-form').css("left", "50%");
}

// Add review to existing anchorage
function addReview(event) {
  event.preventDefault();
  event.stopPropagation();

  let location_id = event.target.attributes['data-id'].nodeValue;
  // prefill form fields
  if (event.target.attributes['data-lat'] !== undefined) {
    $('#lat').val(event.target.attributes['data-lat'].nodeValue);
    $('#lon').val(event.target.attributes['data-lon'].nodeValue);
    $('#nickname').val(event.target.attributes['data-nickname'].nodeValue);
    $('#country').val(event.target.attributes['data-country'].nodeValue);
  }

  // Attach data attribute to Submit button
  $('input[type="submit"]').attr('data-id', `${location_id}`);
  $('#new_location').attr('action', `/locations/${location_id}/reviews`)

  // slide out form
  $('#review-form').css("left", "50%");

}

// Close form
function closeForm() {
  event.preventDefault();
  $('#review-form').css("left", "100%");
}

// Submit form
$(document).ready(function() {
  $(function () {
    $('form').submit(function(event) { // might break other forms, change to #review-form
      event.preventDefault();
      closeForm();
      var values = $(this).serialize();

      // post to Locations#new if no location_id (data-id)
      if (event.target.attributes['data-id'].nodeValue === undefined) {
      var posting = $.post('/locations', values);
      posting.done(function(data) {
        // handle response and append to DOM
        $("#latest").empty;
        var anchorage = data;
          html = `<h3>Latest Review:${anchorage["nickname"]}, ${anchorage["country"]} | "${anchorage["reviews"][0]["content"]}"</h3>`;
          $("#latest").append(html);
        // TODO: Refresh countries-list with new review
        });
      } else {

      // post to Locations#update if location_id (data-id)
      console.log(event.target.attributes['data-id'].nodeValue);
        var posting = $.post(`/locations/${event.target.attributes['data-id'].nodeValue}/reviews`, values);
        posting.done(function(data) {
          // handle response and append to DOM
          $("#latest").empty;
          var anchorage = data;
            html = `<h3>Latest Review:${anchorage["nickname"]}, ${anchorage["country"]} | "${anchorage["reviews"][0]["content"]}"</h3>`;
            $("#latest").append(html);
          // TODO: Refresh countries-list with new review
          });
        }
    });
  });
});
