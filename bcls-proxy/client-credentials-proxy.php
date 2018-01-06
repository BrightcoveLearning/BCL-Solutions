<?php
/**
 * client-credentials-proxy.php - proxy for Brightcove RESTful APIs
 * gets a client id and client secret and returns the whole response
 * Accessing:
 *         (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} bc_token - BC_TOKEN with admin permissions on all accounts that credentials are requested for
 * @post {JSONstring} requestBody - the full request body as a JSON string
 *
 * @returns {string} $response - JSON response received from the OAuth API
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

// get data or die
if ($_POST["requestBody"]) {
    $data = json_decode($_POST["requestBody"]);
} else {
  exit("request body missing");
}
// get request type or default to POST
if ($_POST["requestType"]) {
    $method = $_POST["requestType"];
} else {
  $method = 'POST';
}
// get bc_token or die
if ($_POST["bc_token"]) {
    $bc_token = $_POST["bc_token"];
} else {
  exit("bc_token missing");
}

$request  = "https://oauth.brightcove.com/v4/client_credentials";
$ch       = curl_init($request);
curl_setopt_array($ch, array(
    CURLOPT_CUSTOMREQUEST  => $method,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_SSL_VERIFYPEER => FALSE,
    CURLOPT_HTTPHEADER     => array(
        'Content-type: application/json',
        'Authorization: BC_TOKEN {$bc_token}'
    ),
    CURLOPT_POSTFIELDS => json_encode($data)
));
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
    die(curl_error($ch));
    exit('An error occurred on making the request');
} else {
  echo $response;
}

?>
