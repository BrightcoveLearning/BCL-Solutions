<?php
// POST won't work for JSON data
$problem = "No errors";
$notificationType = null;
try {
    $json    = file_get_contents('php://input');
    $decoded = json_decode($json, true);
} catch (Exception $e) {
    $problem = $e->getMessage();
}

// turn notification into pretty printed JSON
$notification = json_encode($decoded, JSON_PRETTY_PRINT);



$logEntry = $notification.
"\n-------------------------------\n";

// Lastly, tell PHP where it can find the log file and tell PHP to open it
// and add the string we created earlier to it.
// 2016-09-15: turning off CMS API notifications for now
    $logFileLocation = "live-log.txt";
    $fileHandle      = fopen($logFileLocation, 'a') or die("-1");
    fwrite($fileHandle, $logEntry);
    fclose($fileHandle);

// line below is displayed when you browse the app directly
echo "Live callback app is running";
?>
