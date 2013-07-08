$(document).ready(function(){

$('#tabs').tabs();

  $("form").mouseenter(function(){
    pauseVideo();
    $('input[id$="_time_in_content"]').val(ytplayer.getCurrentTime());
    // TODO: replace 5 with ytplayer.getContentId();
    $('input[id$="_content_id"]').val(5);
  });

  $("form").mouseleave(function(){
    playVideo();
  });

  // TODO: reduce duplication in two functions below
  $('form#new_question').submit(function(event) {
    event.preventDefault();
    $(this).ajaxSubmit(function(response) {
      // TODO: insert response into question feed
      // will be much easier after feed is reorganized.
      console.log(response);
    });
    $(this).clearForm();
    return false;
  })

  $('form#new_flashcard').submit(function(event) {
    event.preventDefault();
    $(this).ajaxSubmit(function(response) {
      console.log(response);
      $('span[data-content-id="'+getContentId()+'"]').html(response);
    });
    $(this).clearForm();
    return false;
  })

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
  alert(currentChapter);
  alert(percentage);
  seekToPercentage(currentChapter, percentage);
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

  $("#questions-answers").mouseleave(function(){
    playVideo();
  });
});

var stopTimer = function(){
};
