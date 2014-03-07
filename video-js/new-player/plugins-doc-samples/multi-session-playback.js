videojs.plugin('firstPlugin', function() {
  var myPlayer = this,
    videoStart = 0,
    currentPosition,
    cookie = read_cookie("BC_position");
  
  if(cookie != null){
    videoStart = cookie;
  } else {
    videoStart = 0;
  }
  
  myPlayer.ready(function () {
    //console.log("player loaded");
    
    myPlayer.on("loadedmetadata", function () {
      //console.log("videoStart= " + cookie);
      //document.getElementById("cookieDisplay1").innerHTML = read_cookie("BC_position");
      if (videoStart > 0) {
        myPlayer.currentTime(videoStart);
        myPlayer.play();
      }
    });

    myPlayer.on("timeupdate", onPosition);
    
    myPlayer.on("ended", function () {
      videoStart = 0;
      document.cookie="BC_position=0;";
    });
  });
    
  function onPosition(evt) {
    //console.log(myPlayer.currentTime());
    currentPosition = myPlayer.currentTime();
    if (Math.round(currentPosition) != videoStart) {
      videoStart = Math.round(currentPosition);
      document.cookie="BC_position=" + escape(videoStart) + ";";
      //document.getElementById("cookieDisplay2").innerHTML = read_cookie("BC_position");
    }
  }
    
  function read_cookie(key){
    var result;
    return (result = new RegExp('(^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? result[2] : null;
  }
});