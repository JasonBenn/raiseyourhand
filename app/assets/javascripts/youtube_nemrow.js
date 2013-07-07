var current_youtube_id = 'CGr2pB7drss';
var timeline = [];
// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
  updateHTML("playerState", newState);
}

// Display information about the current state of the player
function updatePlayerInfo(playerId) {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(ytplayer && ytplayer.getDuration) {
    updateProgressBar(ytplayer.getCurrentTime(), ytplayer.getDuration(), playerId)
  }
}

function updateProgressBar(currentTime, duration, playerId){
  if (currentTime != 0 && duration != 0){
    var progressRatio = currentTime / duration;
    var progressUpdate = 800 * progressRatio;
  }
  $('.progress-bar-'+playerId+' .progress').css('width', progressUpdate);
}

// Allow the user to set the volume from 0-100
function setVideoVolume() {
  var volume = parseInt(document.getElementById("volumeSetting").value);
  if(isNaN(volume) || volume < 0 || volume > 100) {
    alert("Please enter a valid volume between 0 and 100.");
  }
  else if(ytplayer){
    ytplayer.setVolume(volume);
  }
}

function playVideo() {
  if (ytplayer) {
    ytplayer.playVideo();
  }
}

function pauseVideo() {
  if (ytplayer) {
    ytplayer.pauseVideo();
  }
}

function muteVideo() {
  if(ytplayer) {
    ytplayer.mute();
  }
}

function unMuteVideo() {
  if(ytplayer) {
    ytplayer.unMute();
  }
}

function seekTo(time){
  if(ytplayer) {
    ytplayer.seekTo(time, true);
  }
}

function getDuration(){
  if(ytplayer) {
    return ytplayer.getDuration();
  }
}

function setCurrentYoutubeId(url){
  current_youtube_id = getVideoIdFromUrl(url);
}

function getVideoIdFromUrl(url){
  var video_id = url.split('v=')[1];
  var ampersandPosition = video_id.indexOf('&');
  if(ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id
}

// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  ytplayer = document.getElementById(playerId);
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(250);
  updatePlayerInfo(playerId);
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  url = getYoutubeURLFromDiv(playerId);
  ytplayer.cueVideoById(getVideoIdFromUrl(url));
  // CGr2pB7drss
}

function getYoutubeURLFromDiv(playerId){
  return $('.youtubeId-'+playerId).val();
}

function activateContent(index){
  ytplayer = document.getElementById('player'+index);
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer(index) {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "player"+index };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "version=3&enablejsapi=1&playerapiid=player"+index, 
                     "videoDiv-"+index, "800", "410", "9", null, null, params, atts);
}
function _run(index) {
  loadPlayer(index);
}

function getIndexIdFromParent(element){
  return element.parent().attr('data-index-id');
}

function getContentFromIndexId(index){
  content = timeline.filter(function(content){
    return (content.position == index);
  });
  return content[0]
}

function addContentToTimeline(content){
  timeline.push(content);
}

function updateContentTime(index, content){
  var timestampArray = []
  $('.progress-bar-'+index).children('.create-draggable-progress').each(function(){
    timestampArray.push($(this).attr('data-timestamp'));
  })
  if (parseInt(timestampArray[0]) <= parseInt(timestampArray[1])){
    content.start_time = timestampArray[0];
    content.finish_time = timestampArray[1];
  } else {
    content.start_time = timestampArray[1];
    content.finish_time = timestampArray[0];
  }
}

function addClipToLesson(content){
  updateContentInDatabase(content);
}

function updateContentInDatabase(content){
  $.ajax({
    url:'/contents/'+content.id,
    type: 'put',
    data: {
      content: {
        start_time: content.start_time,
        finish_time: content.finish_time,
        url: content.url,
        position: content.position,
        id: content.id,
        lesson_id: content.lesson_id
      }
    }
  }).success(function(result){
    alert(result)
  }).fail(function(result){
    alert(result)
  });
}

function createNewContent(url){
  $.ajax({
    url:'/contents',
    type: 'post',
    data: {
      content: {
        url: url,
        lesson_id: lesson_id,
        position: timeline.length
      }
    }
  }).success(function(result){
    $('.video-window').append(result)
  }).fail(function(result){
    alert('could not add video to lesson.')
  });
}

function placeSlidersByTime(time, duration, indexId, type){
  percent = parseFloat(parseFloat(time) / parseFloat(duration)).toFixed(2);
  if (type == 'start_time'){
    $('.create-draggable-progress-id-'+indexId).css('left', 800 * percent);
  } else {
    $('.create-draggable-progress-end-id-'+indexId).css('left', 800 * percent);
  }
}

function makeDraggable($element, indexId){
  $element.draggable({
    axis: 'x',
    containment: "parent",
    drag: function(e){
      activateContent(indexId);
      var newTime = getProgressTimeRequest(e, indexId);
      seekTo(newTime)
    },
    stop: function(e){
      var content = getContentFromIndexId(indexId);
      $element.attr('data-timestamp', parseFloat(getProgressTimeRequest(e, indexId)).toFixed(2));
      updateContentTime(indexId, content);
    }
  })
}

function getProgressTimeRequest(e, contentId){
  var parentOffsetX = $progressBarContainer.offset().left;
  var mouseX = e.pageX;
  var relativeX =  mouseX - parentOffsetX;
  var mousePercentage = relativeX / $progressBarContainer.width();
  return getDuration() * mousePercentage;
}

$(document).ready(function(){
  $progressBarContainer = $('.create-progress-bar');
  $progressBarStatus = $('.create-progress')
  $progressSlide = $('.create-draggable-progress');

  $('.video-window').on('click', '.add-clip-to-lesson', function(){
    var indexId = getIndexIdFromParent($(this));
    var content = getContentFromIndexId(indexId);
    updateContentTime(indexId, content);
    addClipToLesson(content);
  })

  $('.add-new_youtube-clip').click(function(){
    createNewContent($('.add-youtube-movie-input').val());
  })

});