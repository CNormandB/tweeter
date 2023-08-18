/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const createTweetElement = () => {
    $.get("tweets", data => {
      for (let tweet of data) {
        renderTweets(tweet);
      }
    });
  };
  createTweetElement();

  const timeConversion = function(timeCreated) {
    const difference = (Math.floor(Date.now())) - timeCreated;
    let output = ``;
    if (difference < 60) {
      // Less than a minute has passed:
      output = `${difference} second(s) ago`;
    } else if (difference < 3600) {
      // Less than an hour has passed:
      output = `${Math.floor(difference / 60)} minute(s) ago`;
    } else if (difference < 86400) {
      // Less than a day has passed:
      output = `${Math.floor(difference / 3600)} hour(s) ago`;
    } else if (difference < 2620800) {
      // Less than a month has passed:
      output = `${Math.floor(difference / 86400)} day(s) ago`;
    } else if (difference < 31449600) {
      // Less than a year has passed:
      output = `${Math.floor(difference / 2620800)} month(s) ago`;
    } else {
      // More than a year has passed:
      output = `${Math.floor(difference / 31449600)} year(s) ago`;
    }
    return output;
  };

  const renderTweets = tweetObject => {
    let avatar = "/images/avatar.png";
    let timeStamp = timeConversion(Date.now());

    if (tweetObject.user.avatars) {
      avatar = tweetObject.user.avatars;
    }
    if (tweetObject.created_at) {
      timeStamp = timeConversion(tweetObject.created_at);
    }

    let tweetTemplate =
      `
   <section class="tweet-container">
      <header class="user">
        <div class="avatar-name">
          <img class="avatar" src= "${avatar}">
            <label class="name"><em>${tweetObject.user.name}</em></label>
        </div>
        <div class="handle">
          <label>${tweetObject.user.handle}</label>
        </div>
      </header>
      <div class="contents">
        ${tweetObject.content.text}
      </div>
      <footer class="tweet-footer">
        <div class="created_at">
          <label>${timeStamp}</label>
        </div>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </section>
  `;
    $("#tweets").append(tweetTemplate);
  };

  $("form").on("submit", function(event) {
    let counterNumber = parseInt($("#text-counter").val(), 10)
    if (counterNumber <= 0 || counterNumber === 140){
      event.preventDefault();
    } else {
      $("form").serialize();
      console.log($("form").serialize())
    }
  
  });

});
