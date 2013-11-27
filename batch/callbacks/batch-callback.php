<?php

// Begin by checking to see if "referenceId" is included in the POST request.
// If it is, assign its value to the $referenceId Variable.
// If it is not, assign the value of null to $referenceId.

if(isset($_POST["referenceId"])) {
    $referenceId = $_POST["referenceId"];
} else {
    $referenceId = null;
}

/* Repeat the same code for each key in the request */

// Next build a string that constrains the current date and time as well as
// the value for each key that was included in the request separated by
// a comma so that it can easily be imported as a CSV file.
//
$logEntry = date("m-d-y H:i:s") . ": ";
$post_dump = print_r($_POST, TRUE);

// Lastly, tell PHP where it can find the log file and tell PHP to open it
// and add the string we created earlier to it.
$logFileLocation = 'log.txt';
$fileHandle = fopen($logFileLocation, 'a') or die("-1");
fwrite($fileHandle, $logEntry);
// also write the dump of the POST vars
fwrite($fileHandle, $post_dump);
fclose($fileHandle);

?>