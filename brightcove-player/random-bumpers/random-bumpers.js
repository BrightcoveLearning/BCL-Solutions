/**
 * Random Bumpers
 */
videojs.plugin('randomBumpers', function() {
    var myPlayer = this,
        currentVideoIndex = 0,
        currentBumperIndex = 0,
        bumperRandomNumber,
        playBumper = true,
        firstTime = true,
        playlistData = [
          {
          "name":"Bird Chickadee", 
          "sources":[
            {
            "type":"video/mp4",
            "src":"http://solutions.brightcove.com/bcls/assets/videos/Bird_Titmouse.mp4"
            }
          ]},
          {
          "name":"Sea Clownfish", 
          "sources":[
            {
            "type":"video/mp4",
            "src":"http://solutions.brightcove.com/bcls/assets/videos/Sea_ClownFish.mp4"
            }
          ]},
          {
          "name":"Sea Lionfish", 
          "sources":[
            {
            "type":"video/mp4",
            "src":"http://solutions.brightcove.com/bcls/assets/videos/Sea_LionFish.mp4"
            }
          ]}
        ],
        bumperData = [
          {
          "name":"bumper1",
          "sources":[
            {
            "type":"video/mp4",
            "src":"http://solutions.brightcove.com/bcls/ads/bc-ads/bcls-ad-3-8seconds.mp4"
            }
          ]},
          {
          "name":"bumper2", 
          "sources":[
            {
            "type":"video/mp4",
            "src":"http://solutions.brightcove.com/bcls/ads/bc-ads/bcls-ad-5-7seconds.mp4"
            }
          ]}
        ],
        playlistDataLength = playlistData.length,
        bumperDataLength = bumperData.length;
  
    function playVideo () {
        if (currentVideoIndex < playlistDataLength) {
            // alternate between playing a bumper video and a regular video
            if (playBumper){
                playBumper = false;
                // randomly select the bumper video to play
                bumperRandomNumber = Math.floor(Math.random()*bumperDataLength);
                // load the bumper video
                myPlayer.src(bumperData[bumperRandomNumber].sources);
            } else {
                playBumper = true;
                // load the next video
                myPlayer.src(playlistData[currentVideoIndex].sources);
                // increment the current video index
                currentVideoIndex++;
            }
            // play the video
            if (firstTime) {
               firstTime = false; 
            } else {
               myPlayer.play();  
            }  
        }
    };
	
    // listen for the "ended" event and play the next video or bumper
    myPlayer.on("ended", function () {
        playVideo();
    });
  
    // load the first bumper video
    playVideo();
});