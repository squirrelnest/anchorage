class Location {

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.lat = data.lat;
    this.lon = data.lon;
  }

  toHTML() {
    return `<div id='review' data-id='${this.id}' onmouseover='showReviews(event)'>
    <p><strong><a href='/locations/${this.id}' data-id='${this.id}'>${this.nickname}</a></strong>
    <br /> ${this.lat}, ${this.lon} </p></div>`;
  }
}

class Review {

  constructor(data) {
    this.content = data.content;
    this.stability = data.stability;
    this.date_visited = data.date_visited;
  }

  toHTML() {
    return `<div class="review-preview">
    <p class="review-content">"${this.content}"</p>
    <p>Stability rating: ${this.stability}</p>
    <p>Reviewed: ${this.date_visited}</p>
    </div>`;
  }
}

function buttons(data) {
  return `<button id="toggle-review-form"
  onclick="addReview(event)"
  data-nickname="${data.nickname}"
  data-country="${data.country}"
  data-lat="${data.lat}"
  data-lon="${data.lon}"
  data-id="${data.id}">
  Add Review
  </button>`
}

function reviewsOverlay(location_id) {

  // get location json
  $.get(`/locations/${location_id}.json`, function(data) {

    // clear div
    $('#overlay').empty();

    // add DOM element for nickname and addReview to overlay div
    let heading = `<h2>${data.nickname.toUpperCase()}</h2><div class="add-review">` + buttons(data) + `</div>`
    $('#overlay').append(heading);

    // add DOM element for each review to overlay div
    data.reviews.forEach(function(review) {
      var review = new Review(review)
      $('#overlay').append(review.toHTML());
    });
  });
}
