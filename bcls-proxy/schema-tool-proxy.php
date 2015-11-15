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
 * @post {string} client_id - the client_id for the API request
 * @post {string} client_secret - the client_secret for the API request
 * @post {string} [requestType=GET] - HTTP method for the request
 * @post {string} [requestBody=null] - JSON data to be sent with write requests
 * @post {string} client_id - OAuth2 client id with sufficient permissions for the request
 * @post {string} client_secret - OAuth2 client secret with sufficient permissions for the request
 *
 * @returns {string} $response - JSON response received from the API
 */

// CORS enablement
header("Access-Control-Allow-Origin: *");


// get client_id if submitted
if ($_POST["client_id"]) {
	$client_id = $_POST["client_id"];
} else {
	$client_id = 'bc90ea5e-8a66-476b-8c43-90bf28215ed1';
// get client_secret if submitted
if ($_POST["client_secret"]) {
	$client_secret = $_POST["client_secret"];
} else {
	$client_secret = 'hPvmIPc40FOwcS14Jg7_rZjEM-xpRk-8MJO507ZGRKe2eOXKzsdp8nnKLSgTOtbvqsn4v8ZVMT6mViyA3D7jDg';

// set up request for access token
$data = array();
// get access token
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
echo $response;
?>