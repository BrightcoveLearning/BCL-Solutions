/**
 * Live Custom Error
 */
videojs.plugin('liveCustomError', function() {
    
    var myPlayer = this,
        overlayDisplayed;
     
		myPlayer.ready(function(){
				console.log("ready");

				myPlayer.addClass("hide-overlay");
				overlayDisplayed = false;

				myPlayer.on("error", handleError);

				function handleError(err) {
						var errNo = myPlayer.error().code;
						var duration = myPlayer.duration();

						if ((errNo == '2') && (duration=='0')) {
								myPlayer.removeClass("hide-overlay");
								overlayDisplayed=true;
						}
				}	
		});
});