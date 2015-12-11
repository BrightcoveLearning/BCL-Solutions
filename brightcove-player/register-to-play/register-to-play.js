videojs.plugin('registerToPlay', function(options) {
    var myPlayer = this;

    /**
     * hides the overlay, unhides the controls, and plays the video
     * this function is called from the registration form in the iframe
     * and that is why it is defined in the global scope
     */
    playVideo = function () {
        // hide the overlay, show the controls, play
        myPlayer.addClass('hide-overlay');
        myPlayer.removeClass('hide-controls');
        myPlayer.play();
    };

    // initially hide the controls and show the overlay
    myPlayer.removeClass('hide-overlay');
    myPlayer.addClass('hide-controls');

});
