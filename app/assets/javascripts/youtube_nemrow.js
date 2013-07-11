var timeline = [];
var colors = ['0e5366', '668b39', 'fc9b46', 'fb5f61'];

var CreateLesson = {
  init: function(){
    var that = this;
    $progressBarContainer = $('.create-progress-bar');
    $progressBarStatus = $('.create-progress');
    $progressSlide = $('.create-draggable-progress');

    $(document).on('click', '.switch-video-content-clip', function(){
      var clicked_video_id = $(this).attr('data-content-id');
      that.switchVideoVisibilies(clicked_video_id);
    });

    this.initiatePlayer();
    that.initializePlaylist();

    $('.playlist-container').sortable({
      stop: function(){
        that.readPlaylistOder();
      },
      cursor: 'move'
    });
    $('.playlist-container').disableSelection();

    that.update_full_lesson_timeline_bar();

    $('.add-new_youtube-clip').click(function(){
      that.createNewContent($('.add-youtube-movie-input').val());
      $('.add-youtube-movie-input').val('');
    });

    $('.playlist-container').on('click', '.delete-content', function(){
      that.deleteContentById($(this).attr('data-contentId'));
      $(this).parent().remove();
      that.update_full_lesson_timeline_bar();
    })
  },

  changePlayPauseButtonStatus: function($element, state){
    $('.button-play-pause').attr('data-status', 'pause').children('.play-pause-icon').css('background-position', '0px 0px');
    if (state == 1){
      $element.attr('data-status', 'play').children('.play-pause-icon').css('background-position', '0px -16px');
    };
  },

  changePlayerVisualByState: function(state){
    $element = $('.button-play-pause-id-'+active_edit_video);
    this.changePlayPauseButtonStatus($element, state);
  },

  playOrPauseVideoByContentId: function(contentId){
    $('.button-play-pause-id-'+contentId).click(function(){
      CreateLesson.activateContent(contentId);
      $element = $(this);
      if ($element.attr('data-status') == 'pause'){
        playVideo();
        CreateLesson.changePlayPauseButtonStatus($element, 1);
      } else {
        pauseVideo();
        CreateLesson.changePlayPauseButtonStatus($element, 2);
      }
    })
  },

  // Update a particular HTML element with a new value
  updateHTML: function(elmId, value) {
    document.getElementById(elmId).innerHTML = value;
  },  

  // This function is called when an error is thrown by the player
  onPlayerError: function(errorCode) {
    alert("An error occured of type:" + errorCode);
  },

  deleteContentById: function(contentId){
    var that = this;
    timeline.forEach(function(content, index){
      if (content.id == contentId){
        timeline.splice(index, 1);
      }
    })
    that.deleteContentFromDataBase(contentId);
    stopVideo();
    this.activateContent(timeline[0].id);
    $('.indi-video-shell-'+contentId).remove();
    this.switchVideoVisibilies(timeline[0].id)
  },

  getColor: function(index){
    return colors[index % colors.length]
  },

  // This function is called when the player changes state
  onPlayerStateChange: function(newState) {
    this.changePlayerVisualByState(newState)
  },

  updatePlayPauseButton: function(state){
    if (state == 1 || state == 2){
      // CreateLesson.playPauseDirectByContentId(active_edit_video);
    };
  },

  // Display information about the current state of the player
  updatePlayerInfo: function(playerId) {
    // Also check that at least one function exists since when IE unloads the
    // page, it will destroy the SWF before clearing the interval.
    if(ytplayer && ytplayer.getDuration) {
      CreateLesson.updateProgressBar(ytplayer.getCurrentTime(), ytplayer.getDuration(), active_edit_video);
      CreateLesson.detectClipEndTime(ytplayer.getCurrentTime());
    };
  },

  detectClipEndTime: function(current_time){
    if (current_time > this.getFinishTimeFromId(active_edit_video)){
      seekTo(CreateLesson.getStartTimeFromId(active_edit_video));
    };
  },

  updateProgressBar: function(currentTime, duration, playerId){
    if (currentTime != 0 && duration != 0){
      var progressRatio = currentTime / duration;
      var progressUpdate = 575 * progressRatio;
    };
    $('.progress-bar-'+active_edit_video+' .progress').css('width', progressUpdate);
  },

  // Allow the user to set the volume from 0-100
  setVideoVolume: function() {
    var volume = parseInt(document.getElementById("volumeSetting").value);
    if(isNaN(volume) || volume < 0 || volume > 100) {
      alert("Please enter a valid volume between 0 and 100.");
    } else if(ytplayer) {
      ytplayer.setVolume(volume);
    };
  },

  setCurrentYoutubeId: function(url){
    current_youtube_id = this.getVideoIdFromUrl(url);
  },

  getVideoIdFromUrl: function(url){
    var video_id = url.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    };
    return video_id;
  },

  getIdFromPlayerString: function(playerString){
    return playerString.match(/\d+/);
  },

  getStartTimeFromId: function(contentId){
    content = CreateLesson.getContentFromContentId(contentId);
    return content.start_time;
  },

  getFinishTimeFromId: function(contentId){
    content = CreateLesson.getContentFromContentId(contentId);
    return content.finish_time;
  },

  getYoutubeURLFromDiv: function(playerId){
    return $('.youtubeId-'+playerId).val();
  },

  activateContent: function(contentId){
    ytplayer = document.getElementById('player'+contentId);
    active_edit_video = contentId;
  },

  // The "main method" of this sample. Called when someone clicks "Run".
  loadPlayer: function(contentId) {
    // Lets Flash from another domain call JavaScript
    var params = { allowScriptAccess: "always" };
    // The element id of the Flash embed
    var atts = { id: "player"+contentId };
    // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
    swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                       "version=3&enablejsapi=1&playerapiid=player"+contentId, 
                       "videoDiv-"+contentId, "640", "360", "9", null, null, params, atts);
  },

  _run: function(contentId) {
    this.loadPlayer(contentId);
  },

  getIndexIdFromParent: function(element){
    return element.parent().attr('data-index-id');
  },

  getContentFromIndexId: function(index){
    content = timeline.filter(function(content){
      return (content.position == index);
    });
    return content[0];
  },

  getContentFromContentId: function(contentId){
    content = timeline.filter(function(content){
      return (content.id == contentId);
    });
    return content[0];
  },

  getVideoClipTime: function(element){
    return parseFloat(element.finish_time) - parseFloat(element.start_time);
  },

  getTotalLessonTime: function(){
    var time = 0;
    var that = this;
    timeline.forEach(function(element, index){
      time += that.getVideoClipTime(element);
    });
    return time.toFixed(2);
  },

  addContentToTimeline: function(content){
    timeline.push(content);
  },

  updateContentTime: function(contentId, content){
    var timestampArray = [];
    $('.progress-bar-'+contentId).children('.create-draggable-progress').each(function(){
      timestampArray.push($(this).attr('data-timestamp'));
    });
    if (parseInt(timestampArray[0]) <= parseInt(timestampArray[1])){
      this.setContentTimes(content, timestampArray[0], timestampArray[1]);
    } else {
      this.setContentTimes(content, timestampArray[1], timestampArray[0]);
    };
  },

  setContentTimes: function(content, start_time, finish_time){
    content.start_time = start_time;
    content.finish_time = finish_time;
  },

  getNewPositionIndex: function(){
    $('.full-lesson-timeline li').each(function(index){
      var content = getContentFromIndexId($(this).attr('data-content-id'));
      content.position = index;
      this.updateContentInDatabase(content);
    });
  },

  addClipToLesson: function(content){
    this.updateContentInDatabase(content);
    this.update_full_lesson_timeline_bar();
  },

  reOrganizeTimeline: function(){
    this.update_full_lesson_timeline_bar();
    this.switchPlayerToNewContent();
    this.addNewContentToPlaylist();
  },

  readPlaylistOder: function(){
    var new_timeline = [];
    var that = this;
    $('.playlist-container li').each(function(index){
      var content = that.getContentFromId($(this).attr('data-content-id'));
      $(this).css('background-color','#'+ CreateLesson.getColor(index));
      content.position = index;
      new_timeline.push(content);
    });
    timeline = new_timeline;
    this.update_full_lesson_timeline_bar();
    this.sendOrderToDB();
  },

  getContentFromId: function(id){
    var content = timeline.filter(function(content){
      return (content.id == id);
    });
    return content[0];
  },

  addNewContentToPlaylist: function(){
    content = timeline[timeline.length - 1];
    $('.playlist-container').append('<li class="playlist-content switch-video-content-clip" data-content-id=' + content.id
        + ' style="background-color:#' + CreateLesson.getColor(content.position) +'">' 
        + content.title + '<i class="icon-reorder sort-order-placement-draggable"></i></li>');
  },

  getRandomColor: function(){
    return Math.floor(Math.random()*16777215).toString(16);
  },

  update_full_lesson_timeline_bar: function(){
    $('.full-lesson-timeline').html('');
    var total_time = this.getTotalLessonTime();
    var that = this;
    timeline.forEach(function(element, index){
      var percent_filled = (that.getVideoClipTime(element) / total_time) * 100;
      $('.full-lesson-timeline').append('<li class="timeline-portion switch-video-content-clip '
        + 'timeline-portion-id-'+element.position+'" style="width:'
        + percent_filled+'%; background-color:#'
        + CreateLesson.getColor(index) +'" data-content-id='+element.id+'>'
        + '<p class="time-line-title-inner">'+element.title+'</p></li>');
    });
  },

  deleteContentFromDataBase: function(contentId){
    var that = this;
    that.dispayUpdateLoader();
    $.ajax({
      url:'/contents/'+contentId,
      type: 'delete',
      data: {
        lesson_id: lesson_id, 
        id: contentId 
      }
    }).success(function(result){
      that.hideUpdateLoader();
    }).fail(function(result){
      alert(result);
    });
  },

  sendOrderToDB: function(){
    var that = this;
    that.dispayUpdateLoader();
    var position_array = [];
    timeline.forEach(function(content){
      position_array.push(content.id);
    });
    $.ajax({
      url:'/sortorder',
      type: 'put',
      data: {
        lesson_id: lesson_id, 
        sortorder: position_array 
      }
    }).success(function(result){
      that.hideUpdateLoader();
    }).fail(function(result){
      alert(result);
    });
  },

  updateContentInDatabase: function(content){
    var that = this;
    that.dispayUpdateLoader();
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
      that.hideUpdateLoader();
    }).fail(function(result){
      alert(result);
    });
  },

  dispayUpdateLoader: function(){
    $('.saving-data-shell').text('Saving changes...');
  },

  hideUpdateLoader: function(){
    $('.saving-data-shell').text('All changes Saved');
  },

  createNewContent: function(url){
    var that = this;
    that.dispayUpdateLoader();
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
      $('.video-window').append(result);
      that.reOrganizeTimeline();
      that.hideUpdateLoader();
    }).fail(function(result){
      alert('could not add video to lesson.');
    });
  },

  switchPlayerToNewContent: function(){
    var last_element = (parseInt(timeline.length) - 1);
    this.switchVideoVisibilies(timeline[last_element].id);
  },

  placeSlidersByTime: function(time, duration, indexId, type){
    percent = parseFloat(parseFloat(time) / parseFloat(duration)).toFixed(2);
    if (type == 'start_time'){
      $('.create-draggable-progress-id-'+indexId).css('left', 575 * percent);
    } else {
      $('.create-draggable-progress-end-id-'+indexId).css('left', 575 * percent);
    };
  },

  initializePlaylist: function(){
    var html = ''
    $('.playlist-container').html('');
    timeline.forEach(function(content, index){
      var title = content.title;
      html += ('<li class="playlist-content switch-video-content-clip" data-content-id=' + content.id
        + ' style="background-color:#' + CreateLesson.getColor(index) +'">' 
        + title +'<i class="icon-reorder sort-order-placement-draggable"></i></li>');
    });
    $('.playlist-container').append(html);
  },

  validateDragTime: function(content, time){
    if (time > content.duration){
      time = content.duration;
    };
    if (time < 0){
      time = 0;
    };
    return time
  },

  makeDraggable: function($element, contentId){
    var that = this;
    $element.draggable({
      axis: 'x',
      containment: "parent",
      cursor: "crosshair",
      zIndex: 9999, 
      drag: function(e){
        that.activateContent(contentId);
        that.updateProgressSpan(contentId);
        var content = that.getContentFromContentId(contentId);
        var time = that.validateDragTime(content, that.getProgressTimeRequest(e, contentId));
        seekTo(time);
      },
      stop: function(e){
        that.activateContent(contentId);
        var content = that.getContentFromContentId(contentId);
        var time = that.validateDragTime(content, that.getProgressTimeRequest(e, contentId));
        $element.attr('data-timestamp', time);
        that.updateClipInTimeline(contentId, content);
      }
    });
  },

  getProgressTimeRequest: function(e, contentId){
    var parentOffsetX = $progressBarContainer.offset().left;
    var mouseX = e.pageX;
    var relativeX =  mouseX - parentOffsetX;
    var mousePercentage = relativeX / $progressBarContainer.width();
    return getDuration() * mousePercentage;
  },

  updateClipInTimeline: function(contentId, content){
    this.updateContentTime(contentId, content);
    this.addClipToLesson(content);
  },

  initiatePlayer: function(){
    $('.indi-video-shell-'+active_edit_video).css('visibility','visible');
    this.activateContent(timeline[0].id);
  },

  playActiveVideo: function(){
    seekTo();
  },

  updateProgressSpan: function(contentId){
    var point_a = $('.create-draggable-progress-id-'+contentId).css('left');
    var point_b = $('.create-draggable-progress-end-id-'+contentId).css('left');
    var length = Math.abs(parseFloat(point_b) - parseFloat(point_a)); 
    $('.progress-span-id-'+ contentId).css({
      left: point_a,
      width: length
    });
  },

  switchVideoVisibilies: function(contentId){
    stopVideo();
    $('.indi-video-shell').css('visibility','hidden');
    $('.indi-video-shell-'+contentId).css('visibility','visible');
    this.activateContent(contentId);
  }
};

function playVideo() {
  if (ytplayer) {
    ytplayer.playVideo();
  };
};

function pauseVideo() {
  if (ytplayer) {
    ytplayer.pauseVideo();
  };
};

function muteVideo() {
  if(ytplayer) {
    ytplayer.mute();
  };
};

function unMuteVideo() {
  if(ytplayer) {
    ytplayer.unMute();
  };
};

function seekTo(time){
  if(ytplayer) {
    ytplayer.seekTo(time, true);
  };
};

function stopVideo(){
  if(ytplayer) {
    ytplayer.stopVideo();
  };
};

function getDuration(){
  if(ytplayer) {
    return ytplayer.getDuration();
  };
};


