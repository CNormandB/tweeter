/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const createTweetElement = (tweet) => {
    let tweetTemplate = `
    <div class="tweet">  
        <header class="user">
        <div class="avatar-name">
          <img class="avatar" src= "${tweet.user.avatars}">
            <label class="name"><em>${tweet.user.name}</em></label>
        </div>
        <div class="handle">
          <label>${tweet.user.handle}</label>
        </div>
      </header>
      <div class="contents">
        ${tweet.content.text}
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
    $("#tweets").append(tweetTemplate);
  };


  const renderTweets = function(tweetData) {
    for (const tweet of tweetData) {
      createTweetElement(tweet);
    }
  };

  $("form").on("submit", function(event) {
    event.preventDefault();

    let post_length = $("#tweet-text-box").val().length
    if(post_length == 0 || post_length > 140){
      return;
    }


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
