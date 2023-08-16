

$(document).ready(function() {
  $("#tweet-text-box").keyup(function(){
    console.log($(this).val().length);
    let counter = $("#text-counter");
    counter.text(140 - $(this).val().length);
    
    if ($("#text-counter").val() <= 0){
      $("#text-counter").css("color","#FF0000");
    }else {
      $("#text-counter").css("color", "#545149") 
    };
  });
});