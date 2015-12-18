<?php
/**
 * pmapi-proxy.php - proxy for Brightcove PLayer Management API
 * updates the skin for a player to the 5.x skin (luna)
 * Accessing:
 *     URL: https://solutions.brightcove.com/bcls/bcls-proxy/pmapi-proxy.php
 *         (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} account_id - the Brightcove account id
 * @post {string} player_id - the Brightcove player id
 * @post {string} username - Brightcove username
 * @post {string} passwork - Brightcove password
 *
 * @returns {string} $response - JSON response received from the API
 */

// CORS enablement
header("Access-Control-Allow-Origin: *");

// get the current player config

$username     = $_POST["username"];
$password     = $_POST["password"];
$account_id   = $_POST["account_id"];
$player_id    = $_POST["player_id"]
$request      = 'https://players.api.brightcove.com/v1/accounts/'.$account_id.'/'.$player_id;
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
// set request type  to GET
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
