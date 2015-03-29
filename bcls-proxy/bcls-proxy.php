<?php
    /**
     * bcls-proxy.php - proxy for Brightcove RESTful APIs
     * gets an access token, makes the request, and returns the response
     * Accessing:
     *     URL: https://solutions.brightcove.com/bcls/bcls-proxy/bcsl-proxy.php
     *         (note you should *always* access the proxy via HTTPS)
     *     Method: POST
     * Inputs
     */

    /**
     * @ Sends the request
     * @return string
     */
    function SendRequest( $url, $method, $data, $headers )
    {
    $context = stream_context_create(array
    (
      "http" => array(
        "method" => $method,
        "header" => $headers,
        "content" => json_encode($data)
      )
    ));
    return file_get_contents($url, false, $context);
    }
    // set up request for access token
    $data = array();

    $client_id = $_POST["client_id"];
    $client_secret = $_POST["client_secret"];
    $auth_string = "{$client_id}:{$client_secret}";
    $request = "https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials";
    $ch = curl_init($request);
    curl_setopt_array($ch, array(
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_SSL_VERIFYPEER => FALSE,
        CURLOPT_USERPWD => $auth_string,
        CURLOPT_HTTPHEADER => array(
            'Content-type: application/x-www-form-urlencoded'
        ),
        CURLOPT_POSTFIELDS => $data
    ));
    $result = curl_exec($ch);
    curl_close($ch);

    // Check for errors
    if($response === FALSE){
        die(curl_error($ch));
    }

    // Decode the response
    $resultData = json_decode($result, TRUE);
    $access_token = $resultData["access_token"];

    // set up the API call
    // get data
    if ($_POST["requestBody"]) {
        $data = json_decode($_POST["requestBody"]);
    } else {
        $data = array();
    }
    $method = $_POST["requestType"];
    // get the URL and authorization info from the form data
    $request = $_POST["url"];
    // add headers
    $headers = array(
        1 => "Authorization: Bearer {$access_token}",
        2 => "Content-type: application/x-www-form-urlencoded"
        );

    //send the http request
    $result = SendRequest($request, $method, $data, $headers);
    echo $result;
?>