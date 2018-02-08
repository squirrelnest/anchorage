// Show or hide review form for existing anchorage
function toggleReviewForm(event) {
  event.preventDefault();
  if ( $('button#toggle-form').text() === 'Add Review') {
    $('button#toggle-form').text('Cancel');
    let location_id = event.target.attributes['data-id'].nodeValue;
    addReview(location_id);
  } else {
    $('button#toggle-form').text('Add Review');
    $("form#addreview").remove();
  }
}

// Add review form to existing anchorage
function addReview(location_id) {

  let timestamp = (new Date()).toUTCString();
  var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');

  // create form
  html = `<form id="addreview" action="/reviews" method="post"><hr>
          <input name="authenticity_token" type="hidden" value="${AUTH_TOKEN}" />
          <input type='hidden' name='review[location_id]' id='addreview_location_id' value='${location_id}'>
          <div class="form-group">
          <p><strong>Date Visited</strong> <br /><input type='text' class="form-control" name='review[date_visited]' id='addreview_date_visited' value='${timestamp}'></p>
          </div>
          <div class="form-group">
          <p><strong>Stability</strong> <br /><input type='range' name='review[stability]' id='addreview_stability' value='' min="0" max="10" step="1"></p>
          </div>
          <div class="form-group">
          <p><strong>Content</strong> <br /><input type='text' class="form-control" name='review[content]' id='addreview_content' value=''></p>
          </div>
          <input type="submit">
          <hr></form>`

  // append form fields to DOM
  $(".add-review").append(html);

  // prefill form fields
  if (event.target.attributes['data-lat'] !== undefined) {
    $('#addreview_location_id').val(`${location_id}`);
    $('#addreview_lat').val(event.target.attributes['data-lat'].nodeValue);
    $('#addreview_lon').val(event.target.attributes['data-lon'].nodeValue);
    $('#addreview_nickname').val(event.target.attributes['data-nickname'].nodeValue);
    $('#addreview_country').val(event.target.attributes['data-country'].nodeValue);
  }

  // always pass csrf tokens on ajax calls
  $(function(){
    $.ajaxSetup({
      headers: { 'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content') }
    });
  });

}

// Create new location and review
function createReview(event) {
  event.preventDefault();

  // prefill form fields
  if (event.target.attributes['data-lat'] !== undefined) {
    $('#nickname').val('');
    $('#lat').val(event.target.attributes['data-lat'].nodeValue);
    $('#lon').val(event.target.attributes['data-lon'].nodeValue);
    $('#country').val('');
  }

  // slide out form
  $('#create-review-form').css("left", "50%");
}

// Close form for new anchorage
function closeForm() {
  event.preventDefault();
  $('#create-review-form').css("left", "100%");
}

// Submit form for new anchorage
$(document).ready(function() {

  $(function () {
    $('#new_location').submit(function(event) {

      event.preventDefault();
      event.stopPropagation();

      closeForm();

      var values = $(this).serialize();

      // post to Locations#new
      var posting = $.post('/locations', values);
      posting.done(function(data) {
        console.log("js intercepted!")
        // handle response and append to DOM
        $("#latest").empty;
        var anchorage = data;
        html = `<h3>Latest Review: ${anchorage["nickname"]}, ${anchorage["country"]} | "${anchorage["reviews"][0]["content"]}"</h3>`;
        $("#latest").append(html);
        // TODO: Refresh countries-list with new review
      });

      // reset form
      $('form').trigger('reset');

    });
  });
});
