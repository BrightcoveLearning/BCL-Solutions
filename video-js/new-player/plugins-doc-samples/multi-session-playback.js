videojs.plugin('multiSessionPlayback', function() {
    var read_cookie = function(key){
  var result;
  return (result = new RegExp('(^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? result[2] : null;
    }

    var myPlayer = this,
  videoStart = 0,
  currentPosition,
  cookie = read_cookie("BC_position");

    if(cookie != null){
  videoStart = cookie;
    } else {
  videoStart = 0;
    }

    myPlayer.on("loadedmetadata", function () {
  if (videoStart > 0) {
      myPlayer.currentTime(videoStart);
      myPlayer.play();
  }
    })

    myPlayer.on("timeupdate", function() {
  currentPosition = myPlayer.currentTime();
  if (Math.round(currentPosition) != videoStart) {
      videoStart = Math.round(currentPosition);
      document.cookie="BC_position=" + escape(videoStart) + ";";
  }
    });

    myPlayer.on("ended", function () {
  videoStart = 0;
  document.cookie="BC_position=;expires=0";
    })
});