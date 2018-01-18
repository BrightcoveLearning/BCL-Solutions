<?php
/**
 * bcls-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 * Accessing:
 *     (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} url - the URL for the API request
 * @post {string} [requestType=GET] - HTTP method for the request
 * @post {string} [requestBody=null] - JSON data to be sent with write requests
 * @post {string} client_id - OAuth2 client id with sufficient permissions for the request
 * @post {string} client_secret - OAuth2 client secret with sufficient permissions for the request
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'ondemand.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 'video.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'fiddle.jshell.net') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false && strpos($_SERVER['HTTP_REFERER'], 'support.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'master-7rqtwti-6sglloa4yrkti.us.platform.sh') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement
header("Access-Control-Allow-Origin: *");
echo $_POST;
// set up request for access token
$data = array();
if ($_POST["client_id"]) {
    $client_id = $_POST["client_id"];
} else {
    $client_id = '3e23bbec-59b8-4861-b5ba-7c26e110a746';
}
if ($_POST["client_secret"]) {
    $client_secret = $_POST["client_secret"];
} else {
    $client_secret = 'quNdrH07IVoG8yZxSFsCySWmtvUuWfPYyzeg1Nil7Md7VpQ50A3KVV4eeMrZSR7FdeZA_3JS5jV9pBBI0skwWA';
}
$auth_string   = "{$client_id}:{$client_secret}";
$request       = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
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
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
    die(curl_error($ch));
}

// Decode the response
$responseData = json_decode($response, TRUE);
$access_token = $responseData["access_token"];

// set up the API call
//  55525f84e4b08e946aa03281 ,"id":"5591b61ce4b072e9641b830e"
// get data
if ($_POST["requestBody"]) {
    $data = json_decode($_POST["requestBody"]);
} else {
    $data = json_decode('{"account_id":57838016001,"default_profile_id":"smart-player-transition"}');
}
// get request type or default to GET
if ($_POST["requestType"]) {
    $method = $_POST["requestType"];
} else {
    $method = "PUT";
}

// get the URL and authorization info from the form data
if ($_POST["url"]) {
    $request = $_POST["url"];
} else {
    $request = "https://ingestion.api.brightcove.com/v1/accounts/57838016001/configuration";
}

// more security checks
$needle = '.com';
$endapi = strpos($request, $needle) + 4;
$nextChar = substr($request, $endapi, 1);
if (strpos($request, 'api.brightcove.com') == false) {
    exit('{"ERROR":"Only requests to Brightcove APIs are accepted by this proxy"}');
} else if ($nextChar !== '/' && $nextChar !== '?') {
    exit('{"ERROR": "There was a problem with your API request - please check the URL"}');
}



//send the http request
if ($_POST["requestBody"]) {
  $ch = curl_init($request);
  curl_setopt_array($ch, array(
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_SSL_VERIFYPEER => FALSE,
    CURLOPT_HTTPHEADER     => array(
      'Content-type: application/json',
      "Authorization: Bearer {$access_token}",
    ),
    CURLOPT_POSTFIELDS => json_encode($data)
  ));
  $response = curl_exec($ch);
  curl_close($ch);
} else {
  $ch = curl_init($request);
  curl_setopt_array($ch, array(
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_SSL_VERIFYPEER => FALSE,
    CURLOPT_HTTPHEADER     => array(
      'Content-type: application/json',
      "Authorization: Bearer {$access_token}",
    )
  ));
  $response = curl_exec($ch);
  curl_close($ch);
}
// var_dump($data);
// Check for errors
if ($response === FALSE) {
    $logEntry = "\nError:\n".
    "\n".date("Y-m-d H:i:s")." UTC \n"
    .$response;
    $logFileLocation = "log.txt";
    $fileHandle      = fopen($logFileLocation, 'a') or die("-1");
    fwrite($fileHandle, $logEntry);
    fclose($fileHandle);
    echo "Error: there was a problem with your API call"+
    die(curl_error($ch));
}

// Decode the response
// $responseData = json_decode($response, TRUE);
// return the response to the AJAX caller
// $responseDecoded = json_decode($response);
// if (!isset($responseDecoded)) {
// 	$response = '{null}';
// }
echo $response;
?>
