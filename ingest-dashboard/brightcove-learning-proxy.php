<?php
/**
 * brightcove-learning-proxy.php - proxy for Brightcove RESTful APIs
 * gets an access token, makes the request, and returns the response
 * Accessing:
 *     URL: https://solutions.brightcove.com/bcls/bcls-proxy/bcsl-proxy.php
 *         (note you should *always* access the proxy via HTTPS)
 *     Method: POST
 *
 * @post {string} url - the URL for the API request
 * @post {string} [requestType=GET] - HTTP method for the request
 * @post {string} [requestBody=null] - JSON data to be sent with write requests
 *
 * @returns {string} $response - JSON response received from the API
 */

 // CORS enablement and other headers
 header("Access-Control-Allow-Origin: *");
 header("Content-type: application/json");
 header("X-Content-Type-Options: nosniff");
 header("X-XSS-Protection");

 // default account values
 $default_client_id     = '3e23bbec-59b8-4861-b5ba-7c26e110a746';
 $default_client_secret = 'quNdrH07IVoG8yZxSFsCySWmtvUuWfPYyzeg1Nil7Md7VpQ50A3KVV4eeMrZSR7FdeZA_3JS5jV9pBBI0skwWA';

 // get request body
 $requestData = json_decode(file_get_contents('php://input'));

 // set up access token request
 if ($requestData->client_id) {
     $client_id = $requestData->client_id;
 } else {
     // default to the id for all permissions for most BCLS accounts
     $client_id = $default_client_id;
 }
 if ($requestData->client_secret) {
     $client_secret = $requestData->client_secret;
 } else {
     // default to the secret for all permissions for most BCLS accounts
     $client_secret = $default_client_secret;
 }

 $auth_string = "{$client_id}:{$client_secret}";
 $request     = "https://oauth.brightcove.com/v4/access_token?grant_type=client_credentials";
 $ch          = curl_init($request);
 curl_setopt_array($ch, array(
         CURLOPT_POST           => TRUE,
         CURLOPT_RETURNTRANSFER => TRUE,
         CURLOPT_SSL_VERIFYPEER => FALSE,
         CURLOPT_USERPWD        => $auth_string,
         CURLOPT_HTTPHEADER     => array(
             'Content-type: application/x-www-form-urlencoded',
         ),
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
 if ($requestData->requestBody) {
   $ch = curl_init($request);
   curl_setopt_array($ch, array(
     CURLOPT_CUSTOMREQUEST  => $method,
     CURLOPT_RETURNTRANSFER => TRUE,
     CURLOPT_SSL_VERIFYPEER => FALSE,
     CURLOPT_HTTPHEADER     => array(
       'Content-type: application/json',
       "Authorization: Bearer {$access_token}",
     ),
     CURLOPT_POSTFIELDS => $requestData->requestBody
   ));
   $response = curl_exec($ch);
   curl_close($ch);
 } else {
   $ch = curl_init($request);
   curl_setopt_array($ch, array(
     CURLOPT_CUSTOMREQUEST  => $method,
     CURLOPT_RETURNTRANSFER => TRUE,
     CURLOPT_SSL_VERIFYPEER => FALSE,
     CURLOPT_HTTPHEADER     => array(
       'Content-type: application/json',
       "Authorization: Bearer {$access_token}",
     )
   ));
   $response = curl_exec($ch);
   curl_close($ch);
 }

 // Check for errors and log them if any
 // note that logging will fail unless
 // the file log.txt exists in the same
 // directory as the proxy and is writable

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
 echo $response;
 ?>
