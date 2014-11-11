/**
 * Scroll Into View
 */
videojs.plugin('scrollIntoView', function() {
    var myPlayer = this;
  
    var isScrolledIntoView = function(elem) {
        // get the position of the viewport
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        // get the position of the player element
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        // determine if the player element is in fully in the viewport
        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
          && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
    }
    
    var checkIfVideoInView = function() {
        if ( isScrolledIntoView(video_1) ) {
            // the player is fully in the viewport
            myPlayer.play();
        } else {
            // the player is not in the viewport
            myPlayer.pause(); 
        }
    }
		
		window.onscroll = checkIfVideoInView;
      
//    });
});