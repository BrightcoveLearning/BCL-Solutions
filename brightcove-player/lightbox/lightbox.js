/**
 * Manage a lightbox player over
 * a simple scroller of video thumbnails
 */
videojs.plugin('lightbox', function() {
	var myPlayer = this,
	playlistData = [
		{
		"shortDescription":"Tiger", 
		"thumbnailURL":"//solutions.brightcove.com/bcls/assets/images/Tiger.jpg",
		"sources":[
			{
			"type":"application/x-mpegURL",
			"src":"http://solutions.brightcove.com/bcls/assets/videos/Tiger.m3u8"
			},
			{
			"type":"video/mp4",
			"src":"http://solutions.brightcove.com/bcls/assets/videos/Tiger.mp4"
			}
			]
		},
		{
		"shortDescription":"Great Blue Heron", 
		"thumbnailURL":"//solutions.brightcove.com/bcls/assets/images/Great-Blue-Heron.png",
		"sources":[
			{
			"type":"application/x-mpegURL",
			"src":"http://solutions.brightcove.com/bcls/assets/videos/Great-Blue-Heron.m3u8"
			},
			{
			"type":"video/mp4",
			"src":"http://solutions.brightcove.com/bcls/assets/videos/Great-Blue-Heron.mp4"
			}
			]	
		},
		{
		"shortDescription":"Birds of a Feather", 
		"thumbnailURL":"http://solutions.brightcove.com/bcls/assets/images/BirdsOfAFeather.png",
		"sources":[
			{
			"type":"video/mp4",
			"src":"http://solutions.brightcove.com/bcls/assets/videos/BirdsOfAFeather.mp4"
			}
			]	
		},
		{
		"shortDescription":"Sea Marvels", 
		"thumbnailURL":"http://solutions.brightcove.com/bcls/assets/images/Sea Marvels.png",
		"sources":[
			{
			"type":"video/mp4",
			"src":"http://solutions.brightcove.com/bcls/assets/videos/Sea-Marvels.mp4"
			}
			]	
		}
	];
	
	console.log("here in lightbox plugin");
	
	function buildPlaylistData() {
		// build the scroller of video thumbnails and descriptions
		var str = "";
		for (var i in playlistData) {
			str += "<div id='scroller-item'><img id='" + i + "' src='" + playlistData[i].thumbnailURL +
				"' /><div class=\"scroller-caption\"><span>" +
				playlistData[i].shortDescription + "</span></div></div>";
		}
		document.getElementById("scroller").innerHTML = str;
		
		scroller.onclick = function(e) {
			// console.log("EVENT.onClick video:" + e.target.id);
			// load the selected video
			myPlayer.src(playlistData[e.target.id].sources);
			// reveal the lightbox
			document.getElementById("playerLightbox").className = "playerShow";

			// play the video
			myPlayer.play();
		}
		
		playerClose.onclick = function(e) {
			myPlayer.pause();
			// hide the lightbox
			document.getElementById("playerLightbox").className = "playerHide";
		}
	};
	
	buildPlaylistData();

});
