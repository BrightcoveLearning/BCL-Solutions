<?php

// CORS enablement and other headers
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("X-Content-Type-Options: nosniff");
header("X-XSS-Protection");

// default account values
// client id and secret values have all permissions for most BCLS accounts
$client_id     = "5f781efe-3fc5-4f41-9cd5-d40b6c21ac18";
$client_secret = "_wTTGx710UrBhvU-xjgWaPg1c9_SBqfH66pcKT79xmEmNDqTqkyVvcQyXieArPKHEf1kqjgWuX_d3rj1-TvUeQ";

$auth_string = "{$client_id}:{$client_secret}";
$request     = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
$curl          = curl_init($request);
curl_setopt($curl, CURLOPT_USERPWD, $auth_string);
curl_setopt($curl, CURLOPT_POST, TRUE);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
  "Content-type: application/x-www-form-urlencoded",
));

$response = curl_exec($curl);
$curl_info = curl_getinfo($curl);
$php_log = array(
  "php_error_info" => $curl_info
);
$curl_error = curl_error($curl);

curl_close($curl);

// Check for errors
if ($response === FALSE) {
  log_error($php_log, $curl_error);
}

// Decode the response
$responseData = json_decode($response, TRUE);
$access_token = $responseData["access_token"];

echo "access token: ".$access_token."\n\n";

$request = "https://experiences.api.brightcove.com/v1/accounts/experiences";

echo "request url: ".$request."\n\n";


  $curl = curl_init($request);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    "Content-type: application/json",
    "Authorization: Bearer {$access_token}"
  ));
  $response = curl_exec($curl);
  $curl_info = curl_getinfo($curl);
  $php_log = array(
    "php_error_info" => $curl_info
  );
  $curl_error = curl_error($curl);
  curl_close($curl);

// Check for errors and log them if any
// note that logging will fail unless
// the file log.txt exists in the same
// directory as the proxy and is writable

if ($response === FALSE) {
  log_error($php_log, $curl_error);
}

function log_error($php_log, $curl_error) {
  echo $logEntry = "\nError:\n". "\n".date("Y-m-d H:i:s"). " UTC \n" .$curl_error. "\n".json_encode($php_log, JSON_PRETTY_PRINT);
}

// return the response to the AJAX caller
echo $response;
?>
