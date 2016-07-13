<?php
// var to log errors, if any
$problem = "No errors";
// get the data file contents and parse them
try {
	$notificationData    = file_get_contents('di.json');
	$notificationDataDecoded = json_decode($notificationData, true);
} catch (Exception $e) {
	$problem = $e->getMessage();
	echo $problem;
}

// function to get index of video object if it already exists
function doesVideoExist($videoId)
{
    $idx = -1;
    for($i = 0; $i < count($notificationDataDecoded); $i++) {
        if ($notificationDataDecoded[$i]->videoId == $videoId) {
            $idx = $i;
            break;
        }
    }
    return $idx;
}

try {
	$json    = file_get_contents('php://input');
	$decoded = json_decode($json, true);
} catch (Exception $e) {
	$problem = $e->getMessage();
	echo $problem;
}

// Begin by extracting the useful parts of the notification

if (isset($decoded["entity"])) {
	$videoId = $decoded["videoId"];
} else {
	$videoId = null;
}

if (isset($decoded["entityType"])) {
	$entityType = $decoded["entityType"];
} else {
	$entityType = null;
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

if (isset($decoded["profileRefId"])) {
	$profileRefId = $decoded["profileRefId"];
} else {
	$profileRefId = null;
}

// if notification is for completed title, act

if (($entityType == 'TITLE') && ($action == 'CREATE') && ($status == 'SUCCESS')) {
	$newLine = "\nvideoIdArray.unshift(".$entityId.");";
	// Tell PHP where it can find the log file and tell PHP to open it
	// and add the string we created earlier to it.
	$logFileLocation = "video-ids.js";
	$fileHandle      = fopen($logFileLocation, 'a') or die("-1");
	fwrite($fileHandle, $newLine);
	fclose($fileHandle);
}

echo "Dynamic Ingest callback app is running";
?>
