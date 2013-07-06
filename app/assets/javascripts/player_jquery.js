$(document).ready(function(){

  $("#ask_question").mouseenter(function(){
   pauseVideo();
 });

  $("#questions-answers").mouseenter(function(){
   pauseVideo();
 });

  $(".qcontainer").mouseenter(function(){
    $(this).children(".triangle-border").css("heigth", "auto");
    $(this).children(".triangle-border").children(".question_body").slideDown();
    $(this).siblings(".repective-answers").children(".acontainer").slideDown();
    $(this).siblings(".repective-answers").css("margin-top", "150px");
  });

  $(".qcontainer").mouseleave(function(){
    $(this).children(".triangle-border").css("heigth", "50px");
    $(this).children(".triangle-border").children(".question_body").hide();
    $(this).siblings(".repective-answers").children(".acontainer").hide();
    $(this).siblings(".repective-answers").css("margin-top", "0px");
  });

  $("#ask_question").mouseleave(function(){
    playVideo();
  });

  $("#questions-answers").mouseleave(function(){
    playVideo();
  });

  var $progressBarContainer = $('.progress-bar');
  var $progressBarStatus = $('.progress')

  function getProgressTimeRequest(e){
    var parentOffsetX = $progressBarContainer.offset().left;
    var mouseX = e.pageX;
    var relativeX =  mouseX - parentOffsetX;
    var mousePercentage = relativeX / $progressBarContainer.width();
    return ytplayer.getDuration() * mousePercentage;
  }

  $('.progress-bar').click(function(e){
    newTime = getProgressTimeRequest(e)
    seekTo(newTime);
  });
});

var stopTimer = function(){
};