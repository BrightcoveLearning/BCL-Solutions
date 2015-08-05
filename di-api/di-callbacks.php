<?php
// POST won't work for JSON data
$json    = file_get_contents('php://input');
$decoded = json_decode($json, true);

// Begin by checking to see if "entity" is included in the POST request.
// If it is, assign its value to the $entityId Variable.
// If it is not, assign the value of null to $entityId.

if (isset($decoded["entity"])) {
	$entityId = $decoded["entity"];
} else {
	$entityId = null;
}

if (isset($decoded["entityType"])) {
	$entityType = $decoded["entityType"];
} else {
	$entityType = null;
}

if (isset($decoded["version"])) {
	$version = $decoded["version"];
} else {
	$version = null;
}

if (isset($decoded["errorMessage"])) {
	$errorMessage = $decoded["errorMessage"];
} else {
	$errorMessage = null;
}

if (isset($decoded["status"])) {
	$status = $decoded["status"];
} else {
	$status = null;
}

if (isset($decoded["action"])) {
	$action = $decoded["action"];
} else {
	$action = null;
}

// Next build a string that contains the current date and time as well as
// the value for each key that was included in the request separated by
// a comma so that it can easily be imported as a CSV file.

$logEntry = "\nRaw Response: ".$json.
"\n".date("Y-m-d H:i:s")." UTC: ".
"\nVersion: ".$version.
"\nEntity: ".$entityId.
"\nType: ".$entityType.
"\nStatus: ".$status.
"\nError Message: ".$errorMessage.
"\nAction: ".$action.
"\n-------------------------------";

// Lastly, tell PHP where it can find the log file and tell PHP to open it
// and add the string we created earlier to it.
$logFileLocation = "di-log.txt";
$fileHandle      = fopen($logFileLocation, 'a') or die("-1");
fwrite($fileHandle, $logEntry);
fclose($fileHandle);

echo "Dynamic Ingest callback app is running";
?>