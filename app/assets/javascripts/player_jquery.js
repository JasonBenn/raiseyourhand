$(document).ready(function(){
// alert("here");
$("#ask_question").mouseenter(function(){
  // alert("here");
 pauseVideo();
  addTiming();
  });

$(".question").click(function(){
  // alert("here");
$(this).children("ul").children("li").slideDown();
// alert($(this).parent("ul").position().top);
// $(".questions-answers").scrollTop(300);
// alert($(this).parent("ul").position().top*-1);
var position = Math.round($(this).parent("ul").position().top*-1);
// alert(position);

$(".questions-answers").scrollTop(position);
});

$(".question").on('dblclick', function(){
  // alert("here");
$(this).children("ul").children("li").slideUp();


});






$("#ask_question").mouseleave(function(){
  playVideo();
});

 var $progressBarContainer = $('.progress-bar');
      var $progressBarStatus = $('.progress')
      // var $progressSlide = $('.draggable-progress');

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


var addTiming = function(){
updateValue("time", ytplayer.getCurrentTime());
};

var stopTimer = function(){
};

