(function() {

	// utility
    function logit(context, message) {
        if (console) {
	        console.log(context, message);
        }
    }
	
	logit("plugin", "htmlOverlay.js loaded");
	
	function onPlayerReady() {
        overlay = videoPlayer.overlay();

        $fb.appendTo(overlay);
		$fb.hide();

        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.STOP, mediaStopHandler);
        videoPlayer.addEventListener(brightcove.api.events.MediaEvent.PLAY, mediaBeginHandler);
    }

    function onScrollClicked(e) {
        window.open('http://support.brightcove.com/en/video-cloud/training-videos', '_newtab'); 
    }
	
	function hideFB() {
        $fb.hide(); 
    }

    function mediaBeginHandler(e) {
        $fb.hide();
        setTimeout(function drawCanvas(){
           scrollBug = document.createElement('canvas');
           scrollBug.height = 30;
           scrollBug.width = 480;
           $(scrollBug).css({
              position: 'absolute',
              top: '10px',
           });
           context = scrollBug.getContext('2d');
           context.fillStyle = "White"
           context.shadowColor = "Black";
           context.shadowOffsetX = 2;
           context.shadowOffsetY = 2;
           context.shadowBlur = 3;
           context.font = "18pt Segoe UI";

           var text = 'Watch Brightcove Training Videos - Tap Here.'
           var metrics = context.measureText(text);

           currentX = scrollBug.width;
           currentY = scrollBug.height - 10;
           clearInterval(marquee);
           marquee = setInterval(function() {
              context.clearRect( 0, 0, 480, 30 );
              context.fillText( text, currentX, currentY );
              currentX -= 2;
              if( currentX + metrics.width < 0 ) {
                 currentX = 600;
              }
           }, 20 );
           $(scrollBug).click(onScrollClicked);
           overlay.appendChild(scrollBug);
        },1);
    }

    function mediaStopHandler(e) {
        overlay.removeChild(scrollBug);
        $(".fb-like").css({'background-color':'gray','height':'60%','width':'100%','border':'thin solid black','padding':'70px 0 0 85px','margin':'0 0 0 0','opacity':'.8'});
        setTimeout($fb.show(),300);
    }

	var player,
		videoPlayer,
		experience,
		content,
		overlay,
		scrollBug,
		marquee,
		$fb,
		fbroot;
	
    player = brightcove.api.getExperience();
    videoPlayer = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
    experience = player.getModule(brightcove.api.modules.APIModules.EXPERIENCE);
    content = brightcove.api.getExperience('myExperience').getModule('content');

    $fb =
       $('<div class="fb-like" data-send="false" data-width="100%" data-show-faces="false" data-font="arial"></div>')
          .hide()
          .appendTo(document.body);

    if (experience.getReady()) {
        onPlayerReady();
    } else {
        experience.addEventListener(brightcove.player.events.ExperienceEvent.TEMPLATE_READY, onPlayerReady);
    }

    fbroot = document.createElement('div')
    fbroot.id = 'fb-root';
    document.body.appendChild(fbroot);

    (function(d, s, id) {
           var js, fjs = d.getElementsByTagName(s)[0];
           if (d.getElementById(id)) return;
           js = d.createElement(s); js.id = id;
           js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
           fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

}());