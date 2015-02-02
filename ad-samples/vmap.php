<?php

$headers = apache_request_headers(); 
$origin = $headers["Origin"];
header("Content-type: application/xml");
header("Access-Control-Allow-Origin: {$origin}");  
header("Access-Control-Allow-Credentials: true");

$xml=simplexml_load_file("VMAP.xml");
echo $xml->asXML();
?>