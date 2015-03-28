<?php

  /*!
  | @ Sends the request
  | @param $url string API request url
  | @param $method string HTTP method for the
  | @return string
  */
  function GetToken( $url, $method, $data, $headers )
  {
    $context = stream_context_create(array
    (
      "http" => array(
        "method" => $method,
        "header" => $headers,
        "content" => http_build_query( $data )
      )
    ));
    echo json_encode($context);
    $results = file_get_contents($url, false, $context);
    echo $results;
    return $results;
  }
	/*!
  | @ Sends the request
  | @param $url string API request url
  | @param $method string HTTP method for the
  | @return string
  */
  function SendRequest( $url, $method = "GET", $data = array(), $headers = array("Content-type: application/json") )
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

  // request params from the $_POST
  $request = "https://cms.api.brightcove.com/v1/accounts/57838016001/videos";
  $client_id = "578b5b79-0883-47bb-a231-4fb5692ecd9c";
  $client_secret = "spF_alkXCIJydgUluDNCWKxmk0-bvy-WI6PCxT2DzPo_JlwP-yDedLGqW4qIhXYh0eJyALABE5wHNPeS0CZmUw";
  $data = null;
  $requestType = "GET";
  // create the auth string to get a token
  $authStr = base64_encode($client_id . ":" . $client_secret);
  // set up auth params for getting token
  $authURL = "https://oauth.brightcove.com/v3/access_token";
  $authBody = array(
      1 => "grant_type=client_credentials"
    );
  $authHeaders = array(
    1 => "Content-type: application/x-www-form-urlencoded",
    2 => "Authorization: Basic" . $authStr
    );
  $authMethod = "POST";

  $authReponse = GetToken($authURL, $authMethod, $authBody, $authHeaders);
  $authReponse = json_decode($authReponse);
  $access_token = $authReponse["access_token"];
  // add headers
  $headers = array(1 => "Authorization: Bearer" . $access_token);
  //send the http request
  $result = SendRequest($request, $requestType, $data, $headers);
  echo json_encode($access_token);
?>