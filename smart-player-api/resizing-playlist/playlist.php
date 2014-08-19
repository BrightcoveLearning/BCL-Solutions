<?php
require_once('../../scripts/bc-mapi.php');
/* https://github.com/BrightcoveOS/PHP-MAPI-Wrapper
  On a production site use the cache extension */

$read_token = "4padFp2KtFo3R8px9Gy8ugjQ1Pedl6fqsdp71_6Z9b6YOmzse5_G5g..";
$playlist_id = "1492396528001";

$bc_api = new BCMAPI($read_token, '');
$params = array( 'video_fields' => 'id,name,shortDescription,videoStillURL', 'playlist_id' => $playlist_id );
try {
	$playlist = $bc_api->find('playlistbyid', $params);
} catch(Exception $error) {
    echo $error;
    die();
}
?><!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Playlist</title>
	<style type="text/css">
		.playlist-item {
			float: left;
			width: 400px;
			height:90px;
			background-color: #EEE;
			font-size: 80%;
			padding: 5px;
			margin: 2px;
		}
		.playlist-item img {
			float:left;
			width:40%;
		}
	</style>
	<script src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>
	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>

</head>
<body>
	<h1>Server-side playlist example</h1>

	<object id="myExperience" class="BrightcoveExperience">
	  <param name="bgcolor" value="#000000" />
	  <param name="width" value="480" />
	  <param name="height" value="270" />
	  <param name="playerID" value="1150189326001" />
	  <param name="playerKey" value="AQ~~,AAAA0vRfoQE~,baHF9-H5aHJPAl3cZ-KjgHH9A7WtanGe" />
	  <param name="isVid" value="true" />
	  <param name="isUI" value="true" />
	  <param name="dynamicStreaming" value="true" />
	  <param name="wmode" value="transparent" />
	  <param name="@videoPlayer" value="1401169490001" />
	  <param name="includeAPI" value="true" />
	  <param name="templateLoadHandler" value="onTemplateLoaded" />
	</object>
	<div id="playlist">
<?php
foreach ($playlist->videos as $video) {
	echo "<div class=\"playlist-item\" data-videoid=\"{$video->id}\">\n";
	echo "<img src=\"{$video->videoStillURL}\"/>\n";
	echo "<p><strong>{$video->name}</strong></p>\n";
	echo "<p><em>{$video->shortDescription}</em></p>\n";
	echo "</div>\n";
}
?>
	</div>
	<script>
	var video_player_module;
	function onTemplateLoaded(id) {
		var player = brightcove.api.getExperience(id);
		video_player_module = player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);
	}
	function playvideo() {
		var video_id = $(this).data('videoid');
		if (video_player_module.canPlayWithoutInteraction()) {
			video_player_module.loadVideoByID(video_id);
		} else {
			video_player_module.cueVideoByID(video_id);
		}
	}
	$('.playlist-item').on('click',playvideo);
	</script>
</body>
</html>
