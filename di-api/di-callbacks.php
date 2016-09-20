<?php
// POST won't work for JSON data
$problem = "No errors";
try {
	$json    = file_get_contents('php://input');
	$decoded = json_decode($json, true);
} catch (Exception $e) {
	$problem = $e->getMessage();
}

// Begin by checking to see if "entity" is included in the POST request.
// If it is, assign its value to the $entity Variable.
// If it is not, assign the value of null to $entity.

if (isset($decoded["timestamp"])) {
	$timestamp        = $decoded["timestamp"];
	$notificationType = 'CMS API';
} else {
	$timestamp        = null;
	$notificationType = 'Dynamic Ingest API';
}

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

if (isset($decoded["account_id"])) {
	$accountId = $decoded["account_id"];
} else {
	$accountId = null;
}

if (isset($decoded["event"])) {
	$event = $decoded["event"];
} else {
	$event = null;
}

if (isset($decoded["video"])) {
	$video = $decoded["video"];
} else {
	$video = null;
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
"\nNotification Origin: ".$notificationType.
"\n".date("Y-m-d H:i:s")." UTC ".
"\nTimestamp: ".$timestamp.
"\nVersion: ".$version.
"\nEntity: ".$entityId.
"\nEntity Type: ".$entityType.
"\nAccount ID: ".$accountId.
"\nVideo ID: ".$video.
"\nStatus: ".$status.
"\nError Message: ".$errorMessage.
"\nAction: ".$action.
"\nNotification Errors: ".$problem.
"\n-------------------------------";

// Lastly, tell PHP where it can find the log file and tell PHP to open it
// and add the string we created earlier to it.
// 2016-09-15: turning off CMS API notifications for now
if ($notificationType == 'CMS API') {
    $logFileLocation = "di-log.txt";
    $fileHandle      = fopen($logFileLocation, 'a') or die("-1");
    fwrite($fileHandle, $logEntry);
    fclose($fileHandle);
}

echo "Dynamic Ingest callback app is running";
?>
