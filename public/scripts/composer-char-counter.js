

$(document).ready(function() {
  $("#tweet-text-box").keyup(function(){
    console.log($(this).val().length);
    let counter = $("#text-counter");
    counter.text(140 - $(this).val().length);
  });
});