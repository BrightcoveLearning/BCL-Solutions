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
    return file_get_contents($url, false, $context);
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
  $request = $_POST["url"];
  $client_id = $_POST["client_id"];
  $client_secret = $_POST["client_secret"];
  $data = $_POST["requestBody"];
  $requestType = $_POST["requestType"];
  // create the auth string to get a token
  $authStr = base64_encode($client_id . ":" . $client_secret);

  // set up auth params for getting token
  $authURL = "https://oauth.brightcove.com/v3/access_token";
  $authBody = array(
      "grant_type" => "client_credentials"
    );
  $authHeaders = array(
    "Content-type: application/x-www-form-urlencoded",
    "Authorization: Basic" . $authStr
    );
  $authMethod = "POST";

  $authReponse = GetToken($authURL, $authMethod, $authHeaders);
  $authReponse = json_decode($authReponse);
  // add headers
  $headers = array(1 => "Authorization: Bearer 15075c51ae4b0af095c9a619a");
  //send the http request
  $result = SendRequest($request, $requestType, $data, $headers);
  echo "JSONresponse = " . $result;
?>