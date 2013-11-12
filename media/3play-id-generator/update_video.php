<?php

// This code example is based on code from the Echove project.
// For the entire PHP SDK, please visit http://echove.net/

// Turn on error reporting during development
ini_set('error_reporting', E_ALL);
ini_set('display_errors', TRUE);


// Retrieve form values from the POST

$writeApiLocation 	= $_REQUEST['writeApiLocation'];

$video = array();
$video["id"] 			= $_REQUEST['id'];
$video["customFields"] 	= array();
$video["customFields"]["threeplayid"] = $_REQUEST['threeplayid'];


$params = array();
$params["token"] 		= $_REQUEST['writeToken'];
$params["video"] 		= $video;


// Assign the METHOD constrant adn the params array to the post array
$post = array();
$post["method"] = "update_video";
$post["params"] = $params;

// Assemble the multipart request: encode JSON part and the file part
$requestData["json"] = json_encode($post) . "\n";


// Execute the call using curl
$ch = curl_init($writeApiLocation);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the transfer as a string of the return value of curl_exec instead of outputting it directly

$http_result = curl_exec($ch);

echo $http_result;



?>