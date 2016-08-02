<?php
/**
 * pmapi-proxy.php - proxy for Brightcove PLayer Management API
 * updates the skin for a player to the 5.x skin (luna)
 * Accessing:
 *     URL: https://solutions.brightcove.com/bcls/bcls-proxy/update-player-skin-proxy.php
 *         (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} account_id - the Brightcove account id
 * @post {string} player_id - the Brightcove player id
 * @post {string} username - Brightcove username
 * @post {string} password - Brightcove password
 * @post {boolean} publish - publish after updating?
 * @post {string} version - version to update to
 *
 * @returns {string} $response - JSON response received from the API
 */

if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false) {
    exit('Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy');
}
// CORS enablement
header("Access-Control-Allow-Origin: *");

// get the current player config

$username     = $_POST["username"];
$password     = $_POST["password"];
$account_id   = $_POST["account_id"];
$player_id    = $_POST["player_id"];
$publish      = $_POST["publish"];
$version      = str_replace("-", ".", $_POST["version"]);
$url = 'https://players.api.brightcove.com/v1/accounts/'.$account_id.'/players/'.$player_id.'/configuration';

// make the update call

$configData = new stdClass();
$headers = array('Content-Type: application/json', 'Content-Length: ' . strlen($newPlayerConfig));

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_TIMEOUT, 30); //timeout after 30 seconds
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
curl_setopt($ch, CURLOPT_POSTFIELDS, $newPlayerConfig);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
    die(curl_error($ch));
    echo $status_code;
}
$playerConfig = json_decode($response);

// now publish the player

$url = 'https://players.api.brightcove.com/v1/accounts/'.$account_id.'/players/'.$player_id.'/publish';
$headers = array('Content-Type: application/json');

if ($publish == "true") {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); //timeout after 30 seconds
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $response = curl_exec($ch);
    curl_close($ch);

    // Check for errors
    if ($response === FALSE) {
        die(curl_error($ch));
        echo $status_code;
    }
    $playerConfig = json_decode($response);
    echo json_encode($playerConfig) . PHP_EOL;
} else {
    echo json_encode($playerConfig) . PHP_EOL;
}



?>
