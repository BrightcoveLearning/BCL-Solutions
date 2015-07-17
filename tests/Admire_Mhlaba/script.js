// Code goes here
// Code goes here
videojs("myPlayerID").ready(function() {
    var myPlayer = this;
    videojs.plugin('multipleVideo', function() {

            var // myPlayer = document.getElementById("video_1"),
            timeRemaining,
            totalTime,
            currentVideoIndex = 0,
            newVideo,
            firstVideo = true,
            playlistData = [
                    {
                    "sources":[
                        {
                          "src":"http://www.youtube.com/watch?v=ur-gl9hryRE"
                        }
                    ]
                    },
                    {
                    "sources":[
                        {
                          "src":"https://www.youtube.com/watch?v=weqzAM5LCIY"
                        }
                    ]
                    },
                    {
                    "sources":[
                        {
                          "src":"https://www.youtube.com/watch?v=nmC6rZyByzk"
                        }
                    ]
                    },
                    {
                    "sources":[
                        {
                          "src":"https://www.youtube.com/watch?v=Pv7lgQ8hiz0"
                        }
                    ]
                    }
                ];

        function loadVideo () {
            if (currentVideoIndex < playlistData.length) {
                // load the new video
                myPlayer.src(playlistData[currentVideoIndex].sources);
                // increment the current video index
                currentVideoIndex++;
                // play the video
                if(firstVideo) {
                    firstVideo = false;
                } else {
                      myPlayer.play();

                      if(currentVideoIndex == (playlistData.length - 1))
                      {
                        currentVideoIndex = 0;
                        firstVideo = true;
                      }
                }
            }
        }

        myPlayer.on("ended", function () {
            loadVideo();
        });
        // load the first video
        loadVideo();
    });
}
