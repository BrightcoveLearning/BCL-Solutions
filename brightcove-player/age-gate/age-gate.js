/**
 * Age Gate
 */
videojs.plugin('ageGate', function() {
	var myPlayer = this,
      eAgeGateButton;
  myPlayer.addClass("video-agelist");
  
  // listen for the "loadedmetadata" event, show the controls and play the video
  myPlayer.on("loadedmetadata", function() {
      eAgeGateButton = document.getElementById("ageGateButton");
      eAgeGateButton.addEventListener("click", function() {
          myPlayer.removeClass("video-agelist");
          myPlayer.play();
      });
  });
  
});