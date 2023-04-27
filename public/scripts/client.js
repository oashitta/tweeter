/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetObj) => {
  /* Your code for creating the tweet element */
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src="${tweetObj.user.avatars}">
          <span>${tweetObj.user.name}</span>
        </div>
        <span class="handle">${tweetObj.user.handle}</span>
      </header>

      <p>${escape(tweetObj.content.text)}</p>

      <footer>
        <span>${timeago.format(tweetObj.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`) 
  return $tweet;
};

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    const $newTweet = createTweetElement(tweet)
    // takes return value and appends it to the tweets container
    $(`#tweet-container`).prepend($newTweet);
  }
}

// function handling form submission
const addTweet = function(event) {
  // to stop default behaviour of refresh.
  event.preventDefault();
  $("#error-message").text("").slideUp();

  // to capture the input in the text area.
  const formInput = $("#tweet-text")
  const length = formInput.val().length;
  
  // validate form. 
  if (length > 140) {
    $("#error-message").text("Tweet must be 140 characters or less.").slideDown();
    // alert("Tweet must be 140 characters or less.");
    return;
  }
  
  if (length === 0 || typeof length === null){
    // $("#error-message").text("Invalid tweet input, please enter a tweet!").show();
    $("#error-message").text("Invalid tweet input, please enter a tweet!").slideDown();
    // setTimeout($("#error-message").text("Invalid tweet input, please enter a tweet!").slideUp(5000));
    // alert("Invalid tweet input, please enter a tweet!");
    return;
  }

  $("#error-message").text("Invalid tweet input, please enter a tweet!").slideUp();
  
  // if it passes all checks then create new tweet
  const formData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: formData,
  }).then(() => {
    formInput.val("")
    loadTweets();
  });
  
  // hide error message on successful submission. 
  // $("#error-message").text("Invalid tweet input, please enter a tweet!").hide();
}

const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/tweets",
  }).then((res) => {
    renderTweets(res)
  })
}

$(document).ready(() => {
  $('form').on('submit', addTweet);
  loadTweets();
});
