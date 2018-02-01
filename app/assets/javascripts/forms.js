function createReview(event) {
  event.preventDefault();

  // prefill form fields
  $('#lat').val(event.target.attributes['data-lat'].nodeValue);
  $('#lon').val(event.target.attributes['data-lon'].nodeValue);

  // slide out form
  $('#review-form').css("left", "50%");
}

function closeForm() {
  event.preventDefault();
  $('#review-form').css("left", "100%");
}

$(document).ready(function() {
  $(function () {
    $('form').submit(function(event) { // might break other forms, change to #review-form
      event.preventDefault();
      closeForm();
      var values = $(this).serialize();
      var posting = $.post('/locations', values);
      posting.done(function(data) {
      // handle response and append to DOM
      $("#latest").empty;
      var anchorage = data;
        html = `<span><h3>Latest Review:</h3>${anchorage["nickname"]}, ${anchorage["country"]} | "${anchorage["reviews"][0]["content"]}"
                </span>`;
        $("#latest").append(html);
      // TODO: Refresh countries-list with new review
      });
    });
  });
});
