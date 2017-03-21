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

$client_id     = "5746d707-db97-42b2-b4f0-3db890429ef0";
$client_secret = "JBdg3PLg0NarokKjIihxa_05i-YVyvhICWlQ5NXMSlUX9H9tzYqQ8FE-4mMfhAWOMs0KxUHyUN3anzkZSr3Bvg";
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

// Check for errors
if ($response === FALSE) {
	die(curl_error($ch));
}

// Decode the response
$resultData   = json_decode($result, TRUE);
$access_token = $resultData["access_token"];

// set up the API call
// no data to submit
$data = array();
// get current time and 24 hours ago in milliseconds
$to   = time()*1000;
$from = $to-(24*60*60*1000);

$method = "GET";
// get the URL and authorization info from the form data
$request = "https://analytics.api.brightcove.com/v1/data?accounts=20318290001&dimensions=video&limit=6&sort=video_view&fields=video&from={$from}&to={$to}";
// add headers
$headers = array(
	1=> "Authorization: Bearer {$access_token}",
	2=> "Content-type: application/x-www-form-urlencoded",
);

//send the http request
$result = SendRequest($request, $method, $data, $headers);
// decode the response
$analyticsData = json_decode($result, TRUE);

// now prepare the CMS API request
$videosArray = array();
for ($i = 0;i < count($analyticsData["items"]); $i++) {
	$request = "https://cms.api.brightcove.com/v1/accounts/20318290001/videos/" . $analyticsData["items"][$i]["video"];
	// get the video data and add it to the videos array
	$videosArray[] = SendRequest($request, $method, $data, $headers);
}
var_dump($videosArray);
$videoData = json_encode($videosArray);
echo $videoData;
?>