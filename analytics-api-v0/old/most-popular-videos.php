<?php
/*!
  | @ Sends the request
  | @return string
  */
  function SendRequest( $url, $method = "GET", $data = array(), $headers = array("Content-type: application/x-www-form-urlencoded") )
  {
    $context = stream_context_create(array
    (
      "http" => array(
        "method" => $method,
        "header" => $headers,
        "content" => http_build_query( $data )
      )
    ));
    return file_get_contents($url, false, $context);
  }
  // no data to submit
  $data = array();
  // get current time and 24 hours ago in milliseconds
  $to = time() * 1000;
  $from = $to - (24 * 60 * 60 * 1000);
  // get the URL and authorization info from the form data
  $request = "https://data.brightcove.com/analytics-api/videocloud/account/20318290001/report/?dimensions=video&limit=6&sort=video_view" . "&from=" . $from . "&to=" . $to;
  // add headers
  $headers = array(1 => "Authorization: Bearer 15075c51ae4b0af095c9a619a");
  //send the http request
  $result = SendRequest($request, $method = "GET", $data, $headers);
?>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Analytics API Response</title>
    <script src="//use.edgefonts.net/source-code-pro.js"></script>
    <link rel="stylesheet" href="/bcls/scripts/highlight/styles/magula.css">
    <link href="//files.brightcove.com/proxima-nova/font-faces.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/bcls/styles/bcls-solutions.css">
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
    <h1>Most Popular Videos: Analytics API / Media API / Smart Player API</h1>
    <div class="section" id="top">
      <h2>Introduction</h2>
      <p>This sample shows the most popular videos of the day and uses the Smart Player API to load them into a player.</p>
    </div>
    <div class="section" id="player">
      <h2>The functional sample</h2>
      <!-- Start of Brightcove Player -->
      <script language="JavaScript" type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>
      <object id="myExperience" class="BrightcoveExperience">
        <param name="bgcolor" value="#FFFFFF" />
        <param name="width" value="659" />
        <param name="height" value="371" />
        <param name="playerID" value="2081645594001" />
        <param name="playerKey" value="AQ~~,AAAABLsQgFE~,jGXrTxeVLAQAxWWh5tR_yAk4ujie9FeT" />
        <param name="isVid" value="true" />
        <param name="isUI" value="true" />
        <param name="dynamicStreaming" value="true" />
        <param name="includeAPI" value="true" />
        <param name="templateLoadHandler" value="BCLS.onTemplateLoad" />
        <param name="templateReadyHandler" value="BCLS.onTemplateReady" />
      </object>
      <!-- End of Brightcove Player -->
      <div id="playlist" class="playlist">
        <h4>Most popular videos</h4>
      </div>
    </div>
    <div class="section" id="logic">
      <h2>How it is done</h2>
      <h3>The Analytics API part</h3>
      <p>The Analytics API part here is simple: request a report on dimension <code>video</code>, set the <code>limit</code> to the number of videos you want to display, sort the results by <code>video_view</code>, and set the <code>from</code> and <code>to</code> parameters to the appropriate start and end times. In this example we are reporting on the period starting 24 hours before now &mdash; for a very active Video Cloud account, you may want to use a shorter period.</p>
      <p class="text-warning">Note that the Analytics API call is made using PHP, because the server does not currently permit cross-domain requests. In this example, the results from this request are simply set as the value of a JavaScript variable, and all other processing is handled on the client side.</p>
      <h4>PHP Code for the Analytics API request:</h4>
<pre><code>
&lt;?php
/*!
  | @ Sends the request
  | @return string
  */
  function SendRequest( $url, $method = "GET", $data = array(), $headers = array("Content-type: application/x-www-form-urlencoded") )
  {
    $context = stream_context_create(array
    (
      "http" =&gt; array(
        "method" =&gt; $method,
        "header" =&gt; $headers,
        "content" =&gt; http_build_query( $data )
      )
    ));
    return file_get_contents($url, false, $context);
  }
  // no data to submit
  $data = array();
  // get current time and 24 hours ago in milliseconds
  $to = time() * 1000;
  $from = $to - (24 * 60 * 60 * 1000);
  // get the URL and authorization info from the form data
  $request = "https://data.brightcove.com/analytics-api/videocloud/account/20318290001/report/?dimensions=video&amp;limit=6&amp;sort=video_view" . "&amp;from=" . $from . "&amp;to=" . $to;
  // add headers
  $headers = array(1 =&gt; "Authorization: Bearer 15075c51ae4b0af095c9a619a");
  //send the http request
  $result = SendRequest($request, $method = "GET", $data, $headers);
?&gt;
</code></pre>
      <h3>The Media API part</h3>
      <p>Using the video ids from the returned Analytics data (the <code>video</code> metric) and the open source Media API wrapper for JavaScript, we call the <code>find_videos_by_ids</code> method to return the <code>id</code>, <code>name</code>, and the <code>thumbnailURL</code> for each of the most viewed videos. This data is used to populate the Popular Videos list, using the Handlebars templating system to simplify the code.</p>
      <h3>The Smart Player API part</h3>
      <p>The Smart Player API is simply used to cue and load videos. In the handler for the <code>templateReady</code> event, we get a reference to the <code>VIDEO_PLAYER</code> module, and then set up a listener for click events on the video items, loading the respective item into the player when it is clicked. We also cue the first the video so that player will not be initially empty.</p>
      <h4>CSS code for Media and Smart Player API</h4>
<pre><code id="css_code"></code></pre>
      <h4>JavaScript code for Media and Smart Player API</h4>
<pre><code id="js_code"></code></pre>
    </div>
    <!-- display the result -->
<pre><code id="response"></code></pre>
    <script src="/bcls/scripts/jquery-1.9.1.min.js"></script>
    <script src="/bcls/scripts/handlebars.js"></script>
    <script src="/bcls/scripts/prefix.js"></script>
    <script src="/bcls/scripts/highlight/highlight.pack.js"></script>
    <script src="/bcls/scripts/format_json.js"></script>
    <script src="/bcls/scripts/bc-mapi.js"></script>
    <script src="/bcls/scripts/log.js"></script>
    <script id="pageScript">
      var BCLS = ( function () {
        var JSONresponse = <?php echo $result; ?>,
            videoArray = [],
            params = {},
            player,
            videoPlayer,
            APIModules,
            mediaEvent,
            handleBarsTemplate = "{{#items}}<div id=\"{{id}}\" class=\"playlist-item\"><img src=\"{{thumbnailURL}}\" /><p>{{name}}</p></div>{{/items}}",
            $playlistItems;
        // set up the Media API call, using data from the Analytics API call
        BCMAPI.token = "v87kWelIdjUwVm7_Rzv09k-KqtLz-ty8ONbMxVYAI7-Q0eOilegqqg..";
        BCMAPI.callback = "BCLS.onMAPIresponse";
        for (var i = 0, max = JSONresponse.items.length; i < max; i++) {
          videoArray.push(JSONresponse.items[i].video);
        }
        params.video_ids = videoArray.join();
        params.video_fields = "id,name,thumbnailURL";
        BCMAPI.find("find_videos_by_ids", params);
        // dump the raw response into the page
        $("#response").html(BCLSformatJSON.formatJSON(JSONresponse));
        return {
          onMAPIresponse : function(jsonData) {
            // merge the data into the html template using Handlebars
            var template = Handlebars.compile(handleBarsTemplate),
                data = jsonData,
                results = template(data);
            // inject the HTML for the video list
            $("#playlist").append(results);
            // get a reference to the collection of video items
            $playlistItems = $(".playlist-item");
          },
          onTemplateLoad : function(experienceID) {
            player = brightcove.api.getExperience(experienceID);
            APIModules = brightcove.api.modules.APIModules;
          },
          onTemplateReady : function(evt) {
            videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);
            // set up the click event handler for the video items
            $playlistItems.on("click", function(evt) {
              videoPlayer.loadVideoByID(parseInt($(this).attr("id")));
            });
            // cue the first video item
            videoPlayer.cueVideoByID(parseInt($playlistItems.eq(0).attr("id")));
          }
        }
      })();
    </script>
    <script>
      $(document).ready(function(){
        $("#js_code").html(BCLSpreFix($("#pageScript").html()));
        $("#css_code").html(BCLSpreFix($("#pageStyles").html()));
        $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
      });
    </script>
  </body>
</html>
