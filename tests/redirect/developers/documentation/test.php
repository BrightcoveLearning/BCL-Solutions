<?php 

$uri = $_SERVER[REQUEST_URI];
$host = $_SERVER[REQUEST_URI];
// if (strpos($uri), 'developers/documentation' == true) {
  $newUri = str_replace('developers/documentation', 'video-platform', $uri);
  $newUrl = $host.$newUri;
// }
// header("Location: $newUrl"); 
var_dump($_SERVER);
?>

