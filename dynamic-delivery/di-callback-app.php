<?php
// POST won't work for JSON data
$problem = "No errors";
try {
    $json    = file_get_contents('php://input');
    $decoded = json_decode($json, true);
} catch (Exception $e) {
    $problem = $e->getMessage();
}

// turn notification into pretty printed JSON
$notification = json_encode($decoded, JSON_PRETTY_PRINT);



$logEntry = $notification.
"\nErrors receiving notificatons: ".$problem.
"\n-------------------------------\n";

// Lastly, tell PHP where it can find the log file and tell PHP to open it
// and add the string we created earlier to it.
$logFileLocation = "di-log.txt";
$fileHandle      = fopen($logFileLocation, 'a') or die("-1");
fwrite($fileHandle, $logEntry);
fclose($fileHandle);

// line below is displayed when you browse the app directly
echo "Dynamic Ingest callback app is running";
?>
