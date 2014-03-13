videojs.plugin('navigateOnVideoEnd', function () {
  var myPlayer = this,
    redirectURL = "http://www.brightcove.com",
    onButtonSelect = function () {
      // redirect the page to the specified URL link
      window.location.href = redirectURL;
    };
  myPlayer.on("ended", function () {
    document.getElementById("continueButton").className = "buttonShow";
  });
  myPlayer.on("play", function () {
    document.getElementById("continueButton").className = "buttonHide";
  });
});