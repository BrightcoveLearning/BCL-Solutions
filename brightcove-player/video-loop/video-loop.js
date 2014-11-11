/**
 * Video Loop
 */
videojs.plugin('videoLoop', function() {
	var myPlayer = this,
      videoLoopNum = 0;
  
  // listen for the "ended" event and play the video
  myPlayer.on("ended", function () {
      playVideo();
  });
  
  function playVideo () {
      // stop looping the video after 5 times
      if (videoLoopNum < 5) {
          // play the video
          myPlayer.play();
          // increment number of times video played
          videoLoopNum++;
      }
  }
  
  // play the video first time
  playVideo();
});