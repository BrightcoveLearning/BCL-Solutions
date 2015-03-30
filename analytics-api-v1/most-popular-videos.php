<?php
/*!
| @ Sends the request
| @return string
 */
function SendRequest($url, $method, $data, $headers) {
	$context = stream_context_create(array
		(
			"http"     => array(
				"method"  => $method,
				"header"  => $headers,
				"content" => http_build_query($data)
			)
		));
	return file_get_contents($url, false, $context);
}
// set up request for access token
$data = array();

$client_id     = "5746d707-db97-42b2-b4f0-3db890429ef0";
$client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg";
$auth_string   = "{$client_id}:{$client_secret}";
$request       = "https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials";
$ch            = curl_init($request);
curl_setopt_array($ch, array(
		CURLOPT_POST           => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_SSL_VERIFYPEER => FALSE,
		CURLOPT_USERPWD        => $auth_string,
		CURLOPT_HTTPHEADER     => array(
			'Content-type: application/x-www-form-urlencoded',
		),
		CURLOPT_POSTFIELDS => $data
	));
$result = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
	die(curl_error($ch));
}

// Decode the response
$resultData   = json_decode($result, TRUE);
$access_token = $resultData["access_token"];

// set up the API call
// no data to submit
$data = array();
// get current time and 24 hours ago in milliseconds
$to   = time()*1000;
$from = $to-(24*60*60*1000);

$method = "GET";
// get the URL and authorization info from the form data
$request = "https://analytics.api.brightcove.com/v1/data?accounts=20318290001&dimensions=video&limit=6&sort=video_view&fields=video&from={$from}&to={$to}";
// add headers
$headers = array(
	1=> "Authorization: Bearer {$access_token}",
	2=> "Content-type: application/x-www-form-urlencoded",
);

//send the http request
$result = SendRequest($request, $method, $data, $headers);
?>

<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" />
  <!-- change title to match the h1 heading -->
  <title>Player System Overview</title>
  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/css/foundation.min.css" />
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/css/normalize.css" />
  <script src="//use.edgefonts.net/source-code-pro.js"></script>
  <link href="//files.brightcove.com/proxima-nova/font-faces.css" rel="stylesheet" type="text/css">
  <link rel="stylesheet" type="text/css" href="//docs.brightcove.com/en/styles/bcls-doc-site.css">
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/styles/github.min.css">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];
a.async=1;
a.src=g;
m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-2728311-29', 'auto');
  ga('send', 'pageview');

</script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/js/vendor/modernizr.js"></script>
  </head>
	<style id="pageStyles">
	.playlist {
		color: #f5f5f5;
		background-color: #333;
		border-radius: 5px;
		display: inline-block;
		width: 200px;
		height: 360px;
		overflow-y: scroll;
		padding: 5px;
		text-align: center;
	}
	.playlist-item {
		cursor: pointer;
		font-size: small;
		margin: 10px 0;
		text-align: center;
	}
	</style>
</head>
<body>
  <!-- header navbar -->
	<div id="navWrapper" class="fixed"></div>
	<!-- breadcrumbs -->
	<nav id="breadCrumbWrapper" class="breadcrumbs show-for-medium-up"></nav>
  <!-- search -->
  <div id="searchModal" class="reveal-modal" data-reveal></div>
  <!-- content -->
    <div class="row">
        <div id="main" class="large-12 small-12 columns">
      <div id="top" class="section">
		<h1>Most Popular Videos</h1>
		</div>
	<div class="section" id="introduction">
		<h2>Introduction</h2>
		<p>This sample retrieves the popular videos of the day using the Analytics API, gets the video data using the Media API, creates a playlist of the videos, and uses the Brightcove Player API to load the videos into the player.</p>
	</div>
	<div class="section" id="player">
		<h2>The functional sample</h2>
		<!-- Start of Brightcove Player -->
		<video data-account="20318290001" data-player="c9b8844f-c361-490b-9d0d-acc33ff0e968" data-embed="default" data-video-id="" class="video-js" controls></video>
        <script src="//players.brightcove.net/20318290001/c9b8844f-c361-490b-9d0d-acc33ff0e968_default/index.min.js"></script>

		<!-- End of Brightcove Player -->
		<div id="playlist" class="playlist">
			<h4 style="margin: 5px;">Most popular videos</h4>
		</div>
	</div>
	<div class="section" id="logic">
		<h2>How it is done</h2>
		<h3>The Analytics API part</h3>
		<p>The Analytics API part here is simple: request a report on dimension <code>video</code>, set the <code>limit</code> to the number of videos you want to display, sort the results by <code>video_view</code>, and set the <code>from</code> and <code>to</code> parameters to the appropriate start and end times. In this example we are reporting on the period starting 24 hours before now &mdash; for a very active Video Cloud account, you may want to use a shorter period.</p>
		<p class="text-warning">Note that the Analytics API call is made using PHP, because the server does not currently permit cross-domain requests. In this example, the results from this request are simply set as the value of a JavaScript variable, and all other processing is handled on the client side.</p>
		<h4>PHP Code for the Analytics API request:</h4>
		<p><script src="https://gist.github.com/524bf403f871721777a9.js"></script></p>
		<h3>The Media API part</h3>
		<p>Using the video ids from the returned Analytics data (the <code>video</code> metric) and the open source Media API wrapper for JavaScript, we call the <code>find_videos_by_ids</code> method to return the <code>id</code>, <code>name</code>, and the <code>thumbnailURL</code> for each of the most viewed videos. This data is used to populate the Popular Videos list, using the Handlebars templating system to simplify the code.</p>
		<h3>The Smart Player API part</h3>
		<p>The Smart Player API is simply used to cue and load videos. In the handler for the <code>templateReady</code> event, we get a reference to the <code>VIDEO_PLAYER</code> module, and then set up a listener for click events on the video items, loading the respective item into the player when it is clicked. We also cue the first the video so that player will not be initially empty.</p>
		<h4>CSS code for Media and Smart Player API</h4>
		<p><script src="https://gist.github.com/6825feaa251e9f4035ec.js"></script></p>
		<h4>JavaScript code for Media and Smart Player API</h4>
		<p><script src="https://gist.github.com/f6f9363f5f92a8791bcb.js"></script></p>
	</div>
	<!-- display the result -->
	<pre><code id="response"></code></pre>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.3/fastclick.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/foundation/5.5.0/js/foundation.min.js"></script>

  <script src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0/handlebars.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js"></script>
    <script src="//docs.brightcove.com/en/scripts/docs-nav-data.min.js"></script>
    <script src="//docs.brightcove.com/en/scripts/bcls-doc-site.js"></script>
    <script src="//docs.brightcove.com/en/scripts/bc-mapi.js"></script>
	<script id="pageScript">
	var BCLS = ( function ($, Handlebars, BCMAPI) {
		var JSONresponse = <?php echo $result;?>,
			videoArray = [],
			params = {},
			player,
			videoPlayer,
			APIModules,
			mediaEvent,
			handleBarsTemplate = "{{#items}}<div id=\"{{id}}\" class=\"playlist-item\"><img src=\"{{thumbnailURL}}\" width=\"160\" height=\"90\" /><p>{{name}}</p></div>{{/items}}",
			$playlistItems,
            /**
             * Logging function - safe for IE
             * @param  {string} context description of the data
             * @param  {*} message the data to be logged by the console
             * @return {}
             */
            bclslog = function (context, message) {
                if (window["console"] && console["log"]) {
                  console.log(context, message);
                };
                return;
            };
			bclslog("JSONresponse", JSONresponse);
			// set up the Media API call, using data from the Analytics API call
			BCMAPI.url = "http://api.brightcove.com/services/library";
			BCMAPI.token = "v87kWelIdjUwVm7_Rzv09k-KqtLz-ty8ONbMxVYAI7-Q0eOilegqqg..";
			BCMAPI.callback = "BCLS.onMAPIresponse";
		for (var i = 0, max = JSONresponse.items.length; i < max; i++) {
			if (JSONresponse.items[i].video !== null) {
                videoArray.push(JSONresponse.items[i].video);
            }
		}
		bclslog("videoArray", videoArray);
		params.video_ids = videoArray.join();
		params.video_fields = "id,name,thumbnailURL";
		BCMAPI.find("find_videos_by_ids", params);
		// dump the raw response into the page
		$("#response").html(JSONresponse);
		return {
			onMAPIresponse : function(jsonData) {
				bclslog("jsondata", jsonData);
				// merge the data into the html template using Handlebars
				var template = Handlebars.compile(handleBarsTemplate),
				data = jsonData,
				results = template(data);
				// inject the HTML for the video list
				$("#playlist").append(results);
				// get a reference to the collection of video items
				$playlistItems = $(".playlist-item");
			}
		}
	})($, Handlebars, BCMAPI);
	</script>

    <script>
        $(document).foundation();
    </script>
</body>
</html>
