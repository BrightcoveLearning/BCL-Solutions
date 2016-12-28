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
$account_id = $decoded->account_id;

// if job complete, update the job count file

$job_count_file = $account_id.'_count.txt';
if ($notification->entityType == 'TITLE') {
    if ($notification->status == 'SUCCESS') {
        $job_count = fopen($job_count_file, 'w');
        $job_count_decoded = json_decode($job_count);
        $job_count_decoded->job_count--;
        fwrite($job_count, json_encode($job_count_decoded));
    } elseif ($notification->status == 'FAILED') {
        $job_count = fopen($job_count_file, 'w');
        $job_count_decoded = json_decode($job_count);
        $job_count_decoded->job_count--;
        $job_count_decoded->failed++;
        fwrite($job_count, json_encode($job_count_decoded));
    }
}



$logEntry = $notification."\n";

// Lastly, tell PHP where it can find the log file and tell PHP to open it

$logFileLocation = $account_id.'_notifications.txt';
$fileHandle      = fopen($logFileLocation, 'a') or die("-1");
fwrite($fileHandle, $logEntry);
fclose($fileHandle);

// line below is displayed when you browse the app directly
echo "Callback app is running";
?>
