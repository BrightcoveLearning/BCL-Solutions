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

// if notification received turn notification into pretty printed JSON
if ($decoded) {
    $notification = json_encode($decoded, JSON_PRETTY_PRINT);
    $account_id = $decoded['accountId'];

    // if notification received job complete, update the job count file
    if ($account_id) {
        $job_count_file    = $account_id.'_count.txt';
        $job_count_data    = file_get_contents($job_count_file);
        $job_count_decoded = json_decode($job_count_data);
        if ($decoded['entityType'] == 'TITLE') {
            if ($decoded['status'] == 'SUCCESS') {
                $job_count_decoded->job_count--;
            } elseif ($decoded['status'] == 'FAILED') {
                $job_count_decoded->job_count--;
                $job_count_decoded->failed++;
            }
        }
        $job_count = fopen($job_count_file, 'w');
        fwrite($job_count, json_encode($job_count_decoded));
        fclose($job_count);


        $logEntry = $notification."\n";

        // Lastly, tell PHP where it can find the log file and tell PHP to open it

        $logFileLocation = $account_id.'_notifications.txt';
        $fileHandle      = fopen($logFileLocation, 'a');
        fwrite($fileHandle, $logEntry);
        fclose($fileHandle);
    }
}

// line below is displayed when you browse the app directly
echo "Callback app is running";
?>
