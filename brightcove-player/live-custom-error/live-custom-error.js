/**
 * Live Custom Error
 */
videojs.plugin('liveCustomError', function() {

    var myPlayer = this,
        showOverlay = false;

        myPlayer.errors({
            'errors': {
                '2': {
                    'headline': 'The Live Event you are trying to watch is either unavailable or has not started',
                    'type': 'MEDIA_UNAVAILABLE',
                }
            }
        });

        myPlayer.on("error", handleError);

        function handleError(err) {
            var errNo = myPlayer.error().code;
            var duration = myPlayer.duration();

            if (((errNo == '2') && (duration =='0')) || (errNo == '4') && (duration == '0')) {
                showOverlay = true;
            }
        }

        myPlayer.ready(function(){
            if (showOverlay) {
                // show overlay image
                myPlayer.removeClass("hide-overlay");
            } else {
                // hide overlay image
                myPlayer.addClass("hide-overlay");
            }
        });
});
