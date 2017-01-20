<?php
/**
 * pmapi-proxy.php - proxy for Brightcove PLayer Management API
 * updates the skin for all players in an account to the 5.x skin (luna)
 * Accessing:
 *     URL: https://solutions.brightcove.com/bcls/bcls-proxy/update-all-players-skin-proxy.php
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

// security checks
if (strpos($_SERVER['HTTP_REFERER'], 'solutions.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 'docs.brightcove.com') == false && strpos($_SERVER['HTTP_REFERER'], 's.codepen.io') == false && strpos($_SERVER['HTTP_REFERER'], 'players.brightcove.net') == false && strpos($_SERVER['HTTP_REFERER'], 'bcdocs.pronovix.net') == false) {
    exit('{"ERROR":"Only requests from http://docs.brightcove.com or http:solutions.brightcove.com are accepted by this proxy"}');
}
}
// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");

// get the current player config

$username     = $_POST["username"];
$password     = $_POST["password"];
$account_id   = $_POST["account_id"];
$publish      = $_POST["publish"];
$results      = new stdClass();
$results->updated = array();
$results->skipped = array();
// get all players
$url = 'https://players.api.brightcove.com/v1/accounts/'.$account_id.'/players/';
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_TIMEOUT, 30); //timeout after 30 seconds
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$response = curl_exec($ch);
curl_close($ch);

// Check for errors
if ($response === FALSE) {
    die(curl_error($ch));
    echo $status_code;
}

// Decode the response
$allPlayers = json_decode($response, TRUE);
$players = $allPlayers->items;

foreach ($players as $player) {
    $player_id = $player->id;
    $url = 'https://players.api.brightcove.com/v1/accounts/'.$account_id.'/players/'.$player_id.'/configuration';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30); //timeout after 30 seconds
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $response = curl_exec($ch);
    curl_close($ch);

    // Check for errors
    if ($response === FALSE) {
        die(curl_error($ch));
        echo $status_code;
    }

    // Decode the response
    $playerConfig = json_decode($response, TRUE);

    // check for player version
    $player_version = substr($playerConfig['player']['template']['version'],0,1);

    // only act if player version is 5.x or later
    if ($player_version > 4) {
        // remove skin and compatibility properties
        unset($playerConfig["compatibility"], $playerConfig["skin"]);
        // echo json_encode($playerConfig, TRUE);

        // make the update call

        $newPlayerConfig = json_encode($playerConfig);
        $headers = array('Content-Type: application/json', 'Content-Length: ' . strlen($newPlayerConfig));

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30); //timeout after 30 seconds
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
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
            $results->updated[$player_id];
        } else {
            $results->updated[$player_id];;
        }

    } else {
        $results->skipped[$player_id];
    }

}

echo json_encode($results);



?>
