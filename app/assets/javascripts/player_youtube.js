  var Player = {
      videoCount: 0,
      currentVideoID: null,
      checker: false,
      id: null,
      ytplayer: document.getElementById("ytPlayer"),
      contents: [],
      cID: null,

      init: function () {
var myClientX;

        window.document.addEventListener("mousemove", function(event) {
    myClientX = event.clientX;
    myClientY = event.clientY;
    // console.log(myClientX);
}, false);

          $(".dragger").draggable({
              axis: 'x',
              containment: "parent",
              cursor: "crosshair",
              zIndex: 9999,
              drag: function (e) {
                // Player.pauseVideo();
                // console.log(myClientX-$('.progress-bar').offset().left);
                // $('.dragger').css('margin-left', myClientX-$('.progress-bar').offset().left+'px');
                  // Player.updateProgressSpan();
                  // var content = this.getContentFromContentId(contentId);
                  // var time = this.validateDragTime(content, this.getProgressTimeRequest(e, contentId));
                  // this.seekTo(time);
              },
              stop: function (e) {
                  var location = e.pageX;
                  var children = $(".progress-bar").children(".chapter");
                  var lookedFor;
                  var count = 0;
                  children.each(function () {
                      count++;
                      var start = $(this).data("start");
                      var end = $(this).data("end");
                      if (location >= start && location <= end) {
                          lookedFor = $(this).index('.chapter');
                          var currentWidth = end - start;
                          var parentOffsetX = $(this).parent().offset().left;
                          if (lookedFor == 0) {
                              var width = 0;
                          } else {
                              var width = $(this).parent().children(".chapter").eq(lookedFor - 1).data("end");
                          };
                          var valueSubstract = location - width - parentOffsetX;
                          var percentage = valueSubstract / currentWidth
                          Player.seekToPercentage(lookedFor, percentage);
                      }
                  });
              }
          });

  $('.progress-bar').click(function(e){
                  var location = e.pageX;
                  var parentOffsetX = $(".progress-bar").offset().left;
                  var children = $(this).children(".chapter");
                  var lookedFor;
                  children.each(function () {
                      var start = $(this).data("start");
                      var end = $(this).data("end");

                      if (location - parentOffsetX >= start && location - parentOffsetX <= end) {
                          lookedFor = $(this).index('.chapter');
                          var currentWidth = end - start;
                          // alert(parentOffsetX);
                          if (lookedFor == 0) {
                              var width = 0;
                          } else {
                              var width = $(this).parent().children(".chapter").eq(lookedFor - 1).data("end");
                          };
                          var valueSubstract = location - width - parentOffsetX;
                          var percentage = valueSubstract / currentWidth
                          Player.seekToPercentage(lookedFor, percentage);
                      }
                  });
              });



          $('#tabs').tabs();

          $("form").mouseenter(function () {
              Player.pauseVideo();
              $('input[id$="_time_in_content"]').val(Player.ytplayer.getCurrentTime());
              // TODO: replace 5 with ytplayer.getContentId();
              $('input[id$="_content_id"]').val(5);
          });

          $("form").mouseleave(function () {
              Player.playVideo();
          });

          // TODO: reduce duplication in two functions below
          $('form#new_question').submit(function (event) {
              event.preventDefault();
              var data = $(this).serialize();
              $.post('/questions', data, function (response) {
                  // TODO: insert response into question feed
                  // will be much easier after feed is reorganized.
              });
              return false;
          });

          $('form#new_flashcard').submit(function (event) {
              event.preventDefault();
              var data = $(this).serialize();
              $.post('/flashcards', data, function (response) {
                  $('span[data-content-id="' + Player.getContentId() + '"]').html(response);
              });
              return false;
          });

          $("#ask_question").mouseenter(function () {
              Player.pauseVideo();
          });

          $("#questions-answers").mouseenter(function () {
              Player.pauseVideo();
          });

          $(".qcontainer").mouseenter(function () {
              $(this).children(".triangle-border").css("heigth", "auto");
              $(this).children(".triangle-border").children(".question_body").slideDown();
              $(this).siblings(".repective-answers").children(".acontainer").slideDown();
              $(this).siblings(".repective-answers").css("margin-top", "150px");
          });

          $(".qcontainer").mouseleave(function () {
              $(this).children(".triangle-border").css("heigth", "50px");
              $(this).children(".triangle-border").children(".question_body").hide();
              $(this).siblings(".repective-answers").children(".acontainer").hide();
              $(this).siblings(".repective-answers").css("margin-top", "0px");
          });

          $("#questions-answers").mouseleave(function () {
              Player.playVideo();
          });

          $('.user-input-tab').click(function(){
            Player.changeUserInputTabs($(this).attr('data-tab-content'));
          })
      },

      changeUserInputTabs: function(contentType){
        if (contentType == 'question'){
          $('.user-input-tab').removeClass('user-input-tab-active');
          $('.user-input-tab-quesiton').addClass('user-input-tab-active');
          $('.user-input-indi-section').hide();
          $('.user-input-questions-section').show();
        } else if (contentType == 'card') {
          $('.user-input-tab').removeClass('user-input-tab-active');
          $('.user-input-tab-card').addClass('user-input-tab-active');
          $('.user-input-indi-section').hide();
          $('.user-input-cards-section').show();
        };
      },

      updateHTML: function (elmId, value) {
          document.getElementById(elmId).innerHTML = value;
      },

      onPlayerError: function (errorCode) {
          alert("An error occured of type:" + errorCode);
      },

      getContentId: function () {
          return Player.cID;
      },

      onPlayerStateChange: function (newState) {
          Player.updateHTML("playerState", newState);
      },

      updatePlayerInfo: function () {
          if (Player.ytplayer && Player.ytplayer.getDuration) {
              Player.updateProgressBar(Player.getCurrentTime(), Player.getTotalTime());
          };

          if (Player.ytplayer.getCurrentTime() >= parseInt(Player.contents[Player.videoCount][2] - 0.01) && Player.checker == false && Player.contents.length - 1 != Player.videoCount) {
              Player.checker = true;
              Player.newVid();
          };

          $("#" + Math.round(Player.ytplayer.getCurrentTime())).show("display", "inline");
      },

      seekTo: function (time) {
          if (Player.ytplayer) {
              Player.ytplayer.seekTo(time, true);
          };
      },

      seekToPercentage: function (videoID, percentage) {
          var totalTime = Player.contents[videoID][2] - Player.contents[videoID][1];
          var timeInUncut = totalTime * percentage;
          var timeinCut = timeInUncut + Player.contents[videoID][1];

          if (videoID !== Player.videoCount) {
              Player.ytplayer = document.getElementById("ytPlayer");
              setInterval(Player.updatePlayerInfo, 250);
              Player.updatePlayerInfo();
              Player.ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
              Player.ytplayer.addEventListener("onError", "onPlayerError");
              Player.ytplayer.loadVideoById({
                  'videoId': Player.contents[videoID][0],
                      'startSeconds': timeinCut,
                      'endSeconds': Player.contents[videoID][2],
                      'suggestedQuality': "small"
              });
              Player.currentVideoID = Player.contents[videoID][0];
              Player.cID = Player.contents[videoID][3];
              Player.videoCount = videoID;
          };
          Player.seekTo(timeinCut);
      },

      Test: function () {
          return window.setInterval(function () {
              Player.changeCss();
          }, 0);
      },

      changeCss: function () {
          $("#questions-answers").scrollTop(Player.getCurrentTime() * 149);
          Player.getCurrentTime();
      },

      getTotalTime: function () {
          var time = 0;

          for (var i = 0; i < Player.contents.length; i++) {
              time = time + (Player.contents[i][2] - Player.contents[i][1]);
          };
          return time;
      },

      getCurrentTime: function () {
          var currentT = Player.ytplayer.getCurrentTime() - Player.contents[Player.videoCount][1];
          var timePassed = 0;
          var i = Player.videoCount - 1;
          while (i >= 0) {
              timePassed = timePassed + (Player.contents[i][2] - Player.contents[i][1]);
              i--;
          };
          return currentT + timePassed;
      },

      updateProgressBar: function (currentTime, duration, playerId) {
          if (currentTime != 0 && duration != 0) {
              var progressRatio = currentTime / duration;
              var progressUpdate = 575 * progressRatio;
          };
          $('.progress').css('width', progressUpdate);
          $('.dragger').css('left', progressUpdate);
      },

      playVideo: function () {

          if (Player.ytplayer) {
              Player.ytplayer.playVideo();
              Player.id = Player.Test();
          };

      },


      // disable progress when dragging 
      // play shouldnt play the vid again

      pauseVideo: function () {
          if (Player.ytplayer) {
              Player.ytplayer.pauseVideo();
          };
          window.clearInterval(Player.id);
      },

      playerSubMethod: function (playerId) {
          Player.ytplayer = document.getElementById("ytPlayer");
          setInterval(Player.updatePlayerInfo, 250);
          Player.updatePlayerInfo(playerId);
          Player.ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
          Player.ytplayer.addEventListener("onError", "onPlayerError");
      },

      newVid: function (playerId) {
          Player.playerSubMethod(playerId);
          Player.videoCount++;
          Player.ytplayer.loadVideoById({
              'videoId': Player.contents[Player.videoCount][0],
                  'startSeconds': Player.contents[Player.videoCount][1],
                  'endSeconds': Player.contents[Player.videoCount][2],
                  'suggestedQuality': "small"
          });
          Player.currentVideoID = Player.contents[Player.videoCount][0];
          Player.cID = Player.contents[Player.videoCount][3];
          Player.checker = false;
      },

      loadPlayer: function () {
          var params = {
              allowScriptAccess: "always"
          };
          var atts = {
              id: "ytPlayer"
          };

          swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
              "version=3&enablejsapi=1&playerapiid=player1",
              "videoDiv", "640", "360", "9", null, null, params, atts);
      },

      _run: function () {
          Player.loadPlayer();
      }
  };
  google.setOnLoadCallback(Player._run);