var videoCount = 0;

function updateProgressBar(currentTime, duration) {
    if (currentTime !== 0 && duration !== 0) {
        var progressRatio = currentTime / duration;
        var progressUpdate = 800 * progressRatio;
    }
    $('.progress').css('width', progressUpdate);
}

function updateHTML(elmId, value) {
    document.getElementById(elmId).innerHTML = value;
}

// function updateValue(elmId, value) {
//     document.getElementById(elmId).value = value;
// }

function onPlayerError(errorCode) {
    alert("An error occured of type:" + errorCode);
}

function onPlayerStateChange(newState) {
    updateHTML("playerState", newState);
}

function updatePlayerInfo() {
    if (ytplayer && ytplayer.getDuration) {
        updateHTML("videoDuration", ytplayer.getDuration());
        updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
        updateProgressBar(ytplayer.getCurrentTime(), ytplayer.getDuration());

        if (ytplayer.getCurrentTime() >= contents[videoCount][2] ) {
            newVid();
        }
    }

    $("#"+Math.round(ytplayer.getCurrentTime())).show("display", "inline");
}

function setVideoVolume() {
    var volume = parseInt(document.getElementById("volumeSetting").value);
    if (isNaN(volume) || volume < 0 || volume > 100) {
        alert("Please enter a valid volume between 0 and 100.");
    } else if (ytplayer) {
        ytplayer.setVolume(volume);
    }
}

function seekTo(time) {
    if (ytplayer) {
        ytplayer.seekTo(time, true);
    }
}

var id;

var Test = function () {
    return window.setInterval(function () {
        changeCss();
    }, 0);
};


var changeCss = function () {

    $("#questions-answers").scrollTop(ytplayer.getCurrentTime()*149);
};

function playVideo() {
    if (ytplayer) {
        ytplayer.playVideo();
    }
    id = Test();
}

function pauseVideo() {
    if (ytplayer) {
        ytplayer.pauseVideo();
    }
    window.clearInterval(id);
}



function onYouTubePlayerReady(playerId) {
    ytplayer = document.getElementById("ytPlayer");
    setInterval(updatePlayerInfo, 250);
    updatePlayerInfo(playerId);
    ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
    ytplayer.addEventListener("onError", "onPlayerError");
    // This loads the video based on the predefined start and endtime set when creating the course
    ytplayer.cueVideoById({videoId:video_link, startSeconds:start_time, endSeconds:end_time, suggestedQuality:"highres"});
    videoCount = 0;
}

function newVid(playerId) {
    ytplayer = document.getElementById("ytPlayer");
    setInterval(updatePlayerInfo, 250);
    updatePlayerInfo();
    ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
    ytplayer.addEventListener("onError", "onPlayerError");
    videoCount ++;
    ytplayer.loadVideoById({'videoId':contents[videoCount][0], 'startSeconds':contents[videoCount][1], 'endSeconds':contents[videoCount][2], 'suggestedQuality':"highres"});
}

function loadPlayer() {
    var params = {
        allowScriptAccess: "always"
    };
    var atts = {
        id: "ytPlayer"
    };

    swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
        "version=3&enablejsapi=1&playerapiid=player1",
        "videoDiv", "900", "500", "9", null, null, params, atts);
}

function _run() {
    loadPlayer();

}

google.setOnLoadCallback(_run);