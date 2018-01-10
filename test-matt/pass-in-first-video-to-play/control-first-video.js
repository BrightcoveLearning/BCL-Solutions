videojs.registerPlugin('controlFirstVideo', function() {
  var myPlayer = this,
    passedVideoID;

  // This method called when postMessage sends data into the iframe
  function playVideo(evt){
    var videoIndex;
    // Retrieve data stored in the object passed via postMessage
    passedVideoID = evt.data;
    console.log('passedVideoID - with playlist control 358', passedVideoID);
    // Retrieve desired video object using Video Cloud catalog
    myPlayer.catalog.getVideo(passedVideoID, function(error, video){
      //deal with error
      // Use the Playlist API to find location of the video in the playlist, then load into the player and play it
      videoIndex = myPlayer.playlist.indexOf(video);
      myPlayer.playlist.currentItem(videoIndex);
      myPlayer.play();
    });
  };
  // Listen for the message, then call controlVideo() method when received
  window.addEventListener("message",playVideo);
});
