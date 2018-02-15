class Location {

  constructor(data) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.lat = data.lat;
    this.lon = data.lon;
  }

  toHTML() {
    return `<div class='review' data-id='${this.id}' onmouseover='showReviews(event, ${this.id})'>
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
    return `<div class="review-preview row">
    <p class="review-content">"${this.content}"</p>
    <p>Stability rating: ${this.stability}</p>
    <p>Reviewed: ${this.date_visited}</p>
    </div>`;
  }
}

function buttons(data) {
  return `<button id="toggle-form"
  onclick="toggleReviewForm(event, ${JSON.parse(JSON.stringify(data)).id})">Add Review</button>`
}

function reviewsOverlay(location_id) {

  // change overlay style
  $('#overlay-container').css("background-color", "#8495a5");

  // get location json
  $.get(`/locations/${location_id}.json`, function(data) {

    // clear div
    $('#overlay').empty();

    // add DOM element for nickname and addReview to overlay div
    let heading = `<a href="/locations/${location_id}.html">
    <h3 class="row">${data.nickname}</h3></a>
    <div class="add-review row">` + buttons(data) + `</div>`

    $('#overlay').append(heading);

    function compareStability(current, next) {
      if (current.stability > next.stability) {
        return 1;
      } else if (current.stability < next.stability) {
        return -1;
      } else {
        return 0;
      }
    }

    // add DOM element for each review to overlay div
    data.reviews.sort(compareStability).forEach(function(review) {
      var review = new Review(review)
      $('#overlay').append(review.toHTML());
    });

  });
}
