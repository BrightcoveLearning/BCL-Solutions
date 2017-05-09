<?php
/**
 * bcls-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 * Accessing:
 * (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} url - the URL for the API request
 * @post {string} [requestType=POST] - HTTP method for the request
 * @post {string} [name=null] - name for client app
 * @post {string} [maximum_scope=null] - scope for credentials
 * @post {string} bc_token - BCToken obtained from Studio cookies
 * @post {string} account_id - Brightcove account id
 *
 * @returns {string} $response - JSON response received from the API
 */

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'video.brightcovelearning.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'site-760002.bcvp0rtal.com') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false && strpos($_SERVER['HTTP_REFERER'], 'bcdocs.pronovix.net') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}
// CORS enablement
header("Access-Control-Allow-Origin: *");
// print("Hello World");
// get the URL and authorization info from the form data
$request = urldecode($_POST["url"]);
if ($_POST["bc_token"]) {
    $bc_token = $_POST["bc_token"];
} else {
    $bc_token = 'c5d0a622-5479-46d8-8d8a-5f034b943fab';
}
if ($_POST["name"]) {
    $name = $_POST["name"];
} else {
    $name = null;
}
if ($_POST["name"]) {
    $name = $_POST["name"];
} else {
    $name = null;
}
if ($_POST["requestType"]) {
    $method = $_POST["requestType"];
} else {
    $method = "POST";
}
// print($maximum_scope);
// set up request for access token
$data = array(
    name => $name,
    maximum_scope => $maximum_scope
);
$request = "https://oauth.brightcove.com/v3/client_credentials";
$ch          = curl_init($request);
curl_setopt_array($ch, array(
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_HTTPHEADER     => array(
            'Content-type: application/x-www-form-urlencoded',
            'Authorization: BC_TOKEN ' . $bc_token
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

// return the response to the AJAX caller
$responseDecoded = json_decode($response);
if (!isset($responseDecoded)) {
	$response = '{null}';
}
echo $response;
?>
