<?php

// build a string that constrains the current date and time
// and dump the POST data
//
$logEntry = date("m-d-y H:i:s") . ": ";
$post_dump = print_r($_POST, TRUE);

// tell PHP where it can find the log file and tell PHP to open it
// and add the string and data dump we created earlier to it.
$logFileLocation = 'log.txt';
$fileHandle = fopen($logFileLocation, 'a') or die("-1");
fwrite($fileHandle, $logEntry);
// also write the dump of the POST vars
fwrite($fileHandle, $post_dump);
fclose($fileHandle);

?>