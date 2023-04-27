/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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

      <p>${tweetObj.content.text}</p>

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
  event.preventDefault();
  const formData = $(this).serialize();
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: formData,
  })
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
