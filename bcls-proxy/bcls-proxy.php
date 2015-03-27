<?php

	/*!
  | @ Sends the request
  | @param $url string API request url
  | @param $method string HTTP method for the
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
  echo "JSONresponse = " . $result;
?>