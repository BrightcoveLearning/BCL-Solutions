<?php
/**
 * bcls-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 * Accessing:
 *         (note you should *always* access the proxy via HTTPS)
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

// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");


// set up the API call
// get data
if ($_POST["requestBody"]) {
    $data = json_decode($_POST["requestBody"]);
}
// get api key
$apikey = $_POST["apiKey"];
// get request type or default to GET
if ($_POST["requestType"]) {
    $method = $_POST["requestType"];
} else {
    $method = "GET";
}
// more security checks
$needle = '.io';
$endapi = strpos($_POST["url"], $needle) + 3;

$nextChar = substr($_POST['url'], $endapi, 1);

if (strpos($_POST["url"], 'api.bcovlive.io') == false) {
    exit('{"ERROR":"Only requests to the Brightcove Live APIs are accepted by this proxy"}');
}
// get the URL and authorization info from the form data
$request = $_POST["url"];
//send the http request
if ($_POST["requestBody"]) {
  $ch = curl_init($request);
  curl_setopt_array($ch, array(
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_SSL_VERIFYPEER => FALSE,
    CURLOPT_HTTPHEADER     => array(
      'Content-type: application/json',
      "X-API-KEY: {$apikey}",
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
      "X-API-KEY: {$apikey}",
    ),
  ));
  $response = curl_exec($ch);
  curl_close($ch);
}

// Check for errors
if ($response === FALSE) {
    $logEntry = "\nError:\n".
    "\n".date("Y-m-d H:i:s")." UTC \n"
    .$response;
    $logFileLocation = "log.txt";
    $fileHandle      = fopen($logFileLocation, 'a') or die("-1");
    fwrite($fileHandle, $logEntry);
    fclose($fileHandle);
    echo '{"ERROR": "There was a problem with your API call"}'+
    die(curl_error($ch));
}

// Decode the response
// $responseData = json_decode($response, TRUE);
// return the response to the AJAX caller
$responseDecoded = json_decode($response);
// if (!isset($responseDecoded)) {
// 	$response = '{null}';
// }
echo $response;
?>
