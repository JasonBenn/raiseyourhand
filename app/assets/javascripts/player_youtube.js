  var Player = {
      videoCount: 0,
      currentVideoID: null,
      checker: false,
      id: null,
      ytplayer: document.getElementById("ytPlayer"),
      contents: [],
      cID: null,

      init: function () {
          // Maybe move all the document ready in here
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
              Player.updateHTML("videoDuration", Player.ytplayer.getDuration());
              Player.updateHTML("videoCurrentTime", Player.ytplayer.getCurrentTime());
          };

          if (Player.ytplayer.getCurrentTime() >= parseInt(Player.contents[Player.videoCount][2]) && Player.checker == false) {
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

          if (Player.currentVideoID !== Player.contents[videoID][0]) {
              Player.ytplayer = document.getElementById("ytPlayer");
              setInterval(Player.updatePlayerInfo, 250);
              Player.updatePlayerInfo();
              Player.ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
              Player.ytplayer.addEventListener("onError", "onPlayerError");
              Player.ytplayer.loadVideoById({
                  'videoId': Player.contents[videoID][0],
                      'startSeconds': timeinCut,
                      'endSeconds': Player.contents[videoID][2],
                      'suggestedQuality': "default"
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
          $("#questions-answers").scrollTop(Player.ytplayer.getCurrentTime() * 149);
      },

      playVideo: function () {

          if (Player.ytplayer) {
              Player.ytplayer.playVideo();
          };
          Player.id = Player.Test();
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
                  'suggestedQuality': "default"
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
              "videoDiv", "900", "500", "9", null, null, params, atts);
      },

      _run: function () {
          Player.loadPlayer();
      }
  };
  google.setOnLoadCallback(Player._run);