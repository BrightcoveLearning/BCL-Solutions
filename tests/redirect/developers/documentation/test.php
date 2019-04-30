<?php 

$uri = $_SERVER['REQUEST_URI'];
$host = $_SERVER['HTTP_HOST'];
if (strpos($uri, 'developers/documentation') == true) {
  $newUri = str_replace('developers/documentation', 'video-platform', $uri);
  $newUrl = 'https://'.$host.$newUri;
  header("Location: $newUrl", true, 301); 
}
var_dump($newUrl);
?>

