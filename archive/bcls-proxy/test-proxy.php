<?php
/*!
| @ Sends the request
| @return string
 */
function SendRequest($url, $method, $data, $headers) {
	$context = stream_context_create(array
		(
			"http"     => array(
				"method"  => $method,
				"header"  => $headers,
				"content" => http_build_query($data)
			)
		));
	return file_get_contents($url, false, $context);
}
// set up request for access token
$data = array();

$client_id     = "578b5b79-0883-47bb-a231-4fb5692ecd9c";
$client_secret = "spF_alkXCIJydgUluDNCWKxmk0-bvy-WI6PCxT2DzPo_JlwP-yDedLGqW4qIhXYh0eJyALABE5wHNPeS0CZmUw";
$auth_string   = "{$client_id}:{$client_secret}";
$request       = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
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
$result = curl_exec($ch);
curl_close($ch);
var_dump($result);
// Check for errors
if ($response === FALSE) {
	die(curl_error($ch));
}

// Decode the response
$resultData   = json_decode($result, TRUE);
$access_token = $resultData["access_token"];

// set up the API call
// no data to submit
$data = json_decode('{"name":"Woodpecker","description":"A bird that hunts insects inside wood...","reference_id":"Bird_Woodpecker.mp4_1427914046697999","tags":["bird","air","nature"]}');
// get current time and 24 hours ago in milliseconds

$method = "POST";
// get the URL and authorization info from the form data
$request = "https://cms.api.brightcove.com/v1/accounts/57838016001/videos";
// add headers
$headers = array(
	1=> "Authorization: Bearer {$access_token}",
	2=> "Content-type: application/x-www-form-urlencoded",
);

//send the http request
$result = SendRequest($request, $method, $data, $headers);
var_dump($result);
echo $result;
?>