  var Player = {
      prependCount: 0,
      appendCount: 0,
      videoCount: 0,
      currentVideoID: null,
      checker: false,
      id: null,
      ytplayer: document.getElementById("ytPlayer"),
      contents: [],
      cID: null,
      currentVisible: null,
      cDOMO: null,

      init: function () {
          var myClientX;

          window.document.addEventListener("mousemove", function (event) {
              myClientX = event.clientX;
              myClientY = event.clientY;
          }, false);

          $(".dragger").draggable({
              axis: 'x',
              containment: "parent",
              cursor: "crosshair",
              zIndex: 9999,
              drag: function (e) {},
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

          $('.progress-bar').click(function (e) {
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

          $(".user-lesson-inputs").focus(function () {
              Player.pauseVideo();
              $('input[id$="_time_in_lesson"]').val(Player.getCurrentTime());
              $('input[id$="_content_id"]').val(Player.cID);
          });

          $(".answer_this").click(function (e) {
              e.preventDefault();
              var title = $(this).parent().parent().children(".lquestion-title").text();
              var text = $(this).parent().parent().children(".lquestion-body").children(".body").text();
              var author = $(this).parent().parent().children(".lquestion-body").children(".author").text();
              var qid = $(this).parent().parent().parent().parent().parent().children(".question-id").val();
              console.log(qid);
              cDOMO = $(this).parent().parent().parent().parent().parent();
              $("#fancybox").loadTemplate($("#modal-template"), {
                  title: title,
                  text: text,
                  author: author,
                  question_id: qid
              });

              $("#modal").css('visibility', 'visible');
              Player.pauseVideo();
              $("#modal").animate({
                  'opacity': 0.7
              }, 800);
              setTimeout(function () {
                  $("#fancybox").css('visibility', 'visible');
                  $("#fancybox").animate({
                      'opacity': 1
                  }, 800);

              }, 800);
          });

          $('form#new_question').submit(function (event) {
              event.preventDefault();
              var title = $(this).children('.user-lesson-inputs-slim').val();
              var text = $(this).children('.text-area-sizing-medium').val();
              var time = $(this).children('.timing').val();
              var data = $(this).serialize();
              $.post('/questions', data, function (response) {});
              Player.prependQuestion(title, text);
              $(this)[0].reset();
              return false;
          });

          $('body').on('submit', 'form#new_answers', function (e) {
              e.preventDefault();
              var text = $('.your-answer').val();
              var question = $('.qinputid').text();
              var data = {
                  answer: {
                      "text": text,
                          "question_id": question
                  }
              };
              $.post('/answers', data, function (response) {});
              Player.appendAnswer(text, cDOMO);
              $(this)[0].reset();
              $("#fancybox").fadeOut();
              $("#modal").fadeOut();
              return false;
          });

          $('form#new_flashcard').submit(function (event) {
              event.preventDefault();
              var data = $(this).serialize();
              $.post('/flashcards', data, function (response) {
                  $('span[data-content-id="' + Player.getContentId() + '"]').html(response);
              });
              $(this)[0].reset();
              return false;
          });

          $('.user-input-tab').click(function () {
              Player.changeUserInputTabs($(this).attr('data-tab-content'));
          });

          $('#modal').click(function () {
              $("#fancybox").animate({
                  'opacity': 0
              }, 800);
              $("#fancybox").css('visibility', 'hidden');
              $("#modal").animate({
                  'opacity': 0
              }, 800);
              $("#modal").css('visibility', 'hidden');
              Player.playVideo();

          });

          $('.show_all_answers').on('click', function (e) {
              $(this).parent().parent().parent().parent().siblings('.lanswer-container').slideToggle(500);
              return false;
          });
      },

      prependQuestion: function (title, text) {
          var that = '.lquestion-container.' + Player.prependCount;
          var standardText = "just added by you";
          $('.live-questions-feed-container').prepend("<div class='lquestion-container " + Player.prependCount + "'></div>");
          $(that).loadTemplate($("#question-template"), {
              title: title,
              text: text,
              author: standardText
          });
          $(that).slideDown('slow');
          setTimeout(function () {
              Player.showBody($(that))
          }, 800);
          Player.prependCount++;
      },

      appendAnswer: function (title, DOMObject) {
          var that = '.answer-wrapper.' + Player.appendCount;
          $(DOMObject).children('.lanswer-container').append($("<div class='answer-wrapper " + Player.appendCount + "'></div>"));
          $(that).loadTemplate($("#answer-template"), {
              text: title
          });
          $(that).slideDown('slow');
          Player.appendCount++;
      },

      changeUserInputTabs: function (contentType) {
          if (contentType == 'question') {
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

      makeActiveQuestionsVisibleController: function (second) {
          Player.makeActiveQuestionsVisible(parseInt(second));
      },

      makeActiveQuestionsVisible: function (second) {
          var that = $('.lquestion-container.t' + second);
          $('.live-questions-feed-container').prepend(that);
          var newQ = $('.live-questions-feed-container').children('.lquestion-container.t' + second);
          newQ.slideDown('slow');
          setTimeout(function () {
              Player.showBody(that)
          }, 800);
      },

      showBody: function (that) {
          that.children(".question-wrapper").children('.lquestion').children('.triangle-border').children('.lquestion-body').slideDown('fast');
      },

      onPlayerStateChange: function (newState) {
          Player.updateHTML("playerState", newState);
          Player.updatePlayerButtonStatus(newState);
      },

      updatePlayerButtonStatus: function (state) {
          if (state == 1 || state == 2) {
              Player.changePlayPauseButtonStatus(state);
          };
      },

      changePlayPauseButtonStatus: function (state) {
          if (state == 1) {
              $('.button-play-pause').attr('data-status', 'play').children('.play-pause-icon').css('background-position', '0px -16px');
          } else {
              $('.button-play-pause').attr('data-status', 'pause').children('.play-pause-icon').css('background-position', '0px 0px');
          };
      },

      activatePlayPauseButton: function () {
          $('.button-play-pause').click(function () {
              if ($(this).attr('data-status') == 'play') {
                  Player.pauseVideo();
                  Player.changePlayPauseButtonStatus(2);
              } else {
                  Player.playVideo();
                  Player.changePlayPauseButtonStatus(1);
              }
          })
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
              Player.ytplayer.addEventListener("onStateChange", "Player.Player.onPlayerStateChange");
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
          return window.setInterval(function () {}, 0);
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
          var realTime = Player.getTotalTime() * progressRatio;

          Player.makeActiveQuestionsVisibleController(realTime);
      },

      playVideo: function () {

          if (Player.ytplayer) {
              Player.ytplayer.playVideo();
              Player.id = Player.Test();
          };

      },

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
          Player.ytplayer.addEventListener("onStateChange", "Player.onPlayerStateChange");
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