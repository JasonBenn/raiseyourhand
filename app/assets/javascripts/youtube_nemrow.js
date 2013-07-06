var current_youtube_id = 'CGr2pB7drss';
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
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(ytplayer && ytplayer.getDuration) {
    updateHTML("videoDuration", ytplayer.getDuration());
    updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
    updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());
    updateHTML("startBytes", ytplayer.getVideoStartBytes());
    updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
    updateHTML("volume", ytplayer.getVolume());
    updateProgressBar(ytplayer.getCurrentTime(), ytplayer.getDuration())
  }
}

function updateProgressBar(currentTime, duration){
  if (currentTime != 0 && duration != 0){
    var progressRatio = currentTime / duration;
    var progressUpdate = 800 * progressRatio;
  }
  $('.progress').css('width', progressUpdate);
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


// This function is automatically called by the player once it loads
function onYouTubePlayerReady(contentId) {
  ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
  ytplayer.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  ytplayer.cueVideoById(current_youtube_id);
  // CGr2pB7drss
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "version=3&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", "800", "410", "9", null, null, params, atts);
}
function _run(contentId) {
  loadPlayer(contentId);
}

$(document).ready(function(){
  var $progressBarContainer = $('.progress-bar');
  var $progressBarStatus = $('.progress')
  var $progressSlide = $('.draggable-progress');

  function getProgressTimeRequest(e){
    var parentOffsetX = $progressBarContainer.offset().left;
    var mouseX = e.pageX;
    var relativeX =  mouseX - parentOffsetX;
    var mousePercentage = relativeX / $progressBarContainer.width();
    return getDuration() * mousePercentage;
  }

  $('.progress-bar').click(function(e){
    newTime = getProgressTimeRequest(e)
    seekTo(newTime);
  });

  $('.draggable-progress').draggable({
    axis: 'x',
    containment: "parent",
    drag: function(e){
      var newTime = getProgressTimeRequest(e)
      seekTo(newTime)
    }
  }).change(function(){
    alert('s')
  });

  $('.set-new-chapter').click(function(){

  })

});