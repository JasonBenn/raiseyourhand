$(document).ready(function(){
  alert("here");
$("#comment").mouseenter(function(){
  // alert("here");
 pauseVideo();
  addTiming();
  });

$("#comment").mouseleave(function(){
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

