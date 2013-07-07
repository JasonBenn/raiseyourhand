$(document).ready(function(){

 $(".chapter").on('click', function(e){
  var location = e.pageX;
  var currentChapter = $(this).index('.chapter');

  if (currentChapter == 0) {
    var width = 0;
  } else {
    var width = $(this).parent().children(".chapter").eq(currentChapter-1).data("end");
  };

  var currentWidth = $(this).data("end") - $(this).data("start")
  var parentOffsetX = $(this).parent().offset().left;
  var valueSubstract = location - width - parentOffsetX;
  var percentage = valueSubstract/currentWidth
  seekToPercentage(currentChapter, percentage);
});   

 $('body').unbind('keyup').keyup(function (e) {
  e.preventDefault();
  if (e.keyCode == 32) {
    newVid();
    return false; 
  }
  return false; 
});

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

});