<?php
/**
 * proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 *
 * Method: POST
 * include header: "Content-Type", "application/x-www-form-urlencoded"
 *
 * @post {string} url - the URL for the API request
 * @post {string} [requestType=GET] - HTTP method for the request
 * @post {string} [requestBody=null] - JSON data to be sent with write requests
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'video.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'fiddle.jshell.net') == false && strpos($_SERVER['HTTP_REFERER'], 'site-760002.bcvp0rtal.com') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false && strpos($_SERVER['HTTP_REFERER'], 'support.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'master-7rqtwti-6sglloa4yrkti.us.platform.sh') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

// set up request for access token
$data = array();

$client_id     = '0d07efde-0d53-450c-995d-97dbdb330e73';
$client_secret = 'eEIH-EnUqCJ74fR-U2c4xmf1iiZataAONAPkAdbBsho24zAmIz0CtmN7WXGEsqASJ45Xi09gSSNCNe3Z9UMgxw';
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
// get data
if ($_POST["requestBody"]) {
	$data = json_decode($_POST["requestBody"]);
} else {
	$data = array();
}
// get request type or default to GET
if ($_POST["requestType"]) {
	$method = $_POST["requestType"];
} else {
	$method = "GET";
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
// get the URL and authorization info from the form data
$request = $_POST["url"];
//send the http request
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
$responseDecoded = json_decode($response);
if (!isset($responseDecoded)) {
	$response = '{null}';
}
echo $response;
?>
