<?php


if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false ) {
    exit('Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy');
}

if (strpos($_POST["url"], 'api.brightcove.com') == false) {
    exit('Only requests to Brightcove APIs are accepted by this proxy');
}
?>
