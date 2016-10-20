<?php
/**
 * bcls-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 * Accessing:
 *     URL: https://solutions.brightcove.com/bcls/bcls-proxy/bcsl-proxy.php
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

/*// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}*/
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");

// set up request for access token
$data = array();

$account_id    = $_POST["accountid"]; 
$client_id     = $_POST["client_id"];
$client_secret = $_POST["client_secret"];
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

/*if (strpos($_POST["url"], 'api.brightcove.com') == false) {
    exit('Only requests to Brightcove APIs are accepted by this proxy');
}*/
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
$response_json = json_decode($response, TRUE);

// Check for errors
if ($response === FALSE || (strpos($response,"error")) || empty($response) || $response === "") {
	//following required for now because the response is empty and needs to be json formated
	if(empty($response) || $response === "" || (strpos($response,"UNSUPPORTED_ARCHIVE_LOCATION"))){
		$response = "{}";
	}
	$logEntry = "\nError:\n".
	"\n".date("Y-m-d H:i:s")." UTC \n"
	.$response;
	$logFileLocation = "errorlogs-".$account_id.".txt";
	$fileHandle      = fopen($logFileLocation, 'a') or die("-1");
	fwrite($fileHandle, $logEntry);
	fclose($fileHandle);
	echo $response;
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
