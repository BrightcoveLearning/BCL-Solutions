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

// CORS enablement
header("Access-Control-Allow-Origin: *");
echo $_POST;
// set up request for access token
$data = array();
if ($_POST["client_id"]) {
    $client_id = $_POST["client_id"];
} else {
    $client_id = 'e20b9edf-8b6c-44d1-8110-bc0bf399b78f';
}
if ($_POST["client_secret"]) {
    $client_secret = $_POST["client_secret"];
} else {
    $client_secret = 'c9n25db7R_Ik8o3zNrKBN3zkx-BZVlEcm6mXGBH8aGhZGcljsb9pLCneABkBUl2Op3FIvB5sJCJUUPfiThtraQ';
}
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
    $method = "GET";
}

// get the URL and authorization info from the form data
if ($_POST["url"]) {
    $request = $_POST["url"];
} else {
    $request = "https://ingestion.api.brightcove.com/v1/accounts/57838016001/configuration";
}


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
echo $response;
?>
