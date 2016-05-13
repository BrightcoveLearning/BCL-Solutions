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
 * @post {string} [requestType=POST] - HTTP method for the request
 * @post {string} [requestBody=null] - request body data
 * @post {string} bc_token - BCToken obtained from Studio cookies
 * @post {string} account_id - Brightcove account id
 *
 * @returns {string} $response - JSON response received from the API
 */

// CORS enablement
header("Access-Control-Allow-Origin: *");

// set up request for access token
$data = array();

if ($_POST["bc_token"]) {
    $bc_token = $_POST["bc_token"];
} else {
    $bc_token = 'c5d0a622-5479-46d8-8d8a-5f034b943fab';
}
if ($_POST["account_id"]) {
    $account_id = $_POST["account_id"];
} else {
    $account_id = 'w7NQYu0vUloM4GYYy2SXAxrvyFpt8fwI35qAFZcS13-VIgs0itwKNsAwHOS80sOWKJ1BUwHIvSFG2IbgcxEGKg';
}

$request     = "https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials";
$ch          = curl_init($request);
curl_setopt_array($ch, array(
        CURLOPT_POST           => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_SSL_VERIFYPEER => FALSE,
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
    $method = "POST";
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
            'Content-Type, application/x-www-form-urlencoded',
            "Authorization: BC_TOKEN {bc_token}",
        ),
        CURLOPT_POSTFIELDS => $data
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
