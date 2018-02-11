<?php
/**
 * bcls-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 * Accessing:
 *         (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *     request body (accessed via php://input) is a JSON object with the following properties
 *
 * {string} url - the URL for the API request
 * {string} [requestType=GET] - HTTP method for the request
 * {string} [requestBody] - JSON data to be sent with write requests
 * {string} [client_id] - OAuth2 client id with sufficient permissions for the request
 * {string} [client_secret] - OAuth2 client secret with sufficient permissions for the request
 * {string} [account_id] - Brightcove account id
 *
 * if client_id, client_secret, or account_id are not included in the request, values for the BrightcoveLearning account will be used
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false) {
    exit('{"ERROR":"Only requests from http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

// get request body
$requestData = json_decode(file_get_contents('php://input'));

// set up request for access token
$data = array();

if ($requestData->client_id) {
    $client_id = $requestData->client_id;
} else {
    $client_id = '3e23bbec-59b8-4861-b5ba-7c26e110a746';
}
if ($requestData->client_secret) {
    $client_secret = $requestData->client_secret;
} else {
    $client_secret = 'quNdrH07IVoG8yZxSFsCySWmtvUuWfPYyzeg1Nil7Md7VpQ50A3KVV4eeMrZSR7FdeZA_3JS5jV9pBBI0skwWA';
}
if ($requestData->ccount_id) {
    $account_id = $requestData->ccount_id;
} else {
    $account_id = '57838016001';
}

// first check to see if the running job count is under 100
$job_count_file    = $account_id.'_count.txt';
$job_count_data    = file_get_contents($job_count_file);
$job_count_decoded = json_decode($job_count_data);
if ($job_count_decoded) {
    if ($job_count_decoded->job_count > 99) {
        $m = new stdClass();
        $m->message = 'wait';
        exit(json_encode($m));
    }
} else {
    $job_count_decoded            = new stdClass();
    $job_count_decoded->job_count = "1";
    $job_count_decoded->failed    = [];
    $job_count_encoded = json_encode($job_count_decoded);
    $job_count         = fopen($job_count_file, 'w');
    fwrite($job_count, $job_count_encoded);
    fclose($job_count);
}

// get access token
$auth_string = "{$client_id}:{$client_secret}";
$request     = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
$ch          = curl_init($request);
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
if ($requesteData->requestBody) {
    $data = json_decode($requesteData->requestBody);
}
// get request type or default to GET
if ($requestData->requestType) {
    $method = $requestData->requestType;
} else {
    $method = "GET";
}

// more security checks
$needle = '.com';
$endapi = strpos($requestData->url, $needle) + 4;

if (strpos($requestData->url, 'data.brightcove.co.jp')) {
    $endapi = strpos($requestData->url, $needle) + 6;
}
$nextChar = substr($requestData->url, $endapi, 1);

if (strpos($requestData->url, 'api.brightcove.com') == false && strpos($requestData->url, 'data.brightcove.co.jp') == false && strpos($requestData->url, 'data.brightcove.com') == false) {
    exit('{"ERROR":"Only requests to Brightcove APIs are accepted by this proxy"}');
} else if ($nextChar !== '/' && $nextChar !== '?') {
    exit('{"ERROR": "There was a problem with your API request - please check the URL"}');
}
// get the URL and authorization info from the form data
$request = $requestData->url;
//send the http request
if ($requestData->requestBody) {
  $ch = curl_init($request);
  curl_setopt_array($ch, array(
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_SSL_VERIFYPEER => FALSE,
    CURLOPT_HTTPHEADER     => array(
      'Content-type: application/json',
      "Authorization: Bearer {$access_token}",
    ),
    CURLOPT_POSTFIELDS => $requestData->requestBody
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
    $response = '{}';
} elseif ($responseDecoded->id) {
    $job_count_data    = file_get_contents($job_count_file);
    $job_count_decoded = json_decode($job_count_data);
    $job_count_decoded->job_count++;
    $job_count_encoded = json_encode($job_count_decoded);
    $job_count         = fopen($job_count_file, 'w');
    fwrite($job_count, $job_count_encoded);
    fclose($job_count);
}

echo $response;
?>
