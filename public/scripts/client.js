/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    let tweetTemplate = `
    <div class="tweet">  
        <header class="user">
        <div class="avatar-name">
          <img class="avatar" src= "${tweet.user.avatars}">
            <label class="name"><em>${escape(tweet.user.name)}</em></label>
        </div>
        <div class="handle">
          <label>${escape(tweet.user.handle)}</label>
        </div>
      </header>
      <div class="contents">
        ${escape(tweet.content.text)}
      </div>
      <footer class="tweet-footer">
        <div class="created_at">
          <span>${timeago.format(tweet.created_at)}</span>
        </div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
      </div>
  `;
    $("#tweets").prepend(tweetTemplate);
  };


  const renderTweets = function(tweetData) {
    for (const tweet of tweetData) {
      createTweetElement(tweet);
    }
  };

  $("form").on("submit", function(event) {
    event.preventDefault();

    let post_length = $("#tweet-text-box").val().length
    if (post_length !== undefined) {
      if (post_length == 0) {
        const error_div = $("#error-message");

        error_div.slideDown("slow", function () {
          error_div.text("Your tweet is empty! Cannot submit!");
          error_div.css("display: block");
        });
        return;
      }
      if  (post_length > 140) {
          error_div.slideDown("slow", function () {
            error_div.text("Tweet is over 140 characters. Cannot submit!");
            error_div.css("display: block");
        });
        return;
      }
    }

    
    error_div.slideUp("slow", function(){ 
      error_div.css("display: none");
    });

    // async await
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $("form").serialize()
    }).then(loadTweets);
  });

  const loadTweets = () => {
    $.ajax("/tweets", { method: 'GET' }).then(renderTweets);
  };
  loadTweets();
});
