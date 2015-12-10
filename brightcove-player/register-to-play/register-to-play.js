videojs.plugin('pluginDev', function(options) {
    var player = this;

    /**
     * hides the overlay, unhides the controls, and plays the video
     * this function is called from the registration form in the iframe
     * and that is why it is defined in the global scope
     */
    playVideo = function () {
        myPlayer.addClass('hide-overlay');
        myPlayer.removeClass('hide-controls');
        myPlayer.play();
    };

    // initially hide the controls and show the overlay
    myPlayer.removeClass('hide-overlay');
    myPlayer.addClass('hide-controls');

});
