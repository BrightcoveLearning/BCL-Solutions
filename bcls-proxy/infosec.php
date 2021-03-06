<?php

echo $_SERVER['HTTP_REFERER'];
// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'ondemand.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 'video.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 'codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'cdpn.io') == false && strpos($_SERVER['HTTP_REFERER'], 'fiddle.jshell.net') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false && strpos($_SERVER['HTTP_REFERER'], 'support.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'master-7rqtwti-6sglloa4yrkti.us.platform.sh') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}

// more security checks
$needle = '.com';
$endapi = strpos($_POST["url"], $needle) + 4;

if (strpos($_POST["url"], 'data.brightcove.co.jp')) {
    $endapi = strpos($_POST["url"], $needle) + 6;
}
$nextChar = substr($_POST['url'], $endapi, 1);

if (strpos($_POST["url"], 'api.brightcove.com') == false && strpos($_POST["url"], 'data.brightcove.co.jp') == false && strpos($_POST["url"], 'data.brightcove.com') == false) {
    exit('{"ERROR":"Only requests to Brightcove APIs are accepted by this proxy"}');
} else if ($nextChar !== '/' && $nextChar !== '?') {
    exit('{"ERROR": "There was a problem with your API request - please check the URL"}');
}
?>
