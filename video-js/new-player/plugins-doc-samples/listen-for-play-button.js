videojs.plugin('listenForPlayButton', function() {
  var player = this,
  playVideo = function(evt){
      if(evt.data === "playVideo"){
        player.play();  
      }
  };
  window.addEventListener("message",playVideo);
});