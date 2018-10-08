<?php
/**
 * proxy for Brightcove RESTful APIs
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
 *
 * if client_id, client_secret, or account_id are not included in the request, default values will be used
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'support.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'ondemand.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 'video.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false && strpos($_SERVER['HTTP_REFERER'], '.brightcodes.net') == false) {
    exit('{"error_code":"Only requests from http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

// default account values
// client id and secret values have all permissions for most BCLS accounts
// default account is Docs Samples account - change this to use a different account
$default_account_id    = '57838016001';
$default_client_id     = '1cc58a75-9eb4-4667-9e98-c51e6e634729';
$default_client_secret = '--z1b1PMzBfrK3cvPx6lbLayczxPBxSMdWaoKclejO7pJpYoqtU6-UuV224t3EA9IW94gYZ-bUewVYuxFWx7AA';

// get request body
$requestData = json_decode(file_get_contents('php://input'));

// set up access token request
if (isset($requestData->client_id)) {
    $client_id = $requestData->client_id;
} else {
    // default to the id for all permissions for most BCLS accounts
    $client_id = $default_client_id;
}
if (isset($requestData->client_secret)) {
    $client_secret = $requestData->client_secret;
} else {
    // default to the secret for all permissions for most BCLS accounts
    $client_secret = $default_client_secret;
}

$auth_string = "{$client_id}:{$client_secret}";
$request     = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
$curl          = curl_init($request);
curl_setopt($curl, CURLOPT_USERPWD, $auth_string);
curl_setopt($curl, CURLOPT_POST, TRUE);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, TRUE);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
  'Content-type: application/x-www-form-urlencoded',
));

$response = curl_exec($curl);
$curl_info = curl_getinfo($curl);
$curl_error = curl_error($curl);

curl_close($curl);

// Check for errors
if ($response === FALSE) {
  log_error($curl_info);
}

// Decode the response
$responseData = json_decode($response, TRUE);
$access_token = $responseData["access_token"];
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
if (isset($requestData->requestBody)) {
  $data = $requestData->requestBody;
}
  $curl = curl_init($request);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, TRUE);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-type: application/json',
    "Authorization: Bearer {$access_token}"
  ));
  switch ($method)
    {
        case "POST":
            curl_setopt($curl, CURLOPT_POST, TRUE);
            if ($requestData->requestBody)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_PUT, TRUE);
            if ($requestData->requestBody)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "PATCH":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
            if ($requestData->requestBody)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        case "DELETE":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
            if ($requestData->requestBody)
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
            break;
        default:
            // GET request, nothing to do;
    }
  $response = curl_exec($curl);
  $curl_info = curl_getinfo($curl);
  $curl_error = curl_error($curl);
  curl_close($curl);

// Check for errors and log them if any
// note that logging will fail unless
// the file log.txt exists in the same
// directory as the proxy and is writable

if ($response === FALSE) {
  log_error($curl_info);
}

function log_error($curl_info) {
  $logEntry = "\nError:\n".
  "\n".date("Y-m-d H:i:s")." UTC \n"
  .$curl_error.'\n'
  .json_encode($curl_info, JSON_PRETTY_PRINT);
  $logFileLocation = "log.txt";
  $fileHandle      = fopen($logFileLocation, 'a') or die("-1");
  fwrite($fileHandle, $logEntry);
  fclose($fileHandle);
  echo "Error: there was a problem with your API call"+
  die(json_encode($curl_info, JSON_PRETTY_PRINT));
}

// return the response to the AJAX caller
echo $response;
?>
