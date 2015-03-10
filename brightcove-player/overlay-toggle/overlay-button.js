/**
 * Overlay Button
 */
videojs.plugin('overlayButton', function() {
    
    var myPlayer = this,
        overlayDisplayed,
        eOverlayButton = document.getElementById("overlayButton");

    videojs("video_1").ready(function(){
        myPlayer = this;

        // initially hide the overlay
        overlayDisplayed = false;
        myPlayer.addClass("hide-overlay");

        eOverlayButton.addEventListener("click",function(){
            if (overlayDisplayed) {
                // hide the overlay
                overlayDisplayed = false;
                myPlayer.addClass("hide-overlay");
            } else {
                // show the overlay
                overlayDisplayed = true;
                myPlayer.removeClass("hide-overlay");
            }                
        });
    }); 
});